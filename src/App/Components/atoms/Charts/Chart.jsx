import React from "react"; 
import {BarChart } from "./types"

export default function Chart({ type, data, width, height, options }){
  if(type){
    switch (type) {  
      case "bar":
        return <BarChart data={ data } width={width}  height={height} options={options}/>    
      default:
        return '';
    }
  }
  return <p>Chart return null</p>
}