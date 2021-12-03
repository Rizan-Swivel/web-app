import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import StartupActions from "../../Stores/Startup/Actions";
import "../../assets/styles/main.css";
import { Button } from "../../Components/atoms/Button";
import { Textfield } from "../../Components/atoms/Textfield";
import TextfieldPassword from "../../Components/atoms/Textfield/TextfieldPassword";
import Modal from "react-modal";
import OTPModal from "./OTPModal";

Modal.setAppElement("#root");

const BasicInformation = (props) => {
  const { values, handleChange, next, t, gotToLogin, validateFields } = props;

  const [otp, setOtp] = useState("");
  const ref = useRef();

  const otpVerificationDialog = (val) => {
    let valid = validateFields(values);

    if (!valid) return;
    else if (!values.email.OTPVerified) {
      props.generateOTP(val);
      openModal();
    } else next(values, "next");
  };

  const verifyOTPEmail = () => {
    props.verifyOTP({ email: values.email.value, otp: otp });
  };

  const generateOTPEmail = () => {
    props.generateOTP(values.email.value);
  };

  const handleOTPChange = (otp) => {
    setOtp(otp);
  };

  const setOTPVerified = (obj) => {
    obj.email.OTPVerified = true;
  };

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

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (
      props.OTPData &&
      props.OTPData.status == "SUCCESS" &&
      !values.email.OTPVerified
    ) {
      setOTPVerified(values);
      closeModal();
      next(values, "next");
    }
  }, [props.OTPData]);

  return (
    <>
      <div className="mt-4">
        <Textfield
          type={
            values.mobile.valid == null
              ? "primary"
              : values.mobile.valid
              ? "green"
              : "red"
          }
          size="sm"
          label={t(values.mobile.label)}
          onChange={(e) => handleChange(values.mobile, e)}
          error={
            values.mobile.valid == null
              ? null
              : values.mobile.valid
              ? null
              : values.mobile.errorMessage
          }
          placeholder={t(values.mobile.label)}
          value={values.mobile.value}
        />
      </div>
      {/*{values.email.OTPVerified && values.email.key == "email" && (*/}
      {/*    <div style={{ color: "green" }}>OTP verified</div>*/}
      {/*)}*/}


      <div className="mt-4">
        <TextfieldPassword
          type={
            values.password.valid == null
              ? "primary"
              : values.password.valid
              ? "green"
              : "red"
          }
          size="sm"
          label={t(values.password.label)}
          onChange={(e) => handleChange(values.password, e)}
          error={
            values.password.valid == null
              ? null
              : values.password.valid
              ? null
              : values.password.errorMessage
          }
          placeholder={t(values.password.label)}
          value={values.password.value}
        />
      </div>

      <div className="mt-4">
        <TextfieldPassword
          type={
            values.passwordConfirmation.valid == null
              ? "primary"
              : values.passwordConfirmation.valid
              ? "green"
              : "red"
          }
          size="sm"
          label={t(values.passwordConfirmation.label)}
          onChange={(e) => handleChange(values.passwordConfirmation, e)}
          error={
            values.passwordConfirmation.valid == null
              ? null
              : values.passwordConfirmation.valid
              ? null
              : values.passwordConfirmation.errorMessage
          }
          placeholder={t(values.passwordConfirmation.label)}
          value={values.passwordConfirmation.value}
        />
      </div>

      <div className="flex justify-between mt-8">
        <Button onClick={gotToLogin} type="outline" className="ml-2">
          {t("merchant_sign_up.already_have_an_account")}
        </Button>
        <Button
          onClick={() => otpVerificationDialog(values.email.value)}
          type="primary"
        >
          {t("merchant_sign_up.next_btn")}
        </Button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <OTPModal
          closeModal={closeModal}
          otp={otp}
          OTPData={props.OTPData}
          handleOTPChange={handleOTPChange}
          verifyOTPEmail={verifyOTPEmail}
          generateOTPEmail={generateOTPEmail}
        />
      </Modal>
    </>
  );
};

const mapStateToProps = ({ startup: { OTP, error } }) => ({
  OTPData: OTP,
});

const mapDispatchToProps = (dispatch) => ({
  generateOTP: (data) => dispatch(StartupActions.generateOTP(data)),
  verifyOTP: (data) => dispatch(StartupActions.verifyOTP(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicInformation);
