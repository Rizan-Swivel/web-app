import React, {useEffect, useState} from "react";
import OtpInput, { hasErrored} from "react-otp-input";
import {statuses} from "../../Utils/constants";

const OTPModal = (props) => {
  const {
    closeModal,
    otp,
    OTPData,
    OTPGeneration,
    handleOTPChange,
    verifyOTP,
    generateOTP,
  } = props;

  const [latestStatus, setLatestStatus] = useState(null)
  const [latestMsg, setLatestMsg] = useState(null)
  const [otpValidation, setOtpValidation] = useState(false)

  useEffect(()=>{
    if (OTPGeneration){
      setLatestStatus(OTPGeneration.status)
      setLatestMsg(OTPGeneration.displayMessage)
    }
  },[OTPGeneration])

  useEffect(()=>{
    if(OTPData){
      setLatestStatus(OTPData.status)
      setLatestMsg(OTPData.displayMessage)
    }
  },[OTPData])

  const validateOtp = (otp) => {
    if(otp.length == 6){
      setOtpValidation(true)
    }else {
      setOtpValidation(false)
    }
  }

  const submit = () => {
    if (validateOtp)
      verifyOTP()
  }

  const onChange = (value) => {
    validateOtp(value)
    handleOTPChange(value)
  }

  return (
    <>
      <div className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster">
        <div className="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="modal-content py-4 text-left px-6">
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl font-bold">Enter verification code</p>
              <div className="modal-close cursor-pointer z-50">
                <svg
                  onClick={closeModal}
                  className="fill-current text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
              </div>
            </div>
            {latestStatus && latestStatus === statuses.error && (
              <div style={{ color: "red" }}>{latestMsg}</div>
            )}
            {latestStatus && latestStatus === statuses.success && (
                <div style={{ color: "blue" }}>{latestMsg}</div>
            )}
            <div className="my-5">
              <OtpInput
                value={otp}
                onChange={onChange}
                numInputs={6}
                inputStyle={{
                  borderWidth: "1px",
                  width: "2em",
                  height: "2em",
                }}
                hasErrored={validateOtp}
                separator={<span>-</span>}
              />
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={generateOTP}
                className="focus:outline-none modal-close px-4 bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300"
              >
                Resend OTP
              </button>
              <button
                onClick={submit}
                className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPModal;
