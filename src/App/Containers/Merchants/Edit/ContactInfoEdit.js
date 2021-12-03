import React, { useEffect, useState } from 'react';
import { Card } from "../../../Components/atoms/Card";
import { Textfield } from "../../../Components/atoms/Textfield";
import { Button } from "../../../Components/atoms/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { isSLPhoneNumber } from "../../../Utils/Validations";
import {countryCodes, mobileNumberLeadingZeros, statuses} from "../../../Utils/constants";
import { get, isEqual } from "lodash";
import { Typography } from "../../../Components/atoms/Typography";
import Modal from "react-modal";
import OTPModal from "../../Merchant/OTPModal";

const ContactInfoEdit = (props) => {
    const { t, userId } = props;

    const schema = yup.object().shape({
        name: yup.string().required().label(t("common.name")),
        localNumber: yup.string().required().test("mobile",t("errors.phoneNumberIsNotValid"),
                function (value){
                    return  isSLPhoneNumber(value)
                }
            ).test('mobile-otp',t("merchant.otpIsNotVerified"),
                function (value) {
                    return onTelephoneChange(value)
            }).label(t("common.telephone")),
        designation: yup.string().nullable().label(t("common.designation")),
        email: yup.string().email().test('email-otp',t("merchant.otpIsNotVerified"),
            function (value) {
                return onEmailChange(value)
            }).nullable().label(t("common.email")),
    });

    const [formData, setFormData] = React.useState(false);

    const { register, handleSubmit, formState: { errors }, reset, getValues, clearErrors } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const OnSubmit = data => {
        setFormData({
            merchantId: userId,
            name: data.name,
            designation: data.designation,
            telephone: {
                countryCode: (data.telephone?.countryCode) ? data.telephone?.countryCode : countryCodes.sriLanka,
                localNumber: data.localNumber ? data.localNumber.substring(1) : ""
            },
            email: data.email,
        })
    }

    useEffect(() => {
        if (formData)
            props.updateMerchantContactInfo({
                ...formData,
                userId,
                merchantId: userId
            });
    },[formData])

    useEffect(() => {
        props.getContactInfoByMerchantId({
            userId,
            merchantId: userId
        })

        return () => props.resetMerchantState()

    },[])

    //set default values
    useEffect(() => {
        reset({
            ...props.merchantContactInfo,
            localNumber: props.merchantContactInfo ? `${mobileNumberLeadingZeros.sriLanka}${get(props,"merchantContactInfo.telephone.localNumber")}`  : ""
        })

        //store initial email and telephone values for OTP verification on change
        if (props.merchantContactInfo?.telephone){
            setInitialValuesForOTP((prevState)=>({
                ...prevState,
                telephone: {
                    countryCode: get(props,"merchantContactInfo.telephone.countryCode"),
                    localNumber: get(props,"merchantContactInfo.telephone.localNumber")
                }
            }))
        }
        if (props.merchantContactInfo?.email){
            setInitialValuesForOTP((prevState)=>({
                ...prevState,
                email: get(props,"merchantContactInfo.email")
            }))
        }

    },[props.merchantContactInfo])

    const onEmailChange = (value) => {
        return initialValuesForOTP.email === value || value=="";
    }

    const onTelephoneChange = (value) => {
        const telephone = {
            countryCode: countryCodes.sriLanka,
            localNumber: value.substring(1)
        }
        return isEqual(initialValuesForOTP.telephone, telephone) || value=="";;
    }

    const renderForm=()=>{
        return (
            <Card type="primary" size="full">
                <form  onSubmit={handleSubmit(OnSubmit)} >
                    <div className="flex flex-row ">
                        <div className="w-2/3 ">
                            <div className="mt-5 ">
                                <Textfield
                                    size="sm"
                                    label={t("common.name")}
                                    type={ errors.name?"red": "primary"}
                                    error={errors.name?.message}
                                    inputParams={register("name")}
                                    placeholder={t("common.name")}
                                />
                            </div>
                            <div className="mt-5 ">
                                <Textfield
                                    size="sm"
                                    label={t("merchant.designation")}
                                    type={ errors.designation?"red": "primary"}
                                    error={errors.designation?.message}
                                    inputParams={register("designation")}
                                    placeholder={t("merchant.designation")}
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
                                <Button  type="purpeldark" btnType="submit">
                                    {t("common.submit")}
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
    const [initialValuesForOTP,setInitialValuesForOTP] = useState({
        email: null,
        telephone: null
    })

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = (action) => {
        setModalAction(action)
        switch (action){
            case "emailOtp":
                break
            case "phoneOtp":
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
export default ContactInfoEdit;
