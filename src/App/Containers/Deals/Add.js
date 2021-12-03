import React, {useEffect, useRef, useState} from "react";
import "../../assets/styles/main.css";
import { Card } from "../../Components/atoms/Card";
import { useParams } from "react-router-dom";
import {compose} from "redux";
import BaseHOC from "../BaseHOC";
import DealsStore from "./DealsStore";
import {Button} from "../../Components/atoms/Button";
import {Typography} from "../../Components/atoms/Typography";
import {Textfield} from "../../Components/atoms/Textfield";
import {DateField} from "../../Components/atoms/Date/index";
import {FileInput} from "../../Components/atoms/FileInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Select from "../../Components/atoms/MultiSelect/Select";
import {dealDeductionTypes} from "../../Utils/constants";
import moment from "moment"

function Add(props) {
    const { t,userId } = props;
    const {id} = useParams();

    const schema = yup.object().shape({
        title: yup.string().required().label(t("common.title")),
        subTitle: yup.string().required().nullable().label(t("common.subTitle")),
        description: yup.string().label(t("common.description")),
        termsAndConditions: yup.string().required().required().label(t("common.termsAndConditions")),
        quantity: yup.number().default(0).positive().nullable()
            .typeError((v)=>(`${v.label} ${t('errors.shouldBeNumber')}`))
            .label(t("common.quantity")),
        deductionType: yup.string().required().nullable()
            .transform(value => (value ? value.value : null))
            .label(t("common.deductionType")),
        deductionAmount: yup.number()
            .when('deductionType',{
            is: dealDeductionTypes.amount,
            then: yup.number()
                .typeError((v)=>(`${v.label} ${t('errors.shouldBeNumber')}`))
                .transform(value => (isNaN(value) ? null : value))
                .required().nullable()
            }).label(t("common.deductionAmount")).nullable(),
        deductionPercentage: yup.number().when('deductionType',{
            is: dealDeductionTypes.percentage,
            then: yup.number()
                .typeError((v)=>(`${v.label} ${t('errors.shouldBeNumber')}`))
                .transform(value => (isNaN(value) ? null : value))
                .required().nullable()
            }).label(t("deal.deductionPercentage")),
        originalPrice: yup.number()
            .typeError((v)=>(`${v.label} ${t('errors.shouldBeNumber')}`))
            .transform(value => (isNaN(value) ? null : value))
            .nullable()
            .label(t("common.originalPrice")),
        validFrom: yup.date().required().label(t("deal.validFrom")),
        expiredOn: yup.date()
            .min(yup.ref('validFrom'),t("deal.dealsCannotExpireBeforeStart"))
            .required().label(t("deal.expiredOn")),
        categoryIds: yup.array().required().nullable()
            .transform(value => value? value.map(v=>v.value):[])
            .test('images',`${t("common.categories")} ${t('errors.isRequiredField')}`, function(value){ return value.length>0 })
            .label(t("common.categories")),
        brandIds: yup.array().nullable()
            .transform(value => value? value.map(v=>v.value):[])
            .label(t("common.brands")),
        imageUrls: yup.array().required().nullable()
            .test('images','Images are required', function(value){ return value.length>0 })
            .label(t("deal.images")),
        coverImage: yup.string().required().nullable().label(t("deal.coverImage")),
    });

    const { register, handleSubmit,formState:{ errors }, setValue, control, watch } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    const selectedDeductionType = watch('deductionType')

    const [deductionTypes] = useState([
        {value: dealDeductionTypes.amount, label: t("deal.amount")},
        {value: dealDeductionTypes.percentage, label:  t("deal.percentage")}
    ])

    let dataOBJ = {
        page: 0,
        size: 50,
        searchTerm: "ALL"
    };

    const [data, setData] = useState(dataOBJ);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const onSubmit = data => {
        props.createDeal({
            ...data,
            validFrom: moment(data.validFrom).valueOf(),
            expiredOn: moment(data.expiredOn).valueOf(),
            merchantId: userId
        })
    }

    //image upload
    const [uploadContext,setUploadContext] = useState()
    const [fileContents, setFileContents] = useState([])

    const [formData, setFormData] = useState();

    const handleFileChange = (e, uploadContext) => {
        setUploadContext(uploadContext)
        e.stopPropagation();
        e.preventDefault();
        props.clearUploadedFilesData();
        let uploadFormData = new FormData();
        uploadFormData.append("files", e.target.files[0],e.target.files[0].name);
        uploadFormData.append("fileName", e.target.files[0].name);
        fileUpload(uploadFormData);
    };

    useEffect(()=>{
        if (props.uploadedFiles !== null)
            props.clearUploadedFilesData()
    })

    const fileUpload = (uploadFormData) => {
        if (uploadFormData) {
            props.uploadFiles(uploadFormData);
        }
    };

    //set images to form data
    useEffect(() => {
        if (props.uploadedFiles !== null && uploadContext=="images")
            setFileContents(prevArray => ( [...prevArray , [[props.uploadedFiles[0].name],props.uploadedFiles[0].url]]))
        else if(props.uploadedFiles !== null && uploadContext=="cover"){
            setFormData({coverImage: props.uploadedFiles[0].url})
            setValue("coverImage", props.uploadedFiles[0].url)
        }
    },[props.uploadedFiles])

    useEffect(() => {
        setValue("imageUrls", fileContents.map( file => file[1]))
    },[fileContents])

    const removeImage = (url) => {
        props.clearUploadedFilesData();
        let filesArray = fileContents.filter((file)=>{
            return (file[1]!==url)
        })
        setFileContents(filesArray)
    }

    useEffect(()=>{
        if (props.uploadedFiles !== null)
            props.clearUploadedFilesData()
    })

    const removeCoverImage = (url) => {
        setValue("coverImage", null)
        setFormData({
            coverImage: ""
        })
    }

    useEffect(() => {
        if (props.categoryList) {
            const cat = props.categoryList.categories?.map((data) => ({
                value: data.id,
                label: data.name,
            }));
            setCategories(cat);
        } else {
            props.getCategories(data);
        }

        if (props.brandsList) {
            const brand = props.brandsList.brands?.map((data) => ({
                value: data.id,
                label: data.name,
            }));
            setBrands(brand);
        } else {
            props.getBrands(data);
        }
    }, [props.categoryList, props.brandsList]);

    const renderInputs = () => (
        <Card type="primary" className="flex flex-col">
            <div >
                <div className="flex flex-row">
                    <div className={" w-1/2"}>
                        <div className="mt-5 ">
                            <Textfield
                                type={ errors.title?"red": "primary"}
                                size="sm"
                                placeholder={t("common.name")}
                                inputParams={register("title")}
                                error={errors.title?.message}
                                label={t("common.title")}
                                required={true}
                            />
                        </div>
                        <div className="mt-5 ">
                            <Textfield
                                type={ errors.subTitle?"red": "primary"}
                                size="sm"
                                placeholder={t("common.subTitle")}
                                inputParams={register("subTitle")}
                                error={errors.subTitle?.message}
                                label={t("common.subTitle")}
                                required={true}
                            />
                        </div>
                        <div className="mt-5 ">
                            <Textfield
                                type={ errors.description?"red": "primary"}
                                size="sm"
                                placeholder={t("common.description")}
                                inputParams={register("description")}
                                error={errors.description?.message}
                                label={t("common.description")}
                               // required={true}
                            />
                        </div>
                        <div className="mt-5 ">
                            <Textfield
                                type={ errors.termsAndConditions?"red": "primary"}
                                size="sm"
                                placeholder={t("common.termsAndConditions")}
                                inputParams={register("termsAndConditions")}
                                error={errors.termsAndConditions?.message}
                                label={t("common.termsAndConditions")}
                                required={true}
                            />
                        </div>
                        <div className="mt-5 ">
                            <Textfield
                                type={ errors.quantity?"red": "primary"}
                                size="sm"
                                placeholder={t("common.quantity")}
                                inputParams={register("quantity")}
                                error={errors.quantity?.message}
                                label={t("common.quantity")}
                                defaultValue={0}
                               // required={true}
                            />
                        </div>
                        <div className=" flex flex-col mt-5 ">
                            <Select
                                name={"deductionType"}
                                label={"deductionType"}
                                type={ errors.deductionType?"red": "primary"}
                                error={errors.deductionType?.message}
                                //isMulti={true}
                                required={false}
                                options={deductionTypes}
                                defaultValue={null}
                                controlObject={control}
                                required={true}
                            />
                        </div>
                        { selectedDeductionType?.value == dealDeductionTypes.amount &&
                            <div className="mt-5 ">
                                <Textfield
                                    type={ errors.deductionAmount?"red": "primary"}
                                    size="sm"
                                    placeholder={t("common.deductionAmount")}
                                    inputParams={register("deductionAmount")}
                                    error={errors.deductionAmount?.message}
                                    label={t("common.deductionAmount")}
                                    required={true}
                                />
                            </div>
                        }
                        { selectedDeductionType?.value == dealDeductionTypes.percentage &&
                            <div className="mt-5 ">
                                <Textfield
                                    type={ errors.deductionPercentage?"red": "primary"}
                                    size="sm"
                                    placeholder={t("deal.deductionPercentage")}
                                    inputParams={register("deductionPercentage")}
                                    error={errors.deductionPercentage?.message}
                                    label={t("deal.deductionPercentage")}
                                    required={true}
                                />
                            </div>
                        }
                        <div className="mt-5 ">
                            <Textfield
                                type={ errors.originalPrice?"red": "primary"}
                                size="sm"
                                placeholder={t("common.originalPrice")}
                                inputParams={register("originalPrice")}
                                error={errors.originalPrice?.message}
                                label={t("common.originalPrice")}
                            //    required={true}
                            />
                        </div>
                        <div className=" flex flex-col mt-5 ">
                            <Select
                                name={"categoryIds"}
                                label={t("deal.categories")}
                                error={errors.categoryIds?.message}
                                type={ errors.categoryIds?"red": "primary"}
                                isMulti={true}
                                options={categories}
                                defaultValue={null}
                                controlObject={control}
                                required={true}
                            />
                        </div>
                        <div className=" flex flex-col mt-5 ">
                            <Select
                                name={"brandIds"}
                                label={t("deal.brands")}
                                error={errors.brandIds?.message}
                                type={ errors.brandIds?"red": "primary"}
                                isMulti={true}
                                required={false}
                                options={brands}
                                defaultValue={null}
                                controlObject={control}
                            />
                        </div>
                        <div className=" flex flex-col mt-5 ">
                            <DateField
                                type={ errors.validFrom?"red": "primary"}
                                size="sm"
                                name={"validFrom"}
                                label={ t("deal.validFrom")}
                                error={errors.validFrom?.message}
                                required={true}
                                hookFormControlObject={control}
                            />
                        </div>
                        <div className=" flex flex-col mt-5 ">
                            <DateField
                                type={ errors.expiredOn?"red": "primary"}
                                size="sm"
                                name={"expiredOn"}
                                label={ t("deal.expiredOn")}
                                error={errors.expiredOn?.message}
                                required={true}
                                hookFormControlObject={control}
                            />
                        </div>
                    </div>
                    <div className="w-1/2 pl-4 m-4">
                        <Typography color="primary" type="body2">Upload Cover-image</Typography>
                        <div className="icons flex  text-gray-500 m-2">
                            {!formData?.coverImage &&
                            <FileInput
                                name={"file"}
                                design="simple"
                                type="primary"
                                size="sm"
                                value={formData?.coverImage}
                                onChangeValue={(e)=>handleFileChange(e,"cover")}
                                className="hidden "
                                inputIcon={{
                                    type: "image",
                                    className:
                                        "mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7 w-12",
                                }}
                                t={ t }
                                error={errors.coverImage?.message}
                            />}
                        </div>
                        <div className=" flex flex-col mb-4">
                            {
                                formData?.coverImage ? (
                                    <div className="flex">
                                        <div>
                                            <img src={formData?.coverImage} alt="" className="h-40 w-auto" />
                                        </div>
                                        <div onClick={()=>removeCoverImage()} className="flex flex-row-reverse cursor-pointer">
                                            <FontAwesomeIcon icon={faWindowClose} size="sm" className="mr-2" />
                                        </div>
                                    </div>
                                ) : ""
                            }
                        </div>
                        <Typography color="primary" type="body2">Upload images</Typography>
                        <div className="icons flex  text-gray-500 m-2">
                            {!formData?.imageUrls &&
                                <FileInput
                                    name={"file"}
                                    design="simple"
                                    type="primary"
                                    size="sm"
                                    value={formData?.imageUrls}
                                    onChangeValue={(e)=>handleFileChange(e,"images")}
                                    className="hidden "
                                    inputIcon={{
                                        type: "image",
                                        className:
                                            "mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7 w-12",
                                    }}
                                    t={ t }
                                    error={errors.imageUrls?.message}
                                />}
                        </div>
                        <div className=" flex flex-col">
                            {
                                fileContents ?
                                    fileContents.map((file, index) => (
                                        <div key={index}>
                                            <div onClick={()=>removeImage(file[1])} className="flex flex-row-reverse cursor-pointer">
                                                <FontAwesomeIcon icon={faWindowClose} size="sm" className="mr-2" />
                                            </div>
                                            <div key={index}>
                                                <img src={file[1]} alt="" className="h-40 w-auto" />
                                            </div>
                                        </div>

                                    ))
                                    : ""}
                        </div>
                    </div>
                </div>
            </div>                   
        </Card>
    )
    return (
        <>{
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Card type="primary" size="full" className=" bg-white mb-2">
                        <div className="flex justify-between">
                            <div className="flex justify-start">
                                <Typography color="secondary" type="h3">{t("deal.addDeal")}</Typography>
                            </div>
                        </div>
                    </Card>
                    <div className="w-full flex-row">
                        <div className="flex flex-col   bg-gradient md:bg-white md:bg-none">
                            <div className=" ">
                               {renderInputs()}
                                <Card type="primary" className="w-1/2  ">
                                    <div className="flex flex-row justify-end">
                                        <Button
                                            type="purpeldark"
                                            className="mb-2  "
                                        >
                                            {t('common.submit')}
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        }
        </>
    );
}
export default compose(BaseHOC)(DealsStore(Add))
