import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LineChart from "./LineChart";

type Props = {
  selectedApi: string
  apiMetrics: any;
};

const ApiMetrics: React.FC<Props> = ({ selectedApi, apiMetrics }: Props) => {
  const [message, setMessage] = useState('fetching data...');

  // If data not found, set message
  if (Array.isArray(apiMetrics) && typeof apiMetrics[0] === 'string') {
    setMessage('data not found')
  }

  // Make chart for each metric for the selected API
  const makeCharts = (selectedApiMetrics: any) => {
    if (!selectedApiMetrics) return;
    // Declare array to store the LineChart elements
    const lineChartElements = [];
    // Loop over each metric 
    for (let metric in selectedApiMetrics) {
      const timeValArr = [];
      const currMetricsObj = selectedApiMetrics[metric];
      // Loop over data points: value and timestamp
      for (let i in currMetricsObj.values) {
        const subElement: any = {
          y: currMetricsObj.values[i],
          x: new Date(currMetricsObj.timestamps[i]).toLocaleString([], {year: "numeric", month: "numeric", day: "numeric", hour: '2-digit', minute:'2-digit'}),
        };
        timeValArr.push(subElement);
      }
      // Add lineChart element to array
      lineChartElements.push(<LineChart key={metric} rawData={timeValArr} label={metric} />)
    }
    
    return lineChartElements;
  }

  

  let chartElements;
  // Make chart if there is a selected API
  if (selectedApi) {
    console.log("apiMetrics.selectedApi", apiMetrics[selectedApi])
    chartElements = makeCharts(apiMetrics[selectedApi]);
  }


  return (
    <div>
      <div>Apis Metrics</div> 
      <div>
      {chartElements ? chartElements : message}
      </div>
    </div>
  );
};

export default ApiMetrics;