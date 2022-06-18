import React from 'react'
import Chart from 'react-apexcharts'

function Graph(props) {
    console.log(props.value)
  return (
    <div className="container">
    <div className="row text-center">
      <div className="col-12 sizingP">
        <h1>data plot</h1>
      <Chart
   type="line"
   width='100%'
   height={600}
  
   options={{
      chart: {
          toolbar: {
            show: true
          },
        },
    
        markers: {
          size: 3,
      },
      
        stroke: {
          curve: "smooth",
          show: true,
      
          lineCap: 'butt',
          colors: '#ff7300',
          width: 2,
          dashArray: 0, 
        } ,
       
        title: {
          text: props.title,
          align: 'left'
        },  
        xaxis: {
          name: "time",
          categories: props.time,
          title: {
              text: props.xtitle
            },
            labels: {
              format: 'dd/MM',
              datetimeUTC: true,
              style: {
                  fontSize: '10px',
                  fontWeight: 600,
              },
              datetimeFormatter: {
                year: 'yyyy',
                month: 'MMM \'yy',
                day: 'dd MMM',
                hour: 'HH:mm'
              }
              
         },
         axisBorder: {
          show: true,
          color: '#78909C',
          height: 1,
          width: '100%',
          offsetX: 0,
          offsetY: 0
      },
      axisTicks: {
          show: true,
          borderType: 'solid',
          color: '#78909C',
          height: 6,
          offsetX: 0,
          offsetY: 0
      },
        },
        yaxis: {
          title: {
            text: props.ytitle
          }
        }
    
    }}
    grid={{
      padding: {
        left: 0,
        right: 0
      }
    }} 
   series={ [{
       name: 'Temperature',
        data:  props.value
      
      }]}
  
   
   >


   </Chart>
      </div>
    </div>
  </div>  )
}

export default Graph