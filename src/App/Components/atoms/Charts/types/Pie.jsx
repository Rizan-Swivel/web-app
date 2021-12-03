import React from "react";
import { Pie } from 'react-chartjs-2';

function PieChart({data, width, height, options ={}}) {
    return (
      <Pie
      data={ data }
      width={ width }
      height={ height }
      options ={ options }
    />
    )
  }
  export default PieChart;