import React, {useEffect, useState} from "react";
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import YupPassword from 'yup-password'
import {Textfield} from "../../Components/atoms/Textfield";
import {Button} from "../../Components/atoms/Button";
import TextfieldPassword from "../../Components/atoms/Textfield/TextfieldPassword";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import OTPModal from "../Merchant/OTPModal";
import {compose} from "redux";
import BaseHOC from "../BaseHOC";
import MerchantsStore from "./MerchantsStore";
import {statuses, countryCodes} from "../../Utils/constants";
import {isSLPhoneNumber, validatePassword} from "../../Utils/Validations";
import {isEqual} from "lodash";

YupPassword(yup) // extend yup

export const  SignUp = (props) => {
    const {t} = props;
    const history = useHistory();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [formData, setFormData] = React.useState(false);
    const [initialValuesForOTP,setInitialValuesForOTP] = useState({})
    const [OTPVerified,setOTPVerified] = useState(false)

    const onTelephoneChange = (value) => {
        const telephone = {
            countryCode: countryCodes.sriLanka,
            localNumber: value.substring(1)
        }
        if (isEqual(initialValuesForOTP, telephone)){
            
            setOTPVerified(true)
        } else{
            setOTPVerified(false)
            props.resetOTPVerification()
        }
    }
    useEffect(()=>{},[OTPVerified])    

    const schema = yup.object().shape({
        fullName: yup.string().required().label(t("common.name")),
        countryCode: yup.string(),
        localNumber: yup.string().test("mobile",t("errors.phoneNumberIsNotValid"),
            function (value){
                onTelephoneChange(value)
                return  isSLPhoneNumber(value)
            }
        ).required().label(t("login.mobilePhoneNumber")),
        password: yup.string().min(6).test(
            "regex",          
            "Must atleast Contain 6 Characters,atleast One Uppercase, One Lowercase, One Number",
            val => {
                let regExp = new RegExp(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
                );              
                return regExp.test(val);
              }
          )
            .required().label(t("login.password")),
        confirmPassword: yup.string().oneOf([yup.ref('password'),null], t('errors.confirmPasswordDoesntMatch')).required().label(t("login.confirmPassword")),
    });

    const { register, handleSubmit,formState:{ errors }, getValues } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues:{
            countryCode: countryCodes.sriLanka,
        }
    });

    const onSubmit = data => {
        setFormData({
                fullName: data.fullName,
                password: data.password,
                mobileNo: {
                    countryCode: data.countryCode,
                    localNumber: data.localNumber.substring(1)
                },
            })

        if (OTPVerified){
            props.merchantSignUp(formData)
        }else {
            openModal();
        }
    };

    const openModal = () => {
        setIsOpen(true);
        generateOTPEmail()
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const gotToLogin = () => {
        history.push("/login");
    };

    const verifyOTPEmail = () => {
        const {localNumber, countryCode} = getValues()
        props.verifyOTP({ mobileNo: {
                countryCode: countryCode,
                localNumber: localNumber.substring(1)
            }, otp: otp });
    };

    const generateOTPEmail = () => {
        const {localNumber, countryCode} = getValues()
        props.generateOTP({mobileNo: {
                countryCode: countryCode,
                localNumber: localNumber.substring(1)
            }});
    };

    const [otp, setOtp] = useState()

    const handleOTPChange = (otp) => {
        setOtp(otp);
    };

    useEffect(()=>{
        if(props.OTPVerification?.status == statuses.success){
            const {localNumber, countryCode} = getValues()
            setInitialValuesForOTP({countryCode,localNumber: localNumber.substring(1)})
            setOTPVerified(true)
            closeModal()
        }else {
            setOTPVerified(false)
        }
    },[props.OTPVerification])

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

    const renderForm = () => {
        return(
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mt-4">
                    <Textfield
                        type={ errors.fullName?"red": "primary"}
                        size="sm"
                        label={t("common.name")}
                        error={errors.fullName?.message}
                        placeholder={t}
                        inputParams={register("fullName")}
                    />
                </div>
                <div className="mt-4">
                    <Textfield
                        type={ errors.localNumber?"red": "primary"}
                        size="sm"
                        label={t('common.mobile')}
                        error={errors.localNumber?.message}
                        placeholder={"Place holder"}
                        inputParams={register("localNumber")}
                    />
                </div>
                <div className="mt-4">
                    <TextfieldPassword
                        type={ errors.password?"red": "primary"}
                        size="sm"
                        label={t('common.password')}
                        error={errors.password?.message}
                        placeholder={"Place holder"}
                        inputParams={register("password")}
                        toolTip={t("login.passwordHelpText")}
                    />
                </div>
                <div className="mt-4">
                    <TextfieldPassword
                        type={ errors.confirmPassword?"red": "primary"}
                        size="sm"
                        label={t('common.confirmPassword')}
                        error={errors.confirmPassword?.message}
                        placeholder={"Place holder"}
                        inputParams={register("confirmPassword")}
                    />
                </div>
                <div className="flex justify-between mt-8">
                    <Button onClick={gotToLogin} type="outline" className="ml-2" btnType="button">
                        {t("merchant_sign_up.already_have_an_account")}
                    </Button>
                    <Button
                        type="primary"
                    >
                        {OTPVerified ? t("merchant_sign_up.next_btn") : t("merchant.verifyOtp")}
                    </Button>
                </div>
            </form>
        )
    }

    const renderModal = () => {
        return(
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
                    handleOTPChange={handleOTPChange}
                    verifyOTP={verifyOTPEmail}
                    generateOTP={generateOTPEmail}
                />
            </Modal>
        )
    }

    return (
        <div>
            { renderForm() }
            { renderModal() }
        </div>
    );
}

export default compose(BaseHOC)(MerchantsStore(SignUp))