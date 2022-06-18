import React,{useEffect} from 'react'
import './gauge.css'

function Gauge(props) {
    let newTemp;
    newTemp = props.Value/200;
    console.log(newTemp);
    console.log(props.color);
    document.documentElement.style.setProperty('--temp', `${newTemp}turn`);


  return (
    <div>
       <div className="container ">
     <div className="row text-center">

       <div className="col gauge-container ">
   

       <div className="gauge ">
         
       <h2 className=''>{props.Title}</h2>
    <div className="gauge__body">
      <div className="my_gauge__fill" style={{background: `${props.color}`}} ></div>
      <div className="gauge__cover">{props.Value}{props.unit}</div>
    </div>
  </div>
       </div>
     </div>


   </div>
    </div>
  )
}

export default Gauge
