import React from "react";

import {ButtonType, ButtonSize} from './ButtonStyles';

function Button(props) {
  const {size='sm', type, children, className, btnType, onClick} = props
  return (
    <button type={btnType}  data-testid="button" onClick={onClick} className={`${ButtonType[type]} ${ButtonSize[size]} ${className}`}>{children}</button>
  )
}
export default Button;