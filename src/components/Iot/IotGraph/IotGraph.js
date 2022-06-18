import React,{useState, useEffect} from 'react'
import Records from './data.json'
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
import ReactApexChart from 'react-apexcharts'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useParams,
  useRouteMatch
} from "react-router-dom";
function IotGraph(props) {
    const [loading, setLoading] = useState(true);
    const nbOfElts = 200;
    const [sensorName, setSensorName] = useState({});

    const [sensorData, setSensorData] = useState({});
    let sensorValue =[]; 
    let sensorTime =[];
    console.log(props.uid);
    useEffect(()=>{
      
        database.ref().child('users').child(`${props.uid}` ).child('Devices').child('Device_1').child('Live').child('Sensors').child('names').child(`${props.sensorName}`).on("value", (snapshot)=>{
          if (snapshot.val() !== null) {
            setSensorName({ ...snapshot.val() });
            } else {
              setSensorName({});
            }
        })
        database.ref().child('users').child(`${props.uid}`).child('Devices').child('Device_1').child('Storage').child(`${props.sensorName}`).limitToLast(nbOfElts).on("value", (snapshot) => {
          if (snapshot.val() !== null) {
            setSensorData({ ...snapshot.val() });
            console.log(sensorData);
            setLoading(false);
          } else {
            setSensorData({});
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
    Object.keys(sensorData).forEach(key =>{

        sensorTime.push( 
            
          new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(sensorData[key].Ts)
          );
        sensorValue.push(sensorData[key].Value.toFixed(2));
      })
    const series = [{
        name: `${props.name}`,
        data: props.value
    },];
    const options = {
        chart: {
            height: 600,
            type: "area"
        },
      
        
        dataLabels: {
            enabled: false,
        },
        // markers: {
        //     size: 3,
        //     colors: `${props.color}`,

        // },
        stroke: {
            curve: "smooth",
            width: 2,
            colors: `${props.color}`,

            show: true,
        
            lineCap: 'butt',
            dashArray: 0, 

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
        <div>
             <br />
        <h2>{props.name} Graph</h2>
        <br />
        <ReactApexChart options={options} series={series} />
        </div>
       
        }
     
    </div>
  )
}

export default IotGraph
