import React, { useEffect, useState } from "react";
import "../../../assets/styles/main.css";
import { Card } from "../../../Components/atoms/Card";
import { Button } from "../../../Components/atoms/Button";
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { isSLPhoneNumber } from "../../../Utils/Validations";
import { countryCodes, mobileNumberLeadingZeros, statuses } from "../../../Utils/constants";
import { get, isEqual } from "lodash";
import Modal from "react-modal";
import OTPModal from "../../Merchant/OTPModal";
import { Textfield } from "../../../Components/atoms/Textfield";
import { Typography } from "../../../Components/atoms/Typography";

function UsernameChange(props) {
    const { t, userId } = props;

    const passwordsSchema = yup.object().shape({
        email: yup.string().email()
            .test('email-otp',t("merchant.otpIsNotVerified"),
                function (value) {
                    return onEmailChange(value)
            }).nullable().label(t("common.email")),
        localNumber: yup.string()
            .test("mobile",t("errors.phoneNumberIsNotValid"),
                function (value){
                    return  isSLPhoneNumber(value)
                }
            ).test('mobile-otp',t("merchant.otpIsNotVerified"),
                function (value) {
                    return onTelephoneChange(value)
            }).required().label(t("common.telephone")),
    });

    const { register, handleSubmit, formState: { errors }, reset, getValues, control, clearErrors } = useForm({
        mode: 'onChange',
        resolver: yupResolver(passwordsSchema),
    });

    const { dirtyFields } = useFormState({
        control
    });

    //set default values
    useEffect(() => {
        reset({
            ...props.merchantSummery,
            localNumber: props.merchantSummery?.mobileNo? `${mobileNumberLeadingZeros.sriLanka}${get(props,"merchantSummery.mobileNo.localNumber")}`  : "",
            email: get(props,"merchantSummery.email")
        })

        //store initial email and telephone values for OTP verification on change
        if (props.merchantSummery.mobileNo){
            setInitialValuesForOTP((prevState)=>({
                ...prevState,
                telephone: {
                    countryCode: get(props,"merchantSummery.mobileNo.countryCode"),
                    localNumber: get(props,"merchantSummery.mobileNo.localNumber")
                }
            }))
        }
        if (props.merchantSummery.email){
            setInitialValuesForOTP((prevState)=>({
                ...prevState,
                email: get(props,"merchantSummery.email")
            }))
        }

    },[props.merchantSummery])

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

    const onSubmit = (data) =>{
        if (dirtyFields.email) {
            props.updateMerchantEmail({
                email: data.email,
                userId
            });
        }
        if (dirtyFields.localNumber) {
            props.updateMerchantMobileNo({
                mobileNo: {
                    countryCode: countryCodes.sriLanka,
                    localNumber: data.localNumber.substring(1)
                },
                userId
            });
        }
    }

    const renderForm=()=>{
        return (
            <Card type="primary" size="full">
                <form  onSubmit={handleSubmit(onSubmit)} >
                    <div className="">
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
export default UsernameChange;
