import React from 'react'
import Navigation from '../../components/Navigation'
import  {NavLink} from 'react-router-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";
  import Gauge from './comp/Gauges/Gauge'
function Dashboard() {
    let { path, url } = useRouteMatch();

  return (
    <div>
        
          <div className="gradient__bg">
      <Navigation />
      </div>
      <ul className="nav nav-tabs">
  <li role="presentation"><NavLink to={'/dashboard/gauges'}>Gauge</NavLink></li>
  <li role="presentation"><NavLink to={'/dashboard/gauges'}>Switch</NavLink></li>
  <li role="presentation"><a href={'/dashboard/gauges'}>Graphes</a></li>

</ul>

<Switch>
      
       <Route path={`${path}/gauges`}>
         <Gauge />
       </Route>
     
     </Switch>
    </div>
  )
}

export default Dashboard