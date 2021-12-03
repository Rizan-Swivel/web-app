import React, { useState } from "react";
import { Typography } from "../Typography";
import { InputType, InputSize } from "./TextareaTheme";

function Textarea(props) {
  const [text, setText] = useState(null);

  function onChange(event){
    setText(event.target.value);
  }
  const { label, placeHolder, error, success, className, type, size, required, inputParams } = props;
  return (
    <div className="flex flex-col">
      {label && (
        <Typography color="primary" type="body2" className="mb-2">
          {" "}
          {label}{" "}{required?"*":''}
        </Typography>
      )}
      <textarea
        type="text"
        className={`${InputType[type]} ${InputSize[size]} ${className} border border-solid rounded-lg border-black Noto Sans`}
        placeholder={placeHolder}
        {...props}
        onBlur={onChange}
        {...inputParams}
      />
      {error && <Typography className="text-danger mt-2" type="body2">{error}</Typography>}
      {success && <Typography className="text-success mt-2" type="body2">{success}</Typography>}
    </div>
  );
}
export default Textarea;
