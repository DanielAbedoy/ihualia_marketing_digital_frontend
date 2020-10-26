import React from 'react'
import { Line}from '@reactchartjs/react-chart.js'

const ChartComponent = ({labels, label, dataSet, BackColor, BorderColor}) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: dataSet,
        fill: true,
        backgroundColor: BackColor || '#21f077aa',
        borderColor: BorderColor || 'rgba(43,180,226,1)',
      },
    ],
  }
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
   
  return(
      <Line data={data} options={options} />
  );
}

export default ChartComponent;