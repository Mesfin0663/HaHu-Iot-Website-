import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";
  import UserPortfolio from './UserPortfolio';
  import GlobalStyle from './st/GlobalStyle';

function Portfolio() {
    let { path, url } = useRouteMatch();

  return (
    <div>
 <GlobalStyle/> 
 <h3>Please select a topic.</h3>

<Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:uid`}>
          <UserPortfolio />
        </Route>
      </Switch>
    </div>
  )
}

export default Portfolio