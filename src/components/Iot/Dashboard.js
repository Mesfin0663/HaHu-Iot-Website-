import IotNav from './iotNav/IotNav'
import React,{useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { compose } from 'recompose';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import Messages from '../Messages';
import * as ROUTES from '../../constants/routes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useParams,
  useRouteMatch
} from "react-router-dom";
import SignInPage from '../SignIn';
import Navigation from '../Navigation';

import GaugeScreen from './Gauges/GaugeScreen';
import IotButtonScreen from './IotButtons/IotButtonScreen';
import IotGraphScreen from './IotGraph/IotGraphScreen';
import DownloadData from './DataDownload/DownloadData'
import IotTabBar from './IotTabBar/IotTabBar';
import DeviceState from './DeviceState/DeviceState'
function Dashboard() {
    let { path, url } = useRouteMatch();
  return (
    <div>
        <AuthUserContext.Consumer>
     
     {authUser => 
      authUser ? (
         
       <div className="">
            <IotNav authUser={authUser}/>
            <div className="container">
        <div className="row text-center justify-items-center">
           <div className="col">
           {/* <p>Welcome {authUser.username? <h1>{authUser.username}!</h1> : ''} to your dashboard</p> */}
           <div className="container">
         <div className="row text-center justify-items-center">
            <div className="col border-2">

                  <p className='btn btn-outline-secondary m-2'>
        <NavLink to={`${path}/gauges`} activeClassName="active-class" exact>Gauges</NavLink>
      </p>
      <p className='btn btn-outline-secondary m-2'>
        <NavLink to={`${path}/buttons`} activeClassName="active-class" exact>Buttons</NavLink>
      </p>
      <p className='btn btn-outline-secondary m-2'>
        <NavLink to={`${path}/graphes`} activeClassName="active-class" exact>Graphs</NavLink>
      </p>
      <p  className='btn btn-outline-secondary m-2'>
        <NavLink to={`${path}/download-data`} activeClassName="active-class" exact>Download Sensor Data</NavLink>
      </p>

            </div>
          </div>
         </div>
           </div>
         </div>

        </div>
    
             <div className="container">
               <div className="row text-center justify-items-center">
               <DeviceState uid = {authUser.uid}/>

               </div>
             </div>
         <Switch>
       
      <Route path={`${path}/gauges`}>
      <GaugeScreen uid= {authUser.uid}  authUser={authUser} />
      </Route>
      <Route path={`${path}/buttons`}>
      <IotButtonScreen uid= {authUser.uid}  authUser={authUser}/>
      </Route>
  
      <Route path={`${path}/graphes`}>
      <IotGraphScreen uid= {authUser.uid} authUser={authUser}/>
      </Route>
      <Route path={`${path}/download-data`}>
      <DownloadData uid= {authUser.uid}  authUser={authUser}/>
      </Route>
      <Route path={`${path}/`}>

      </Route>
    </Switch>
       </div>
       
      
     ):(
        <SignInPage/>
     )}
     
   </AuthUserContext.Consumer>
         
    </div>
  )
}


const condition = authUser => !!authUser;
export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(Dashboard);