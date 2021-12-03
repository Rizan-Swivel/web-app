import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import StartupActions from "../Stores/Startup/Actions";
import "../assets/styles/main.css";
import { Button } from "../Components/atoms/Button";
import { Card } from "../Components/atoms/Card";
import { Typography } from "../Components/atoms/Typography";
import { Textfield } from "../Components/atoms/Textfield";
import TextfieldPassword from "../Components/atoms/Textfield/TextfieldPassword";
import qponLogo from "../assets/images/qpon-logo.png";
import "animate.css";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { isSLPhoneNumber, validateEmail } from "../Utils/Validations";
import { countryCodes, grantTypes } from "../Utils/constants"

function Login(props) {
  const { t } = props;
  const history = useHistory();

  const schema = yup.object().shape({
    username: yup.string().required()
        .test("email-mobile",t("errors.usernameShouldBeValidEmailOrPhone"),
            function (value){
              return  !!(validateEmail(value) || isSLPhoneNumber(value))
          }
        ).label(t("login.username")),
    password: yup.string().required().label(t("login.password")),
  });

  const { register, handleSubmit,formState:{ errors }, control } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const gotToSignUp = () => {
    console.log("gotToSignUp ")

    history.push("/signUp");
  };

  const onSubmit = (data) => {
    const payload = {
      grant_type: grantTypes.password,
      username: isSLPhoneNumber(data.username) ? countryCodes.sriLanka + data.username.substring(1) : data.username,
      password: data.password,
    };
    props.login(payload);
  }

  const renderForm = () => {
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <Textfield
                type={ errors.username?"red": "primary"}
                size="sm"
                label={t("common.username")}
                error={errors.username?.message}
                placeHolder={t("login.enterValidEmailOrMobileNumber")}
                inputParams={register("username")}
            />
          </div>
          <div className="mt-4">
            <TextfieldPassword
                type={ errors.password?"red": "primary"}
                size="sm"
                label={"Password"}
                error={errors.password?.message}
                inputParams={register("password")}
                toolTip={t("login.passwordHelpText")}
            />
          </div>
          <div className="flex justify-left mt-4 signIn-bttn py-5">
            <Button
                type="primary"
                className="w-1/2 p-4 mr-2 bg-gradient"
                btnType="submit"
            >
              {t("login.sign_in")}
            </Button>
            <Button
                onClick={gotToSignUp}
                type="outline"
                className="ml-2 w-1/2"
                btnType="button"
            >
              {t("login.dont_have_an_account")}
            </Button>
          </div>
        </form>
    )
  }

  return (
    <div>
      <div className="w-full h-screen flex flex-wrap login-page">
        <div className="w-1/2  hidden md:flex content-center bg-gradient login-page-left">
          <div className="w-full flex flex-col justify-center text-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <div className="flex justify-center">
              <img src={qponLogo} className="" />
            </div>
            <Typography
              color="white"
              type="h1"
              className="text-5xl pt-4 animate__animated animate__bounce"
            >
              {/* {t("welcome_title")} */}
              
            </Typography>
            <Typography color="white" className="text-base leading-normal">
              {t("welcome_sub_title")}
            </Typography>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col content-center bg-gradient md:bg-white md:bg-none login-page-right">
          <div className="flex flex-col justify-center text-center w-full md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <Card
              type="primary"
              className="bg-white w-full text-left bg-opacity-75 pb-8 px-4 md:px-8"
            >
              <div>
                <Typography
                  color="primary"
                  type="h1"
                  className="flex text-xl md:text-3xl"
                >
                  {t("login.header")}
                </Typography>
                {renderForm()}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  error: state.startup.error,
});

const mapDispatchToProps = (dispatch) => ({
  setUserData: (user) => dispatch(StartupActions.setUserData(user)),
  signInGoogle: (token) => dispatch(StartupActions.signInGoogle(token)),
  signInFacebook: (token) => dispatch(StartupActions.signInFacebook(token)),
  isAuthenticated: () => dispatch(StartupActions.isAuthenticated()),
  login: (payload) => dispatch(StartupActions.login(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
