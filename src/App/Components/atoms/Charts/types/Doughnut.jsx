import React from "react";
import { Doughnut } from 'react-chartjs-2';

function DoughnutChart({data, width, height, options ={ }}) {
    return (
        <Doughnut
        data={ data }
        width={ width }
        height={ height }
        options ={ options }
      />
    )
  }
  export default DoughnutChart;