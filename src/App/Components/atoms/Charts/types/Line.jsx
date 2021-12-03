import React from "react";
import { Line } from 'react-chartjs-2';

function LineChart({data, width, height, options ={ }}) {
    return (
      <Line 
      data={ data }
      width={ width }
      height={ height }
      options ={ options }
    />
    )
  }
  export default LineChart;