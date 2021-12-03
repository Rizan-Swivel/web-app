import React, { useEffect, useState } from 'react';
import { Card } from "../../../Components/atoms/Card";
import { Textfield } from "../../../Components/atoms/Textfield";
import { Textarea } from '../../../Components/atoms/Textarea';
import { Button } from "../../../Components/atoms/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { isSLPhoneNumber } from "../../../Utils/Validations";
import {countryCodes, mobileNumberLeadingZeros, statuses} from "../../../Utils/constants";
import { get, isEqual } from "lodash";
import Modal from "react-modal";
import OTPModal from "../../Merchant/OTPModal";
import { Typography } from "../../../Components/atoms/Typography";
import { FileInput } from "../../../Components/atoms/FileInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import OtpInput, { hasErrored} from "react-otp-input";

const BusinessInfoEdit=(props)=> {

    const { t, userId } = props;

    const [initialValuesForOTP,setInitialValuesForOTP] = useState({
        email: null,
        telephone: null
    })

    const schema = yup.object().shape({
        imageUrl: yup.string().required().nullable().label(t("common.profileImage")),
        businessName: yup.string().required().label(t("common.businessName")),
        ownerName: yup.string().required().label(t("common.ownerName")),
        localNumber: yup.string().required().test("mobile",t("errors.phoneNumberIsNotValid"),
            function (value){
                return isSLPhoneNumber(value)
            }).test('mobile-otp',t("merchant.otpIsNotVerified"),
            function (value) {
                 return onTelephoneChange(value)
            }).label("Phone number"),
        address: yup.string().nullable().label(t("common.address")),
        email: yup.string().email().test('email-otp',t("merchant.otpIsNotVerified"),
            function (value) {
                return onEmailChange(value)
            }).nullable().label(t("common.email")),
    //    // imageUrl: yup.string().nullable(),
        businessRegNo: yup.string().nullable().label(t("merchant.businessRegNo")),
        webSite: yup.string().url().nullable().label(t("merchant.webSite")),
        facebook: yup.string().url().nullable().label(t("merchant.facebook")),
        instagram: yup.string().url().nullable().label(t("merchant.instagram")),
    });

    const [formData, setFormData] = React.useState(false);

    const { register, handleSubmit, formState: { errors }, reset,setValue, getValues, clearErrors } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues:{
            imageUrl: props.merchantBusinessInfo?.imageUrl,
        }
    });


    const OnSubmit = data => {
        setFormData({
                merchantId: userId,
                businessName: data.businessName,
                ownerName: data.ownerName,
                telephone: {
                    countryCode: data.telephone?.countryCode ? data.telephone?.countryCode : countryCodes.sriLanka,
                    localNumber: data.localNumber ? data.localNumber?.substring(1) : ""
                },
                address: data.address,
                email: data.email,
                imageUrl: data.imageUrl,
                businessRegNo: data.businessRegNo,
                webSite: data.webSite,
                facebook: data.facebook,
                instagram: data.instagram
            })
    }

    useEffect(() => {
        if (formData)
            props.updateMerchantBusinessInfo({
                ...formData,
                userId,
                merchantId: userId
            });

    },[formData])

    useEffect(() => {
        props.getBusinessInfoByMerchantId({
            userId,
            merchantId: userId
        })

        return ()=> props.resetMerchantState()

    },[])

    //set default values
    useEffect(() => {
        reset({
            ...props.merchantBusinessInfo,
            localNumber: props.merchantBusinessInfo ? `${mobileNumberLeadingZeros.sriLanka}${get(props, "merchantBusinessInfo.telephone.localNumber")}` : ""
        })

        //store initial email and telephone values for OTP verification on change
        if (props.merchantBusinessInfo?.telephone){
            setInitialValuesForOTP((prevState)=>({
                ...prevState,
                telephone: {
                    countryCode: get(props,"merchantBusinessInfo.telephone.countryCode"),
                    localNumber: get(props,"merchantBusinessInfo.telephone.localNumber")
                }
            }))
        }
        if (props.merchantBusinessInfo?.email){
            setInitialValuesForOTP((prevState)=>({
                ...prevState,
                email: get(props,"merchantBusinessInfo.email")
            }))
        }
    },[props.merchantBusinessInfo])

    const onEmailChange = (value) => {
        return initialValuesForOTP.email === value || value=="";
    }

    const onTelephoneChange = (value) => {
        const telephone = {
            countryCode: countryCodes.sriLanka,
            localNumber: value.substring(1)
        }
        return isEqual(initialValuesForOTP.telephone, telephone) || value=="";
    }

      // upload image
      useEffect(()=>{
        setValue("imageUrl", props.merchantBusinessInfo?.imageUrl)
        setFormData({
            ...formData,
            imageUrl: props.merchantBusinessInfo?.imageUrl
        })
    },[props.merchantBusinessInfo])

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
//upload image end

    const renderForm=()=>{
        return (
            <Card type="primary" size="full">
                <form  onSubmit={handleSubmit(OnSubmit)} >
                    <div className="flex flex-row ">
                        <div className="w-2/3 ">

                            <div className="mt-5">
                            <div className="icons flex  text-gray-500 m-2">
                                {!formData?.imageUrl &&
                                <FileInput
                                    name={"file"}
                                    design="simple"
                                    label="Business Image"
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
                            <div className="mt-5 ">
                                <Textfield
                                    size="sm"
                                    label={t("merchant.businessName")}
                                    type={ errors.businessName?"red": "primary"}
                                    error={errors.businessName?.message}
                                    inputParams={register("businessName")}
                                    placeholder={t("merchant.businessName")}
                                />
                            </div>
                            <div className="mt-5 ">
                                <Textfield
                                    size="sm"
                                    label={t("merchant.ownerName")}
                                    type={ errors.ownerName?"red": "primary"}
                                    error={errors.ownerName?.message}
                                    inputParams={register("ownerName")}
                                    placeholder={t("merchant.ownerName")}
                                    />
                            </div>
                            <div className="mt-5 ">
                                <Textfield
                                    size="sm"
                                    label={t("common.telephone")}
                                    type={ errors.localNumber?"red": "primary"}
                                    inputParams={register("localNumber")}
                                    placeholder={t("common.telephone")}
                                />
                                <span className="flex items-baseline">
                                    {errors.localNumber && <Typography className="text-danger mt-2" type="body2">{errors.localNumber?.message}</Typography>}
                                    {errors.localNumber?.message === t("merchant.otpIsNotVerified") && <span onClick={()=>openModal("phoneOtp")} className="ml-3 mt-2 cursor-pointer" > {t("merchant.verifyOtp")}</span>}
                                </span>
                            </div>
                            <div className="mt-5 ">
                                <Textarea
                                    size="sm"
                                    label={t("common.address")}
                                    type={ errors.address?"red": "primary"}
                                    error={errors.address?.message}
                                    inputParams={register("address")}
                                    placeholder={t("common.address")}
                                />
                            </div>
                            <div className="mt-5 ">
                                <Textfield
                                    size="sm"
                                    type={ errors.email?"red": "primary"}
                                    label={t("common.email")}
                                    inputParams={register("email")}
                                    placeholder={t("common.email")}
                                />
                                <span className="flex items-baseline">
                                    {errors.email && <Typography className="text-danger mt-2" type="body2">{errors.email?.message}</Typography>}
                                    {errors.email?.message === t("merchant.otpIsNotVerified") && <span onClick={()=>openModal("emailOtp")} className="ml-3 mt-2 cursor-pointer" > {t("merchant.verifyOtp")}</span>}
                                </span>
                            </div>
                            <div className="mt-5 ">
                                <Textfield
                                    label={t("merchant.businessRegNo")}
                                    type={ errors.businessRegNo?"red": "primary"}
                                    error={errors.businessRegNo?.message}
                                    inputParams={register("businessRegNo")}
                                    placeholder={t("merchant.businessRegNo")}
                                
                                />
                            </div>
                            <div className="mt-5 ">
                                <Textfield
                                    label={t("merchant.webSite")}
                                    type={ errors.webSite?"red": "primary"}
                                    error={errors.webSite?.message}
                                    inputParams={register("webSite")}
                                    placeholder={t("merchant.webSite")}
                                /> 
                            </div>
                            <div className="mt-5 ">
                                <Textfield
                                    label={t("merchant.facebook")}
                                    type={ errors.facebook?"red": "primary"}
                                    error={errors.facebook?.message}
                                    inputParams={register("facebook")}
                                    placeholder={t("merchant.facebook")}
                                />
                            </div>
                            <div className="mt-5 ">
                                <Textfield
                                    label={t("merchant.instagram")}
                                    type={ errors.instagram?"red": "primary"}
                                    error={errors.instagram?.message}
                                    inputParams={register("instagram")}
                                    placeholder={t("merchant.instagram")}
                                />
                            </div>
                            <div className="mt-5 ">
                                <Button  type="purpeldark" btnType="submit">
                                    Submit
                                </Button>
                            </div>
                        </div>

                    </div>
                </form>
            </Card>
        )
    }

    //otp verification
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalAction, setModalAction] = React.useState(null);
    const [otp, setOtp] = useState()

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = (action) => {
        setModalAction(action)
        switch (action){
            case "emailOtp":
                generateOTP ();
                break
            case "phoneOtp":
                generateOTP ();
                break
        }
        setIsOpen(true);
    }

    const verifyOTP = () => {
        const { localNumber ,email } = getValues()
        const telephone = {
            countryCode: countryCodes.sriLanka,
            localNumber
        }
        switch (modalAction){
            case "emailOtp":
                props.verifyOTP({
                    email: email,
                    otp: otp
                })
                break
            case "phoneOtp":
                props.verifyOTP({
                    mobileNo: telephone,
                    otp: otp
                })
                break
        }
    }

    const generateOTP = () => {
        const { localNumber ,email } = getValues()
        const telephone = {
            countryCode: countryCodes.sriLanka,
            localNumber
        }
        switch (modalAction){
            case "emailOtp":
                props.generateOTP({ email: email })
                break
            case "phoneOtp":
                props.generateOTP({ mobileNo: telephone })
                break
        }
    }

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,.7)",
        },
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            background: "rgba(0,0,0,.7)",
        },
    };

    const handleOTPChange = (otp) => {
        setOtp(otp);
    };

    useEffect(()=>{
        if(props.OTPVerification.status === statuses.success){
            closeModal()
            switch (modalAction) {
                case "emailOtp":
                    const email = getValues('email')
                    setInitialValuesForOTP((prevState) => ({
                        ...prevState,
                        email
                    }))
                    clearErrors("email")
                    break
                case "phoneOtp":
                    const localNumber = getValues('localNumber')
                    setInitialValuesForOTP((prevState) => ({
                        ...prevState,
                        telephone: {
                            countryCode: countryCodes.sriLanka,
                            localNumber: localNumber.substring(1)
                        }
                    }))
                    clearErrors("localNumber")
                    break
            }
        }
    },[props.OTPVerification])

    const renderModal = () => {
        return(
            <>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <OTPModal
                        closeModal={closeModal}
                        otp={otp}
                        OTPData={props.OTPVerification}
                        OTPGeneration={props.OTPGeneration}
                        handleOTPChange={handleOTPChange}
                        verifyOTP={verifyOTP}
                        generateOTP={generateOTP}
                    />
                </Modal>
            </>
        )
    }

    return (
        <div>
            { renderForm() }
            { renderModal() }
        </div>
    );

}
export default BusinessInfoEdit;
