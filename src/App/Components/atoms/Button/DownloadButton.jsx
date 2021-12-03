import React from "react";
import Button from './Button'

const DownloadButton = props => {
    const {size='sm', type, children, className, file } = props
    const toDataURL = (url) => {
      return fetch(url).then((response) => {
          return response.blob();
      }).then(blob => {
          return URL.createObjectURL(blob);
      });
    }

    const download = async () => {
      const a = document.createElement("a");
      a.href = await toDataURL(file.url);
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    return (
        <Button onClick={download} size={size} type={type} className={className} >{children}</Button>
    )
  }
  export default DownloadButton;