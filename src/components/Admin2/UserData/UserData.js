import React,{useState, useEffect} from 'react'
import { Switch, Route, useRouteMatch,useParams, NavLink  } from 'react-router-dom';
import IotGraphScreen from '../../Iot/IotGraph/IotGraphScreen'
import GaugeScreen from '../../Iot/Gauges/GaugeScreen';
import IotButtonScreen from '../../Iot/IotButtons/IotButtonScreen';
import DownloadData from '../../Iot/DataDownload/DownloadData'
import DeviceState from '../../Iot/DeviceState/DeviceState'
function UserData() {
  let { path, url } = useRouteMatch();
   console.log(path)
   let { id } = useParams();
   const [thisUserId, setThisUserId] =  useState({});
   useEffect(()=>{
      
    setThisUserId(id);


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
 function  onEmailSendClik (){

 }


  return (
    <div style={{ height: 600, width: '100%' }}>UserData {id}
   
   <div className="container">
        <div className="row text-center justify-items-center">
           <div className="col">
           {/* <p>Welcome {authUser.username? <h1>{authUser.username}!</h1> : ''} to your dashboard</p> */}
           <div className="container">
         <div className="row text-center justify-items-center">
            <div className="col border-2">
                  <p className='btn btn-outline-secondary m-2'>
        <NavLink to={`/adminpage/users/${id}/gauges`} activeClassName="active-class" exact>Gauges</NavLink>
      </p>
      <p className='btn btn-outline-secondary m-2'>
        <NavLink to={`/adminpage/users/${id}/buttons`} activeClassName="active-class" exact>Buttons</NavLink>
      </p>
      <p className='btn btn-outline-secondary m-2'>
        <NavLink to={`/adminpage/users/${id}/graphes`} activeClassName="active-class" exact>Graphs</NavLink>
      </p>
      <p  className='btn btn-outline-secondary m-2'>
        <NavLink to={`/adminpage/users/${id}/download-data`} activeClassName="active-class" exact>Download Sensor Data</NavLink>
      </p>
     
            </div>
          </div>
         </div>
           </div>
         </div>
        </div>
        
        <div className="container">
               <div className="row text-center justify-items-center">
               <DeviceState uid = {id}/>

               </div>
             </div>
        <Switch>
       
      <Route path={`${path}/gauges`}>
      <GaugeScreen uid={id} />
      </Route>
      <Route path={`${path}/buttons`}>
      <IotButtonScreen uid={id} />
      </Route>
      <Route path={`${path}/graphes`}>
      <IotGraphScreen uid={thisUserId}  />
      </Route>  
    
      <Route path={`${path}/download-data`}>
      <DownloadData uid={id} />
      </Route>
     
    </Switch>
    </div>
  )
}

export default UserData