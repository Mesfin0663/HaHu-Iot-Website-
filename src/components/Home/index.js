import React,{useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { compose } from 'recompose';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import Messages from '../Messages';
import DataFetch from './DataFetch';
import * as ROUTES from '../../constants/routes';
import HomeNav from './homeNav/HomeNav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import EditPortfolio from '../EditPortfolio/EditPortfolio';
import Iot from '../Iot/Iot';
import './home.css'


function HomePage () {
  let { path, url } = useRouteMatch();
  return (
<div className="">
<div className="gradient__bg">
      <HomeNav />
      </div>
<AuthUserContext.Consumer>
     
     {authUser => (
       <div className="container ">
         <div className="row">
           <div className="col">
<div className='home-content'>
         <h1>Account: {authUser.username}</h1>
                 <p>Account: {authUser.uid}</p>
                 <Link to={`${url}/add`}>Add Contact</Link>

       <Messages/>
     
     
       <Switch>
      
       <Route path={`${path}/iot`}>
         <Iot uid={authUser.uid}/>
       </Route>
     
     </Switch>
       </div>
           </div>
         </div>
 
       </div>
       
      
     )}
     
   </AuthUserContext.Consumer>
</div>
  )
};

const condition = authUser => !!authUser;
export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
