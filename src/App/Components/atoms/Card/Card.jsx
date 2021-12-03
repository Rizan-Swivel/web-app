import React from "react";

import {CardType, CardSize} from './CardStyles';

const Card = ({size, type, children, className}) => {
  return (
    <div className={`${CardType[type]} ${CardSize[size]} ${className}`}>
      {children}
    </div>
  );
}
export default Card;
