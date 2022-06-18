import React,{useState, useEffect,PureComponent} from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { getDatabase, ref, onValue,get } from "firebase/database";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Chart from 'react-apexcharts'
import { database } from "../Firebase/firebase";
import { withFirebase } from '../Firebase';
import zoomDAta from './zoomData';
import 'bootstrap/dist/css/bootstrap.min.css';
import './iot.css';
import Draggable from 'react-draggable';
import JsonToCsv from './JsonToCsv';

function Iot(props) {
    let timestamps = [];
    let values = [];
    const [temp, setTemp]= useState({});
    const [time, setTime]= useState({});
    const db = getDatabase();
    const [data, setData]= useState({});
    const [url, setUrl] = useState("");
    let newTemp;
    const [data1, setData1]= useState({});
    let demoData=[];
    useEffect(()=>{
        const starCountRef = ref(db, '/users/' + props.uid + '/Devices/Device_1/Live/Sensors/Sensor_1');
        const nbOfElts = 40;
      database.ref().child('users').child(props.uid ).child('Devices').child('Device_1').child('Storage').child('Sensor_1').limitToLast(nbOfElts).on('value', ts_measures => {
  
       
         ts_measures.forEach(ts_measure => {
        
            //console.log(ts_measure.val().timestamp, ts_measure.val().value);
            timestamps.push(moment( new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(ts_measure.val().Ts)));
            values.push(ts_measure.val().Value);
            demoData.push({name: moment(ts_measure.val().Ts).format('YYYY-MM-DD HH:mm:ss'), value: ts_measure.val().Value});
           console.log(values);
        
        });
        setData1(demoData);
        setTime(timestamps)
        setTemp(values)
    });
  
        onValue(starCountRef, (snapshot) => {
            if(snapshot.val() !== null){
                setData({...snapshot.val()})
                console.log(...snapshot.val());
          

                console.log(...snapshot.val());
               

            }else{
                setData({})
            }
        });
        return ()=>{
            setData({});
            setUrl({})
        }
        
    },[]);
 
 
   console.log('dddddddddddd')
   console.log(temp);
    newTemp = data.Value;
    let tempTime;
    if(newTemp <0 || newTemp> 100){

    }else{
        newTemp = newTemp/200;
        console.log(newTemp);
        document.documentElement.style.setProperty('--temp', `${newTemp}turn`);
        
        const timestamp = Date.now(); // This would be the timestamp you want to format
        tempTime = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(data.Ts)
       console.log('time time tiem')
        console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp));
     
    }
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const trackPos = (pos) => {
      setPosition({ x: pos.x, y: pos.y });
   };
  
return (
    <div>
      <JsonToCsv/>
{/* <div className="box1">
<Draggable handle="#handle" onDrag={(e, pos) => trackPos(pos)} >
   <div className="box">
   <div className="container">
     <div className="row">
       <div className="col">
       <div className="gauge">
    <div className="gauge__body">
      <div className="gauge__fill" ></div>
      <div className="gauge__cover">{data.Value}%</div>
    </div>
  </div>
       </div>
     </div>
     <h1>{data.Ts}</h1>

     <h1>{tempTime}</h1>

   </div>
      <span id="handle">Drag here</span>
      <div>Here's my position...</div>
       <div>
            x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}
       </div>

   </div>
  
</Draggable>

</div> */}


{/* <Draggable handle="#handle">
   <div className="box">
   <div className="container">
     <div className="row">
       <div className="col">
       <div className="gauge">
    <div className="gauge__body">
      <div className="gauge__fill" ></div>
      <div className="gauge__cover">{data.Value}%</div>
    </div>
  </div>
       </div>
     </div>
     <h1>{data.Ts}</h1>

     <h1>{tempTime}</h1>

   </div>
      <span id="handle">Drag here</span>
   </div>
</Draggable>

 */}
  

    
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
            text: 'Temperature Data',
            align: 'left'
          },  
          xaxis: {
            categories: time,
            title: {
                text: 'Time the data recorded'
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
              text: 'Temperature value'
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
          data:  temp
        
        }]}
    
     
     >


     </Chart>
        </div>
      </div>
    </div>
     <h1>dddddddddddd</h1>
    </div>
  )
}

export default Iot
