import React,{useState, useEffect} from 'react'
import Records from './data.json'
import IotGraph from './IotGraph';
import { database } from "../../Firebase/firebase";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import Chart from 'react-apexcharts'
import { stream } from "react-streams"
import { interval } from "rxjs"
import { map } from "rxjs/operators"
import FromStream from '../FromStream ';
import Kefir from 'kefir';
import TwoDataGraph from './TwoDataGraph'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useParams,
  useRouteMatch
} from "react-router-dom";
function IotGraphScreen(props) {
  let { path, url } = useRouteMatch();

  const date = new Date().toString();
  const nbOfElts = 30;
  const count$ = interval(250).pipe(map(count => ({ count })))
  const dateStream$ = interval(250).pipe(map(dateStream => new Date().toString()))

const DataStream = stream(date);
const Counter = stream(count$)


  const [loading, setLoading] = useState(true);

    let timestamps = [];
    let values = [];
    let values1 = [];
    
    let Sensor1Value = [];
    let Sensor1Time = [];
    const [sensorNames, setSensorNames] = useState({});
    const [mutipleSensorData, setMultipleSensorData] = useState({});
    let sensor1Value =[]; 
    const [sensor2Data, setSensor2Data] = useState({});
    let sensor2Value =[]; 
    let sensor2Time =[];
    const [sensor3Data, setSensor3Data] = useState({});
    let sensor3Value =[]; 
    let sensor3Time =[];
    const [sensor4Data, setSensor4Data] = useState({});
    let sensor4Value =[]; 
    let sensor4Time =[];
    const [sensor5Data, setSensor5Data] = useState({});
    let sensor5Value =[]; 
    let sensor5Time =[];
    const [sensor6Data, setSensor6Data] = useState({});
    let sensor6Value =[]; 
    let sensor6Time =[];
    const [temp, setTemp]= useState({});
    const [time, setTime]= useState({});

    const [temData, setTempData]= useState({});
    // Object.keys(Humidity).forEach(key =>{

    //     values1.push(Humidity[key].Value);
    // })



    useEffect(()=>{
      
      database.ref().child('users').child(props.uid ).child('Devices').child('Device_1').child('Live').child('Sensors').child('names').on("value", (snapshot)=>{
        if (snapshot.val() !== null) {
          setSensorNames({ ...snapshot.val() });
          } else {
            setSensorNames({});
          }
      })
      database.ref().child('users').child(props.uid).child('Devices').child('Device_1').child('Storage').child('MultipleData').limitToLast(nbOfElts).on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setMultipleSensorData({ ...snapshot.val() });
         
        } else {
          setMultipleSensorData({});
        }
    })
      database.ref().child('users').child(props.uid).child('Devices').child('Device_1').child('Storage').child('Sensor_1').limitToLast(nbOfElts).on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setTempData({ ...snapshot.val() });
      
        } else {
          setTempData({});
        }
    })
    database.ref().child('users').child(props.uid).child('Devices').child('Device_1').child('Storage').child('Sensor_2').limitToLast(nbOfElts).once("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setSensor2Data({ ...snapshot.val() });
        setLoading(false);
      } else {
        setSensor2Data({});
      }
  })
  database.ref().child('users').child(props.uid).child('Devices').child('Device_1').child('Storage').child('Sensor_3').limitToLast(nbOfElts).once("value", (snapshot) => {
    if (snapshot.val() !== null) {
      setSensor3Data({ ...snapshot.val() });
     
    } else {
      setSensor3Data({});
    }
})
database.ref().child('users').child(props.uid).child('Devices').child('Device_1').child('Storage').child('Sensor_4').limitToLast(nbOfElts).once("value", (snapshot) => {
  if (snapshot.val() !== null) {
    setSensor4Data({ ...snapshot.val() });
    setLoading(false);
  } else {
    setSensor4Data({});
  }
})
database.ref().child('users').child(props.uid).child('Devices').child('Device_1').child('Storage').child('Sensor_5').limitToLast(nbOfElts).once("value", (snapshot) => {
  if (snapshot.val() !== null) {
    setSensor5Data({ ...snapshot.val() });
 
  } else {
    setSensor5Data({});
  }
})
database.ref().child('users').child(props.uid).child('Devices').child('Device_1').child('Storage').child('Sensor_6').limitToLast(nbOfElts).once("value", (snapshot) => {
  if (snapshot.val() !== null) {
    setSensor6Data({ ...snapshot.val() });
    setLoading(false);
  } else {
    setSensor6Data({});
  }
})
  //     const interval = setInterval(() => {
  //   //     database.ref().child('users').child(props.authUser.uid ).child('Devices').child('Device_1').child('Storage').child('Sensor_1').limitToLast(nbOfElts).on('value', ts_measures => {

     
  //   //       ts_measures.forEach(ts_measure => {
         
  //   //          //console.log(ts_measure.val().timestamp, ts_measure.val().value);
  //   //          timestamps.push(ts_measure.val().Ts);
  //   //          values.push(ts_measure.val().Value);
         
  //   //      });
  //   //    setTemp(values);
  //   //    setTime(timestamps);
  //   //    setLoading(false);
     
  //   //  });
  //   database.ref().child('users').child(props.authUser.uid).child('Devices').child('Device_1').child('Storage').child('Sensor_1').limitToLast(nbOfElts).on("value", (snapshot) => {
  //     if (snapshot.val() !== null) {
  //       setTempData({ ...snapshot.val() });
         
  //     } else {
  //       setTempData({});
  //     }
  // })
  //       console.log('This will run every second!');
  //     }, 1000);
  //     return () => clearInterval(interval);
    

     
      // return ()=>{
      //     setData({});
      //     setUrl({})
      // }
      
  },[]);

  Object.keys(mutipleSensorData).forEach(key =>{

    timestamps.push( 
        
        new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(mutipleSensorData[key].Ts)
    );
    sensor1Value.push(mutipleSensorData[key].Sensor_1.toFixed(2));
    sensor2Value.push(mutipleSensorData[key].Sensor_2.toFixed(2));
    sensor3Value.push(mutipleSensorData[key].Sensor_3.toFixed(2));
    sensor4Value.push(mutipleSensorData[key].Sensor_4.toFixed(2));
    sensor5Value.push(mutipleSensorData[key].Sensor_5.toFixed(2));
    sensor6Value.push(mutipleSensorData[key].Sensor_6.toFixed(2));

})
//   Object.keys(temData).forEach(key =>{

