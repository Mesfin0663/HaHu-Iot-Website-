import React,{useEffect} from 'react'
import './gauge.css'

function Gauge(props) {
    let newTemp;
    newTemp = (props.Value*180)/100;
    console.log(newTemp);
    console.log(props.color);
    document.documentElement.style.setProperty('--temp', `${newTemp}turn`);
    const myComponentStyle = {
      position: "absolute",
      top: "100%",
      left: 0,
      width: "inherit",
      height: "100%",
      background: `${props.color}`,
      transform: `rotate(${newTemp}deg)`,
     "transform-origin": "center top",
    
      transition: `transform ${0.2}s ease-out`,
   }

  return (
    <div>
       <div className="container ">
     <div className="row text-center">

       <div className="col gauge-container ">
   

       <div className="gauge ">
         
       <p className=''>{props.Title}</p>
    <div className="gauge__body">
      <div className="" style={myComponentStyle} ></div>
      <div className="gauge__cover">{props.Value.toFixed(2)}{props.unit}</div>
    </div>
  </div>
       </div>
     </div>


   </div>
    </div>
  )
}

export default Gauge
