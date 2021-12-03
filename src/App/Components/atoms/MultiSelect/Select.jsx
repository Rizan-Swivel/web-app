import React from "react";
import { Typography } from "../Typography";
import Select from "react-select";
import { Controller } from "react-hook-form";
import {InputType} from "../Textfield/TextfieldTheme";

function MultiSelect(props) {
    const {
        name,
        label,
        error,
        success,
        disabled,
        isMulti,
        required,
        options,
        defaultValue, //this is an array of {value:"", label: ""} objects when multiple selection enabled otherwise one object
        controlObject, //react hook from control object
        type
    } = props;

    const style = {
        control: base => ({
            ...base,
            border: 0,
            // This line disable the blue border
            boxShadow: "none"
        })
    };

    return (
        <div className="flex flex-col">
            {label && (
                <Typography color="primary" type="body2" className="mb-2">
                    {" "}{label}{" "}{required?"*":""}
                </Typography>
            )}
            <div className={`${InputType[type]} appearance-none border-2  w-full px-1 leading-tight border-gray-300 focus:outline-none 
            focus:border-indigo-700 focus:bg-white text-gray-700 border border-solid rounded-lg border-black `}>
            <Controller
                name={name}
                render={({ field }) => (
                    <Select
                        {...field}
                        isMulti={isMulti}
                        options={options}
                        styles={style}
                    />
                )}
                control={controlObject}
                defaultValue={defaultValue}
            />
            </div>
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
