import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { database } from "../../Firebase/firebase";

function TwoDataGraph(props) {
    
    const series = [{
        name: `${props.series1Name}`,
        data: props.series1
    },{
        name: `${props.series2Name}`,
        data: props.series2
    },{
        name: `${props.series3Name}`,
        data: props.series3
    }

];
    const options = {
        chart: {
            height: 600,
            type: "area"
        },
      
        
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        xaxis:{
            type: "category",
            categories: props.time
            

        },
        tooltip:{
            x: {
                format: "dd/MM/yy HH:mm:ss",
            },
        },
    };

  return (  
    <div>
      <br />
      <h2>Graph</h2>
      <br />
      <ReactApexChart options={options} series={series} />
    </div>
  )
}

export default TwoDataGraph
