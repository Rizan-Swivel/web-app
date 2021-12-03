import React, { useEffect, useState } from "react";
import { Textfield } from "../../../Components/atoms/Textfield";
import { Card } from "../../../Components/atoms/Card";
import { Button } from "../../../Components/atoms/Button";
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { FileInput } from "../../../Components/atoms/FileInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Select from "../../../Components/atoms/MultiSelect/Select";
import MerchantsStore from "../MerchantsStore";

const BasicInfoEdit = (props) => {
    const { t, userId } = props;

    const schema = yup.object().shape({
        fullName: yup.string().required().label(t("common.name")),
        imageUrl: yup.string().required().nullable().label(t("common.profileImage")),
        merchantId: yup.string().label(t("common.merchant")),
        categories: yup.array().required().test("required",`${t('common.categories')} ${t('errors.isRequiredField')}`,function(value){
                return value.length > 0
            }).label(t("common.categories")),
        brands: yup.array().label(t("common.brands")),
    });
    
    const [formData, setFormData] = React.useState();

    const { register, handleSubmit,formState:{ errors }, setValue, control } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues:{
            imageUrl: props.merchantSummery?.imageUrl,
            fullName: props.merchantSummery?.fullName,
            categories: props.brandsCategoriesMapping?.categories.map(c=>({value :c.id, label: c.name})),
            brands: props.brandsCategoriesMapping?.brands.map(b=>({value: b.id, label: b.name})),
        },
    });

    const { dirtyFields } = useFormState({
        control
    });

    const onSubmit = data => {
        if (dirtyFields.fullName || data.imageUrl) {
            //call basic info update api
            props.updateMerchantBasicInfo({
                fullName: data.fullName,
                imageUrl: data.imageUrl,
                userId
            });
        }

        if (dirtyFields.categories || dirtyFields.brands){
            //call brand category mapping update api
            props.updateCategoriesAndBrandsForMerchant({
                categories: data.categories?.map(c => c.value),
                brands: data.brands?.map(b => b.value),
                merchantId: userId,
                userId
            });
        }
        setFormData({
            fullName: data.fullName,
            imageUrl: data.imageUrl
        })

    }

    useEffect(() => {
        props.getMerchantSummery({
            userId,
            merchantId: userId
        })
        props.getBrandsCategoriesMappingByMerchant({
            userId,
            merchantId: userId
        })

        return ()=> props.resetMerchantState()

    },[])

    useEffect(()=>{
        return () => props.resetMerchantState();
    },[])


    useEffect(()=>{
        setValue("imageUrl", props.merchantSummery?.imageUrl)
        setFormData({
            ...formData,
            imageUrl: props.merchantSummery?.imageUrl
        })
    },[props.merchantSummery])

    const handleFileChange = (e) => {
        e.stopPropagation();
        e.preventDefault();
        props.clearUploadedFilesData();
        let uploadFormData = new FormData();
        if (e.target.files[0]){
            uploadFormData.append("files", e.target.files[0],e.target.files[0].name);
            uploadFormData.append("fileName", e.target.files[0].name);
            fileUpload(uploadFormData);
        }
    };

    const fileUpload = (uploadFormData) => {
        if (uploadFormData) {
            props.uploadFiles(uploadFormData);
        }
    };

    useEffect(() => {
        if (props.uploadedFiles){
            setFormData({
                ...formData,
                imageUrl: props.uploadedFiles[0].url
            })
            setValue("imageUrl", props.uploadedFiles[0].url)
        }
    },[props.uploadedFiles])

    const removeImage = () => {
        props.clearUploadedFilesData();
        setFormData({
            ...formData,
            imageUrl: null
        })
        setValue("imageUrl", "")
    }

    const renderForm = () => {
        return (
            <Card type="primary" size="full">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-row  " >

                        <div className="w-1/3 flex items-center justify-center mr-10 mt-5 border-default">
                            <div className="icons flex  text-gray-500 m-2">
                                {!formData?.imageUrl &&
                                <FileInput
                                    name={"file"}
                                    design="simple"
                                    type="primary"
                                    size="sm"
                                    value={formData?.imageUrl}
                                    onChangeValue={(e)=>handleFileChange(e)}
                                    className="hidden "
                                    inputIcon={{
                                        type: "image",
                                        className:
                                            "mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7 w-12",
                                    }}
                                    t={ t }
                                    error={errors.imageUrl?.message}
                                />}
                            </div>
                            <div className=" flex flex-col ">
                                {
                                    formData?.imageUrl ? (
                                        <div className="flex">
                                            <div>
                                                <img src={formData?.imageUrl} alt="" className="h-40 w-auto" />
                                            </div>
                                            <div onClick={()=>removeImage()} className="flex flex-row-reverse cursor-pointer">
                                                <FontAwesomeIcon icon={faWindowClose} size="sm" className="mr-2" />
                                            </div>
                                        </div>
                                    ) : ""
                                }
                            </div>

                        </div>

                        <div className=" w-2/3 ">
                            <div className="mt-5 ">
                                <Textfield
                                    type={ errors.fullName?"red": "primary"}
                                    size="sm"
                                    placeholder={t("common.name")}
                                    inputParams={register("fullName")}
                                    error={errors.fullName?.message}
                                    label={t("common.name")}
                                  />
                            </div>

                            <div className=" flex flex-col mt-5 ">
                                <Select
                                    name={"categories"}
                                    label={t("common.categories")}
                                    error={errors.categories?.message}
                                    type={ errors.categories?"red": "primary"}
                                    isMulti={true}
                                    required={true}
                                    options={categories}
                                    defaultValue={[]}
                                    controlObject={control}
                                />
                            </div>
                            <div className=" flex flex-col mt-5 ">
                                <Select
                                    name={"brands"}
                                    label={t("common.brands")}
                                    error={errors.brands?.message}
                                    type={ errors.brands?"red": "primary"}
                                    isMulti={true}
                                    required={false}
                                    options={brands}
                                    defaultValue={[]}
                                    controlObject={control}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-8">
                        <Button  type="purpeldark" btnType="submit">
                            {t("common.submit")}
                        </Button>
                    </div>
                </form>
            </Card>
    )}

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    let dataOBJ = {
        page: 0,
        size: 250,
        searchTerm: "ALL"
    };

    const [data, setData] = useState(dataOBJ);

    useEffect(() => {
        if (props.categoryList) {
            const cat = props.categoryList.categories?.map((data) => ({
                value: data.id,
                label: data.name,
            }));
            setCategories(cat);
        } else {
            props.getCategoryList(data);
        }

        if (props.brandList) {
            const brands = props.brandList.brands?.map((data) => ({
                value: data.id,
                label: data.name,
            }));

            setBrands(brands);
        } else {
            props.getBrandsList(data);
        }
    }, [props.categoryList, props.brandList]);

    return (
        <div>
            { renderForm() }
        </div>
    );
}  
export default  MerchantsStore(BasicInfoEdit);