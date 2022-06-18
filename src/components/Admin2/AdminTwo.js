import React from 'react';
import { Switch, Route, useRouteMatch  } from 'react-router-dom';
import { compose } from 'recompose';
import './AdminTwo.css'
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
import { AuthUserContext } from '../Session';

function AdminTwo() {
    let { path, url } = useRouteMatch();

  return (
    <AuthUserContext.Consumer>
       {authUser =>
        authUser ? (
            
    <div>
         {
         authUser.roles[ROLES.ADMIN] ? (
     <>
     <div className="gradient__bg">
     <Navigation />
     </div>
     <ToolBar/>

     <div className="myContainer">
         <Switch>
         <Route path={`${path}/simplelist`}>
      
      <UserList/>

     </Route>
         <Route path={`${path}/userlist`}>
      
        <ListUsers/>

       </Route>
      <Route path={`${path}/users/:id`}>
        <UserData/>

       </Route>
       <Route path={'/adminpage/'}>
      
      <div className='centering' style={{ height: 400, width: '100%' }} >Welcome To the Admin page</div>
  
       </Route>
      
    </Switch>
      </div>
     </>
    ):(
        <div className='col centering'  style={{ height: 600, width: '100%' }} > 
        <h1>
            Sorry You are not Admin
        </h1>
        <div>
            You dont have permission to access this site
        </div>
        </div>
        )}
  
     
  
    
    </div>
        ):(
            <div className='col centering'  style={{ height: 600, width: '100%' }} > 
            <h1>
               Sorry you have to sign in
            </h1>
            <div>
                And if you are an admin we will let you in
            </div>
            </div>        )
    }
    </AuthUserContext.Consumer>

  )
}

export default AdminTwo
