import React, { useState } from "react";
import { Typography } from "../Typography";
import { InputType, InputSize } from "./TextfieldTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from 'react-tooltip';

function TextfieldPassword(props) {
  const { label,
    placeHolder,
    error,
    success,
    className,
    type,
    password ,
    onChange,
    size,
    value,
    inputParams,
    toolTip} = props;

  const [typeHide, setTypeHide] = useState({ type: "password"})

  function onPassToggle() {
    setTypeHide(typeHide.type === "text" ? { type: "password" } : { type: "text" });
  }

  return (
    <div className="flex flex-col">
      {label && (
          <div className={"flex flex-row items-baseline"}>
            <Typography color="primary" type="body2" className="mb-2">
              {" "}{label}{" "}
            </Typography>
            {toolTip &&  <p className="ml-3 mb-3" data-tip={toolTip}><FontAwesomeIcon  icon={faInfoCircle}/></p> }
            <ReactTooltip html={true} />
          </div>
      )}
      <div className="relative w-full">
        <div className="absolute inset-y-0 right-0 flex items-center px-2">
          <label className={`${typeHide.type} rounded px-2 py-1 text-sm text-gray-600 cursor-pointer js-password-label`} onClick={onPassToggle} htmlFor="toggle">
            { typeHide.type === "text" ?  <FontAwesomeIcon icon={faEye}/> : <FontAwesomeIcon icon={faEyeSlash}/> }
          </label>
        </div>
        <input className={`${InputType[type]} ${InputSize[size]} ${className} appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none 
            focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 rounded-lg
            js-password`}
            type={ typeHide.type }
            autoComplete="off"
            placeholder={placeHolder}
            onChange={onChange}
            size={size}
            value={value}
            {...inputParams}
        />
      </div>
      {error && <Typography className="text-danger mt-2" type="body2">{error}</Typography>}
      {success && <Typography className="text-success mt-2" type="body2">{success}</Typography>}
    </div>
  );
}
export default TextfieldPassword;
