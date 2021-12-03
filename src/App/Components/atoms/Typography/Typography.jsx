import React from "react";

import {TypogrpahyType, TypogrpahyColor} from './TypographyTheme';

function Typogrpahy({color, type, children, className}) {

  return (
    <div className={`${TypogrpahyType[type]} ${TypogrpahyColor[color]} ${className}`}>{children}</div>
  )
}
export default Typogrpahy;