//     timestamps.push( 
        
//         new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(temData[key].Ts)
//     );
//     values.push(temData[key].Value.toFixed(2));
// })

  const plotdata =()=>{

         
    
  }
console.log('iot graph screen')

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
          
          <div className="container">
                 
          <Switch>
       
       <Route path={`${path}/sensor1`}>
       <IotGraph time ={timestamps} value ={sensor1Value} sensorName='Sensor_1'  uid ={props.uid} color= '#ff000d' name= {sensorNames.Sensor_1}/>
       </Route>
       <Route path={`${path}/sensor2`}>
       <IotGraph time ={timestamps} value ={sensor2Value}  sensorName='Sensor_2'  uid ={props.uid}  color= '#2f00ff' name= {sensorNames.Sensor_2}/>
       </Route>
       <Route path={`${path}/sensor3`}>
       <IotGraph time ={timestamps} value ={sensor3Value}  sensorName='Sensor_3'  uid ={props.uid}  color= '#00ff0d' name= {sensorNames.Sensor_3}/>
       </Route>
       <Route path={`${path}/sensor4`}>
       <IotGraph time ={timestamps} value ={sensor4Value}  sensorName='Sensor_4'  uid ={props.uid}  color= '#000000' name= {sensorNames.Sensor_4}/>
       </Route>
       <Route path={`${path}/sensor5`}>
       <IotGraph time ={timestamps} value ={sensor5Value}  sensorName='Sensor_2'  uid ={props.uid}  color= '#fbff09' name= {sensorNames.Sensor_5}/>
       </Route>

       <Route path={`${path}/sensor6`}>
       <IotGraph time ={timestamps} value ={sensor6Value}  sensorName='Sensor_2'  uid ={props.uid}  color= '#ff09ad' name= {sensorNames.Sensor_6}/>
       </Route>
       <Route path={`${path}/all`}>
         
       <IotGraph time ={timestamps} value ={sensor1Value} sensorName='Sensor_1'  uid ={props.uid} color= '#ff000d' name= {sensorNames.Sensor_1}/>
       <IotGraph time ={timestamps} value ={sensor2Value}  sensorName='Sensor_2'  uid ={props.uid}  color= '#2f00ff' name= {sensorNames.Sensor_2}/>
       <IotGraph time ={timestamps} value ={sensor3Value}  sensorName='Sensor_3'  uid ={props.uid}  color= '#00ff0d' name= {sensorNames.Sensor_3}/>
       <IotGraph time ={timestamps} value ={sensor4Value}  sensorName='Sensor_4'  uid ={props.uid}  color= '#000000' name= {sensorNames.Sensor_4}/>
       <IotGraph time ={timestamps} value ={sensor5Value}  sensorName='Sensor_5'  uid ={props.uid}  color= '#fbff09' name= {sensorNames.Sensor_5}/>
       <IotGraph time ={timestamps} value ={sensor6Value}  sensorName='Sensor_6'  uid ={props.uid}  color= '#ff09ad' name= {sensorNames.Sensor_6}/>

       </Route>

       <Route path={`${path}/first-three-in-one`}>
       <div className="box">
          <TwoDataGraph time ={timestamps} series1 ={sensor1Value} series1Name={sensorNames.Sensor_1} series2={sensor2Value} series2Name={sensorNames.Sensor_2}  series3={sensor3Value} series3Name={sensorNames.Sensor_3}  uid ={props.uid}/>
  
          </div>
       </Route>
       <Route path={`${path}/last-three-in-one`}>
       <div className="box">
       <TwoDataGraph time ={timestamps} series1 ={sensor4Value} series1Name={sensorNames.Sensor_4} series2={sensor5Value} series2Name={sensorNames.Sensor_5}  series3={sensor6Value} series3Name={sensorNames.Sensor_6}  uid ={props.uid}/>
  
          </div>
       </Route>
       <Route path={`${path}/`}>
        <div className="container">
         <div className="row text-center justify-items-center">
         <h1>Select Graph</h1> 

            <div className="col">
                  <p className='btn btn-outline-secondary m-2'>
        <NavLink to={`${path}/sensor1`} activeClassName="active-class" exact>{sensorNames.Sensor_1} Graph</NavLink>
      </p>
      <p className='btn btn-outline-secondary m-2'>
        <NavLink to={`${path}/sensor2`} activeClassName="active-class" exact>{sensorNames.Sensor_2} Graph</NavLink>
      </p>
      <p className='btn btn-outline-secondary m-2'>
        <NavLink to={`${path}/sensor3`} activeClassName="active-class" exact>{sensorNames.Sensor_3} Graph</NavLink>
      </p>
      <p  className='btn btn-outline-secondary m-2'>
        <NavLink to={`${path}/sensor4`} activeClassName="active-class" exact>{sensorNames.Sensor_4} Graph</NavLink>
      </p>
      <p  className='btn btn-outline-secondary m-2'>
        <NavLink to={`${path}/sensor5`} activeClassName="active-class" exact>{sensorNames.Sensor_5} Graph</NavLink>
      </p>
      <p className='btn btn-outline-secondary m-2'>
        <NavLink to={`${path}/sensor6`} activeClassName="active-class" exact>{sensorNames.Sensor_6} Graph</NavLink>
      </p>
      <p className='btn btn-outline-secondary m-2'>
        <NavLink to={`${path}/all`} activeClassName="active-class" exact>All Sensors Graph</NavLink>
      </p>
      <p className='btn btn-outline-secondary m-2'>
        <NavLink to={`${path}/first-three-in-one`} activeClassName="active-class" exact>The first three sensors in one Graph</NavLink>
      </p>
      <p className='btn btn-outline-secondary m-2'>
        <NavLink to={`${path}/last-three-in-one`} activeClassName="active-class" exact>The last three sensors in one Graph</NavLink>
      </p>
            </div>
          </div>
         </div>
       </Route>
     
     </Switch>
        </div>
        }
   
    </div>
  )
}

export default IotGraphScreen