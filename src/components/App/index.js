import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import AdminTwo from '../Admin2/AdminTwo'
import About from '../Landing/About/About';
import Blogs from '../Landing/Blogs/Blogs';
import Company from '../Landing/Company/Company';
import Services from '../Landing/Services/Services';
import EditPortfolio from '../EditPortfolio/EditPortfolio';
import EditPortFolio_a from '../EditPortFolio_a/EditPortFolio_a';
import Iot from '../Iot/Iot';
import Dashboard from '../Iot/Dashboard';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import './App.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Portfolio from '../Portfolio/Portfolio';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
const App = () => (
  <AuthUserContext.Consumer>
     
     {authUser => (
        <Router>
 
      
        <div>
          <ToastContainer position='top-center'/>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
 
        <Route exact path={ROUTES.ABOUT} component={About} />
        <Route exact path={ROUTES.BLOG} component={Blogs} />
        <Route exact path={ROUTES.SERVICES} component={Services} />
        <Route exact path={ROUTES.COMPANY} component={Company} />
        <Route exact path={ROUTES.ADMIN} component={AdminTwo} />
 
 
       <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
       <Route path={ROUTES.SIGN_IN} component={SignInPage} />
       <Route path={ROUTES.PORTFOLIO} component={Portfolio} />
       <Route path={ROUTES.EDIT_PORTFOLIO} component={EditPortfolio} />
       <Route path={ROUTES.DASHBOARD} component={Dashboard} />
       <Route path={ROUTES.ADMINTWO} component={AdminTwo} />
 
       <Route
         path={ROUTES.PASSWORD_FORGET}
         component={PasswordForgetPage}
       />
       {/* <Route path={ROUTES.HOME} component={HomePage} /> */}
 
       <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        </div>
    
  
   </Router>
       
      
     )}
     
   </AuthUserContext.Consumer>

);

export default withAuthentication(App);
