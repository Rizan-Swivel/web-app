import React, { useState } from "react";
import { Typography } from "../Typography";
import Select from "react-select";

function MultiSelect(props) {
  const { label, error, success, disabled, isMulti, required, inputParams } = props;
  const [text, setText] = useState(null);

  function onChange(event) {
    setText(event.target.value);
  }
  return (
    <div className="flex flex-col">
      {label && (
        <Typography color="primary" type="body2" className="mb-2">
          {" "}
          {label}{" "}{required?"*":""}
        </Typography>
      )}
      <Select
        isDisabled={disabled}
        isMulti={!isMulti}
        className="basic-multi-select Noto Sans"
        classNamePrefix="select"
        {...props}
        onBlur={onChange}
      />
      {error && (
        <Typography className="text-danger mt-2" type="body2">
          {error}
        </Typography>
      )}
      {success && (
        <Typography className="text-success mt-2" type="body2">
          {success}
        </Typography>
      )}
    </div>
  );
}
export default MultiSelect;
