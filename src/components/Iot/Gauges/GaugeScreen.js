import React,{useState, useEffect} from 'react'
import Gauge from './Gauge'
import './gaugeScreen.css'
import GaugeEdit from './GaugeEdit';
import MyBackdrop from './Backdrop';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { database } from "../../Firebase/firebase";

function GaugeScreen(props) {
  const [loading, setLoading] = useState(true);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [deviceState, setDeviceState] = useState(false);

    const [gauge1Edit, setGauge1Edit] = useState(false);
    const [gauge1Data, setGauge1Data] = useState([]);
    const [gauge2Edit, setGauge2Edit] = useState(false);
    const [gauge2Data, setGauge2Data] = useState([]);

    const [gauge3Edit, setGauge3Edit] = useState(false);
    const [gauge3Data, setGauge3Data] = useState([]);

    const [gauge4Edit, setGauge4Edit] = useState(false);
    const [gauge4Data, setGauge4Data] = useState([]);

    const [gauge5Edit, setGauge5Edit] = useState(false);
    const [gauge5Data, setGauge5Data] = useState([]);


    const [gauge6Edit, setGauge6Edit] = useState(false);
    const [gauge6Data, setGauge6Data] = useState([]);

    const [iotData1, setIotData1]= useState([])
    const [iotData2, setIotData2]= useState([])
    const [iotData3, setIotData3]= useState([])
    const [iotData4, setIotData4]= useState([])
    const [iotData5, setIotData5]= useState([])
    const [iotData6, setIotData6]= useState([])
    const [multipleData, setMultipleData]= useState([])
    const [sensorNames, setSensorNames]= useState([])
    const [gaugeColors, setGaugeColors]= useState([])

    function handleGauge1Edit(){
  
    
        setGauge1Edit(true);
      
    }
    function closeGauge1Edit() {
        setGauge1Edit(false);
      }


    function handleGauge2Edit(){
        setGauge2Edit(true);
    }
    function closeGauge2Edit() {
        setGauge2Edit(false);
      }
      
      
    function handleGauge3Edit(){
      setGauge3Edit(true);
  }
  function closeGauge3Edit() {
      setGauge3Edit(false);
    }


    function handleGauge4Edit(){
      setGauge4Edit(true);
  }
  function closeGauge4Edit() {
      setGauge4Edit(false);
    }
    
    function handleGauge5Edit(){
      setGauge5Edit(true);
  }
  function closeGauge5Edit() {
      setGauge5Edit(false);
    }

    
    function handleGauge6Edit(){
      setGauge6Edit(true);
  }
  function closeGauge6Edit() {
      setGauge6Edit(false);
    }
      useEffect(()=>{
        database.ref().child('users').child(props.uid ).child('Devices').child('Device_1').child('Live').child('State').on("value", (snapshot)=>{
          if(snapshot.val()!==null){
            setDeviceState({...snapshot.val()});
        

          }else{
            setDeviceState({});
          }
        })
        database.ref().child('users').child(props.uid ).child('Devices').child('Device_1').child('Live').child('Sensors').child('MultipleData').on("value", (snapshot)=>{
          if(snapshot.val()!==null){

            
            setMultipleData({...snapshot.val()});
         

          }else{
            setMultipleData({});
          }
        })
        database.ref().child('users').child(props.uid ).child('Devices').child('Device_1').child('Live').child('Sensors').on("value", (snapshot)=>{
          if(snapshot.val()!==null){
            setIotData1({...snapshot.val().Sensor_1});
            setIotData2({...snapshot.val().Sensor_2});
            setIotData3({...snapshot.val().Sensor_3});

            setIotData4({...snapshot.val().Sensor_4});
            setIotData5({...snapshot.val().Sensor_5});
            setIotData6({...snapshot.val().Sensor_6});


            setSensorNames({...snapshot.val().names});
            setGaugeColors({...snapshot.val().GaugeColor})
            setLoading(false);

          }else{
            setIotData1({});
          }
        })
    },[iotData1, iotData2, props.uid]);
    console.log("multipleData-----------------");
    console.log(multipleData);
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
  </div>
       :
       <section>
       <div className="container p-3">
           <div className="row text-center">
        
               <div className="col-sm-12 col-md-6 col-lg-4 ">
               <div className="gaugeWrapper" onClick={handleGauge1Edit}>
                   <Gauge Value = {multipleData.Sensor_1} Title = {sensorNames.Sensor_1} color= {gaugeColors.Sensor_1} unit={gauge1Data.unit} />
   
                   </div>
                   {gauge1Edit && (
           <GaugeEdit onCancel={closeGauge1Edit} onConfirm={closeGauge1Edit} gaugeId={1} setGaugeData={setGauge1Data} uid={props.uid}/>
         )}
         {gauge1Edit && <MyBackdrop onCancel={closeGauge1Edit} />}
               </div>
               <div className="col-sm-12 col-md-6 col-lg-4">
                   <div className="gaugeWrapper" onClick={handleGauge2Edit}>
                   <Gauge Value = {multipleData.Sensor_2} Title = {sensorNames.Sensor_2} color= {gaugeColors.Sensor_2} unit={gauge2Data.unit} />
   
                   </div>
                   {gauge2Edit && (
           <GaugeEdit onCancel={closeGauge2Edit} onConfirm={closeGauge2Edit} gaugeId={2} setGaugeData={setGauge2Data} uid={props.uid}/>
         )}
         {gauge2Edit && <MyBackdrop onCancel={closeGauge2Edit} />}
               </div>
             
   
               <div className="col-sm-12 col-md-6 col-lg-4 ">
               <div className="gaugeWrapper" onClick={handleGauge3Edit}>
                   <Gauge Value = {multipleData.Sensor_3} Title = {sensorNames.Sensor_3} color= {gaugeColors.Sensor_3} unit={gauge3Data.unit} />
   
                   </div>
                   {gauge3Edit && (
           <GaugeEdit onCancel={closeGauge3Edit} onConfirm={closeGauge3Edit} gaugeId={3} setGaugeData={setGauge3Data} uid={props.uid}/>
         )}
         {gauge3Edit && <MyBackdrop onCancel={closeGauge3Edit} />}
               </div>
   
   
   
               <div className="col-sm-12 col-md-6 col-lg-4 ">
               <div className="gaugeWrapper" onClick={handleGauge4Edit}>
                   <Gauge Value = {multipleData.Sensor_4} Title = {sensorNames.Sensor_4} color= {gaugeColors.Sensor_4} unit={gauge4Data.unit} />
   
                   </div>
                   {gauge4Edit && (
           <GaugeEdit onCancel={closeGauge4Edit} onConfirm={closeGauge4Edit} gaugeId={4} setGaugeData={setGauge4Data} uid={props.uid}/>
         )}
         {gauge4Edit && <MyBackdrop onCancel={closeGauge4Edit} />}
               </div>
   
   
        
           
               <div className="col-sm-12 col-md-6 col-lg-4 ">
               <div className="gaugeWrapper" onClick={handleGauge5Edit}>
                   <Gauge Value = {multipleData.Sensor_5} Title = {sensorNames.Sensor_5} color= {gaugeColors.Sensor_5} unit={gauge5Data.unit} />
   
                   </div>
                   {gauge5Edit && (
           <GaugeEdit onCancel={closeGauge5Edit} onConfirm={closeGauge5Edit} gaugeId={5} setGaugeData={setGauge5Data} uid={props.uid}/>
         )}
         {gauge5Edit && <MyBackdrop onCancel={closeGauge5Edit} />}
               </div>
   
   
   
              
               <div className="col-sm-12 col-md-6 col-lg-4 ">
               <div className="gaugeWrapper" onClick={handleGauge6Edit}>
                   <Gauge Value = {multipleData.Sensor_6} Title = {sensorNames.Sensor_6} color= {gaugeColors.Sensor_6} unit={gauge6Data.unit} />
   
                   </div>
                   {gauge6Edit && (
           <GaugeEdit onCancel={closeGauge6Edit} onConfirm={closeGauge6Edit} gaugeId={6} setGaugeData={setGauge6Data} uid={props.uid}/>
         )}
         {gauge6Edit && <MyBackdrop onCancel={closeGauge6Edit} />}
               </div>
   
           </div>
       </div>
       <div className="container">
           <div className="row">
              
           </div>
       </div>
     <div>
       {/* <h1>jjjjjjjjjjjjjjjjjjjjj</h1> */}
     </div>
   </section>  
    }
  </div>

)
}

export default GaugeScreen