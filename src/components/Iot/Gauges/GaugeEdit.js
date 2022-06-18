import React,{useState} from 'react'
import './gaugeEdit.css'
import { database } from "../../Firebase/firebase";

function GaugeEdit(props) {
    const [gaugeName, setGaugeName]= useState([]);
    const [gaugeColor, setGaugeColor] = useState([]);
    const [gaugeUnit, setGaugeUnit] = useState([]);
    function cancelHandler() {
        props.onCancel();
      }
    
    
      const confirmHandler =(e) =>{
        e.preventDefault();
        let gaugeData ={
            name: gaugeName,
            color: gaugeColor,
            unit: gaugeUnit,
        }
        if(props.gaugeId === 1){
            props.setGaugeData(gaugeData);
            console.log(gaugeData.name)
            database.ref().child("users")
            .child(props.uid)
            .child("Devices")
            .child("Device_1")
            .child("Live")
            .child("Sensors")
            .child("names").update({"Sensor_1": gaugeData.name})

            database.ref().child("users")
            .child(props.uid)
            .child("Devices")
            .child("Device_1")
            .child("Live")
            .child("Sensors")
            .child("GaugeColor").update({"Sensor_1": gaugeData.color})
          }
        if(props.gaugeId === 2){
            props.setGaugeData(gaugeData);
            database.ref().child("users")
            .child(props.uid)
            .child("Devices")
            .child("Device_1")
            .child("Live")
            .child("Sensors")
            .child("names").update({"Sensor_2": gaugeData.name})

            database.ref().child("users")
            .child(props.uid)
            .child("Devices")
            .child("Device_1")
            .child("Live")
            .child("Sensors")
            .child("GaugeColor").update({"Sensor_2": gaugeData.color})
          }
          if(props.gaugeId === 3){
            props.setGaugeData(gaugeData);
            database.ref().child("users")
            .child(props.uid)
            .child("Devices")
            .child("Device_1")
            .child("Live")
            .child("Sensors")
            .child("names").update({"Sensor_3": gaugeData.name})

            database.ref().child("users")
            .child(props.uid)
            .child("Devices")
            .child("Device_1")
            .child("Live")
            .child("Sensors")
            .child("GaugeColor").update({"Sensor_3": gaugeData.color})
          }
          if(props.gaugeId === 4){
            props.setGaugeData(gaugeData);
            database.ref().child("users")
            .child(props.uid)
            .child("Devices")
            .child("Device_1")
            .child("Live")
            .child("Sensors")
            .child("names").update({"Sensor_4": gaugeData.name})

            database.ref().child("users")
            .child(props.uid)
            .child("Devices")
            .child("Device_1")
            .child("Live")
            .child("Sensors")
            .child("GaugeColor").update({"Sensor_4": gaugeData.color})
          }

          if(props.gaugeId === 5){
            props.setGaugeData(gaugeData);
            database.ref().child("users")
            .child(props.uid)
            .child("Devices")
            .child("Device_1")
            .child("Live")
            .child("Sensors")
            .child("names").update({"Sensor_5": gaugeData.name})

            database.ref().child("users")
            .child(props.uid)
            .child("Devices")
            .child("Device_1")
            .child("Live")
            .child("Sensors")
            .child("GaugeColor").update({"Sensor_5": gaugeData.color})
          }
          if(props.gaugeId === 6){
            props.setGaugeData(gaugeData);
            database.ref().child("users")
            .child(props.uid)
            .child("Devices")
            .child("Device_1")
            .child("Live")
            .child("Sensors")
            .child("names").update({"Sensor_6": gaugeData.name})

            database.ref().child("users")
            .child(props.uid)
            .child("Devices")
            .child("Device_1")
            .child("Live")
            .child("Sensors")
            .child("GaugeColor").update({"Sensor_6": gaugeData.color})
          }
        setGaugeName('');
        setGaugeColor('');
        setGaugeUnit('');
       
        props.onConfirm();
    }
  return (
  <div className="container">
          <div className='my-modal card'>
    <p>Edit Gauge {props.gaugeId}</p>
    <form autoComplete='off' className="form-group px-5" onSubmit={confirmHandler}>
                            <input type="text" className="form-control" placeholder='Gauge Name' required 
                            />
                           <br />
                            <input type="text" className="form-control" placeholder='Gauge Color' required
                             onChange={(e)=> setGaugeColor(e.target.value)} value = {gaugeColor}
                            />
                           <br />
                            <input type="text" className="form-control mb-2" placeholder='Gauge Unit' required
                              onChange={(e)=> setGaugeUnit(e.target.value)} value = {gaugeUnit}                           
                            />
                             <button className='my-btn btn--alt' onClick={cancelHandler}>
      Cancel
    </button>
                           <button type= "submit" className="my-btn ">
                              Confirm
                           </button>
                        </form>
   
  </div>
  </div>
    )
}

export default GaugeEdit