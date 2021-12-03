import React from "react";
import "../../../assets/styles/main.css";
import { Card } from "../../../Components/atoms/Card";
import { useHistory } from "react-router-dom";
import {Button} from "../../../Components/atoms/Button";
import TextfieldPassword from "../../../Components/atoms/Textfield/TextfieldPassword";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { validatePassword } from "../../../Utils/Validations";
import YupPassword from 'yup-password'

YupPassword(yup) // extend yup

function PasswordChange(props) {
    const { t, userId } = props;

    const passwordsSchema = yup.object().shape({
        currentPassword: yup.string()
            .required()
            .label(t("common.currentPassword")),
        newPassword: yup.string().password()
            .required()
            .min(6)
            .label(t("login.newPassword")),
        confirmNewPassword: yup.string()
            .required()
            .oneOf([yup.ref('newPassword'),null], t("errors.confirmPasswordDoesntMatch"))
            .label(t("login.confirmPassword"))
    });

    const { register, handleSubmit,formState:{ errors }, setValue } = useForm({
        mode: 'onChange',
        resolver: yupResolver(passwordsSchema),
    });

    const onSubmit = (data) =>{
        const metaData = {
            onSuccess: t("notifications.passwordSuccessfullyUpdated"),
            onFail: t("notifications.passwordUpdateFailed"),
            useHistory,
            userId
        }
        const payload = {
            password: data.currentPassword,
            newPassword: data.newPassword,
        }
        props.updateUserPassword({payload, metaData});
    }

    const renderForm=()=>{
        return (
            <Card type="primary" size="full">
                <form  onSubmit={handleSubmit(onSubmit)} >
                    <div className="">
                        <div className="mt-5 ">
                            <TextfieldPassword
                                size="sm"
                                label={t("common.currentPassword")}
                                type={ errors.currentPassword?"red": "primary"}
                                error={errors.currentPassword?.message}
                                inputParams={register("currentPassword")}
                                placeholder={t("common.currentPassword")}
                            />
                        </div>
                        <div className="mt-5 ">
                            <TextfieldPassword
                                size="sm"
                                label={t("common.newPassword")}
                                type={ errors.newPassword?"red": "primary"}
                                error={errors.newPassword?.message}
                                inputParams={register("newPassword")}
                                placeholder={t("common.newPassword")}
                            />
                        </div>
                        <div className="mt-5 ">
                            <TextfieldPassword
                                size="sm"
                                label={t("common.confirmNewPassword")}
                                type={ errors.confirmNewPassword?"red": "primary"}
                                error={errors.confirmNewPassword?.message}
                                inputParams={register("confirmNewPassword")}
                                placeholder={t("common.confirmNewPassword")}
                            />
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
    return (
        <div>
            {renderForm()}
        </div>
    );
}
export default PasswordChange;
