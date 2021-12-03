import React from "react";
import { Bar } from 'react-chartjs-2';

function BarChart({ data, width, height, options={} }) {
    return (
      <Bar
      data={ data }
      width={ width }
      height={ height }
      options ={ options }
    />
    )
  }
  export default BarChart;