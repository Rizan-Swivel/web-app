import React from "react";
import { connect } from "react-redux";
import StartupActions from "../Stores/Startup/Actions";
import "../assets/styles/main.css";
import { Card } from "../Components/atoms/Card";
import MerchantSignUp from "./Merchants/SignUp";

import { useHistory } from "react-router-dom";
import { Typography } from "../Components/atoms/Typography";

import SampleLogo from "../assets/images/sample-logo.png";
import {statuses} from "../Utils/constants";
import {Button} from "../Components/atoms/Button";

function SignUp(props) {
  const { t } = props;
  const history = useHistory();

  const gotToLogin = () => {
    history.push("/login");
  };

  return (
    <div>
      <div className="w-full h-screen flex flex-wrap">
        <div className="w-1/2  hidden md:flex content-center bg-gradient">
          <div className="flex flex-col justify-center text-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <div className="flex justify-center">
              <img src={SampleLogo} className="w-24" />
            </div>
            <Typography color="white" type="h1" className="text-5xl">
              {t("welcome_title")}
            </Typography>
            <Typography color="white" className="text-base leading-normal">
              {t("welcome_sub_title")}
            </Typography>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col content-center bg-gradient md:bg-white md:bg-none">
          <div className="flex flex-col justify-center text-center w-full md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <Card
              type="primary"
              className="bg-white w-full text-left bg-opacity-75 pb-8 px-4 md:px-8"
            >
              <Typography
                color="primary"
                type="h1"
                className="flex text-xl md:text-3xl"
              >
                {t("merchant_sign_up.form_title")}
              </Typography>

              {props.merchantData && props.merchantData.status == statuses.success && (
                <div class="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-green-700 bg-green-100 border border-green-300 ">
                  <div slot="avatar">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-check-circle w-5 h-5 mx-2"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <div className="text-xl font-normal  max-w-full flex-initial">
                   
                    <Button onClick={gotToLogin} type="outline" className="ml-2" btnType="button">
                    {t("Login")}
                  </Button>
                  </div>
                </div>
              )}
              <MerchantSignUp {...props} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ startup: { merchantSignUpResp } }) => ({
  merchantData: merchantSignUpResp,
});

const mapDispatchToProps = (dispatch) => ({
  merchantSignUpWeb: (data) => dispatch(StartupActions.merchantSignUp(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
