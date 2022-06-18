import React,{useState, useEffect} from 'react'

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { database } from "../../Firebase/firebase";

function DeviceState(props) {
    const [loading, setLoading] = useState(true);

    const [deviceState, setDeviceState] = useState({});
    const [deviceStatus, setDeviceStatus] = useState(true);


    useEffect(()=>{
        database.ref().child('users').child(props.uid ).child('Devices').child('Device_1').child('Live').child('State').on("value", (snapshot)=>{
          if(snapshot.val()!==null){
            setDeviceState({...snapshot.val()});
          
            var iotTime = new Date(snapshot.val().Ts)
            var iotYear = iotTime.getFullYear()
            var iotMonth = iotTime.getMonth() +1
            var iotDate = iotTime.getDate()
            var iotSecond= iotTime.getSeconds()
            var iotMinute = iotTime.getMinutes();
            var iotHour = iotTime.getHours();
           var currentTime = new Date();
              var currentYear  = currentTime.getFullYear()
              var currentMonth = currentTime.getMonth() +1
              var currentDate = currentTime.getDate()
           var currentSecond= currentTime.getSeconds()
           var currentMinute = currentTime.getMinutes();
           var currentHour = currentTime.getHours();
           
           var yearDif = Math.abs(currentYear-iotYear)
           var monthDif = Math.abs(currentMonth- iotMonth)
           var dateDif = Math.abs(currentDate-iotDate)
           var hourDif = Math.abs(currentHour- iotHour)
           var minuteDif = Math.abs(currentMinute- iotMinute)
     
         if(yearDif !== 0 || monthDif !== 0 || dateDif !== 0 || hourDif !== 0 || minuteDif >= 3){
          setDeviceStatus(false)
         }else{
          setDeviceStatus(true)
         }
         setLoading(false);
          }else{
            setDeviceState({});
          }
        })
      
    },[]);
  return (
    <div>
            {
         loading?   
         <div>
         <Backdrop
         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
         open
   
     >
   
         <CircularProgress color="inherit" />
   
     </Backdrop>
     </div>         :
         <div>
         <h1> Cennection </h1>
         <h1 style={{color: deviceStatus? 'green': 'red'}}>{
         deviceStatus? 1: 0 
         
         }</h1>
         
         <h1 style={{color: deviceStatus? 'green': 'red'}}>{deviceStatus? 'Online': 'offline'}</h1>

         <h4>{ new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(deviceState.Ts)}</h4>
          
</div>
     }
    </div>
  )
}

export default DeviceState