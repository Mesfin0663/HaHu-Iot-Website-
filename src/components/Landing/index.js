import React from 'react';
import ReadContact from './ReadContact';
import Navigation from '../Navigation';
import Header from './Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import About from './About/About';

function Landing() {
  let { path, url } = useRouteMatch();

  return (
    <div>
    <div className="gradient__bg">
      <Navigation />
 
      </div>
  

      <Header/>
     
  </div>  )
}

export default Landing