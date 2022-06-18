import React from 'react'
import {Bar} from 'react-chartjs-2'
const BarChart = () => {
  return (
      <div className="">
          <h1>hhhhhhhh</h1>
          <Bar
  
  data={{
    labels: ['Red','Blue', 'Yellow', 'Green','Purple','Orange'],
    datasets: [
      {
        label: '# of votes',
        data:[12,19,3,5,2,3]
      }
    ]
  }}
  width="400"
  height="600"
  options={{
    maintainAspectRation:false
  }}
/>
      </div>
  
  )
}

export default BarChart