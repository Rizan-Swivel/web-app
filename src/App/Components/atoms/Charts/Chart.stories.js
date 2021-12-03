import React from 'react';
//Loading data
import doughnut from './types/data/doughnut'
import bar from './types/data/bar'
import pie from './types/data/pie'
import line from './types/data/line'


import Chart from "./Chart";
import { Card } from '../Card';
import { Typography } from '../Typography'

export default {
  title: 'Chart',
  component: Chart,
};

export const showcase = (data) => 
<div className="p-0 md:p-12">
        <Typography color="primary" type="h1">
            Chart JS
        </Typography>
        <div className="grid grid-cols-4 gap-4">
            <Card type="primary" >
              <Chart type="line" data={line} width="350" />
            </Card> 
            <Card type="primary" >
              <Chart type="doughnut" data={doughnut} width="300" />
            </Card> 
            <Card type="primary" >
              <Chart type="pie" data={pie} width="400" />
            </Card> 
            <Card type="primary" >
              <Chart type="bar" data={bar} />
            </Card>
        </div>
</div>;