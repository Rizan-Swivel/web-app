import React, { useRef } from "react";
import { Card } from "../Card";
import { ImageComponent } from "../ImageComponent";
import { Typography } from "../Typography";

function FileInput(props) {
  const { t } = props

  const {
    name,
    label,
    error,
    success,
    className,
    accept,
    design,
    onChangeValue,
    value,
    disabled = false,
    preview = false,
    inputIcon = { type : "", className : ""},
    inputParams
  } = props;

  const inputFile = useRef(null) 

  const onButtonClick = () => {
   inputFile.current.click();
  };

  const iconButton = (icon) => {
    let c = ""
    let i = ""
    !icon.className ? c = "mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7 w-12" : c = icon.className;
    switch (icon.type) {
      case 'image':
         i = <div onClick={ onButtonClick } className="flex items-center justify-center w-32 h-32 bg-gray-100	cursor-pointer">
             <svg  className={ icon.className }  width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                <path d="M19.7917 3.125H5.20833C4.05774 3.125 3.125 4.05774 3.125 5.20833V19.7917C3.125 20.9423 4.05774 21.875 5.20833 21.875H19.7917C20.9423 21.875 21.875 20.9423 21.875 19.7917V5.20833C21.875 4.05774 20.9423 3.125 19.7917 3.125Z" stroke="#8E8E93" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.85449 10.4167C9.71744 10.4167 10.417 9.7171 10.417 8.85416C10.417 7.99121 9.71744 7.29166 8.85449 7.29166C7.99155 7.29166 7.29199 7.99121 7.29199 8.85416C7.29199 9.7171 7.99155 10.4167 8.85449 10.4167Z" stroke="#8E8E93" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21.8747 15.625L16.6663 10.4167L5.20801 21.875" stroke="#8E8E93" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            </svg>
          </div>
        break;
      case 'file':
        i = <svg onClick={ onButtonClick } className={ icon.className } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
        break;
      default:
        i = <button onClick={ onButtonClick } className={ icon.className ? icon.className : "bg-primary hover:opacity-75 text-white font-bold rounded py-2 px-4 text-xs" }>{t('file_input.browse')}</button>
    }
    return i
  }
  const simple = () => {
    return (
      <div>
        <input
          disabled={disabled}
          type="file"
          className={`${className}`}
          accept={accept}
          //onChange={   onSelectFile}
          placeholder={""}
          name={name}
          value={value}
          onChange={onChangeValue}
          style={{display: 'none'}}
          ref={inputFile}
          id={name}

        />
        {iconButton(inputIcon)}
        {preview ? (
          <Card  type="primary" size="small">
            <ImageComponent image={preview} />
          </Card>
        ) : null}
      </div>
    );
  };

  const icon = () => {
    return (
      <div className="flex w-full h-screen items-center justify-center bg-grey-lighter">
        <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-base leading-normal">Select a file</span>
          <input 
          type="file"
          className="hidden"
          accept={accept}
          value={value}
          onChange={onChangeValue}
           />
        </label>
        {preview ? (
          <Card  type="primary" size="small">
            <ImageComponent image={preview} />
          </Card>
        ) : null}
      </div>
    );
  };

  const drag = () => {
    return (
      <div className="border border-dashed border-gray-500 relative">
        <input
          type="file"
          className={`cursor-pointer relative block opacity-0 w-full h-full p-20 z-50 ${className}`}
          accept={accept}
          value={value}
          onChange={onChangeValue}
        />
        <div className="text-center p-10 absolute top-0 right-0 left-0 m-auto">
          <h4>
            Drop files anywhere to upload
            <br />
            or
          </h4>
          <p className="">Select Files</p>
        </div>
        {preview ? (
          <Card  type="primary" size="small">
            <ImageComponent image={preview} />
          </Card>
        ) : null}
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {label && (
        <Typography color="primary" type="body2" className="mb-2">
          {" "}
          {label}{" "}
        </Typography>
      )}

      {design === "simple" && simple()}
      {design === "icon" && icon()}
      {design === "drag" && drag()}

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
export default FileInput;
