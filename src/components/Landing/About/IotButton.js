import React from 'react'
import './iotButton.css';
function IotButton(props) {
  
  return (
      
    <div className='wrapper text-center'>
      <h3>{props.title}</h3>
       <div className="iotButton ">
       <div className ={props.state? 'toggle-btn   active ' : 'toggle-btn'}  id ="unact">
         
         <div className = "inner-circle"> </div>
     </div>
       </div>
   
    </div>
  )
}

export default IotButton