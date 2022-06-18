import React from 'react';
import { Switch, Route, useRouteMatch  } from 'react-router-dom';
import { compose } from 'recompose';
import './Admin.css'
import { withAuthorization, withEmailVerification } from '../Session';
import { UserList, UserItem } from '../Users';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import Navigation from '../Navigation';
import ToolBar from './ToolBar/ToolBar';
import Sidebar from './Sidebar/Sidebar';
import ListUsers from './UserList/ListUsers';
import IotGraphScreen from '../Iot/IotGraph/IotGraphScreen'
import UserData from './UserData/UserData'
function AdminPage () {
  let { path, url } = useRouteMatch();

  return (
    <div>

     <div className="gradient__bg">
      <Navigation />
      </div>
      <ToolBar/>
      <div className="myContainer">
         <Switch>
       
         <Route path={`${path}/userlist`}>
      <Sidebar/>
        <ListUsers/>

       </Route>
      <Route path={`${path}/users/:id`}>
      <Sidebar/>
        <UserData/>

       </Route>
      
    </Switch>
      </div>
  
  </div>
  )
};

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminPage);
