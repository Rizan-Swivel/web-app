import React, {useEffect, useState} from "react";
import { Typography } from "../Typography";
import { InputType, InputSize } from "../Textfield/TextfieldTheme";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Controller} from "react-hook-form";
import {dateFormat} from "../../../Utils/constants";

function DateField(props) {

    const { label,
        placeHolder,
        error,
        success,
        className="rounded-lg,border-gray-400",
        type,
        size,
        value,
        disabled,
        onChange,
        required,
        name,
        hookFormControlObject,
        defaultValue,
        datePickerOptions} = props;

    const [text, setText] = useState(null);
    const [startDate, setStartDate] = useState(null);

    function onSelect(event){
        setText(Date.parse(event));
        setStartDate(event)
    }

    return (
        <div className="flex flex-col">
            {label && (
                <Typography color="primary" type="body2" className="mb-2">
                    {" "}
                    {label}{" "}{required?"*":''}
                </Typography>
            )}
            <div className={`${InputType[type]} text-sm rounded text-xs ${className} border rounded-lg border-black
            appearance-none border-2 leading-tight border-gray-300 focus:outline-none 
            focus:border-indigo-700 focus:bg-white text-gray-700 font-mono   border-solid  Noto Sans`}>

                <Controller
                    name={name}
                    render={({ field }) => (
                        <DatePicker
                            onChange={(date) => field.onChange(date)}
                            selected={field.value}
                            dateFormat={dateFormat}
                            onSelect={onSelect}
                            className={`${InputType[type]} text-sm border px-4 py-3 rounded text-xs ${className} border border-none rounded-lg border-black w-full`}
                            minDate={new Date()}
                            {...datePickerOptions}
                        />
                    )}
                    control={hookFormControlObject}
                    defaultValue={defaultValue}
                />

            </div>
            {error && <Typography className="text-danger mt-2" type="body2">{error}</Typography>}
            {success && <Typography className="text-success mt-2" type="body2">{success}</Typography>}
        </div>
    );
}
export default DateField;