import React, { useState } from "react";
import { Typography } from "../Typography";
import { InputType, InputSize } from "./TextfieldTheme";

function Textfield(props) {

  const {
      label,
      placeHolder,
      error,
      success,
      className,
      type,
      size,
      value,
      disabled,
      required,
      inputParams,
      verificationAction,
      verificationActionText,
      onBlur} = props;

  return (
    <div className="flex flex-col">
      {label && (
        <Typography color="primary" type="body2" className="mb-2">
          {" "}
          {label}{" "}{required?"*":""}
        </Typography>
      )}

      <input
        type="text"
        className={`${InputType[type]} ${InputSize[size]} ${className} appearance-none border-2  w-full py-3 px-3 leading-tight border-gray-300 focus:outline-none 
            focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 border border-solid rounded-lg border-black Noto Sans`}
        {...inputParams}
        placeholder={placeHolder}
        disabled={disabled}
      />
      <span className="flex items-baseline">
          {error &&     <Typography className="text-danger mt-2" type="body2">{error}</Typography>}
      </span>
      {success && <Typography className="text-success mt-2" type="body2">{success}</Typography>}
    </div>
  );
}
export default Textfield;
