import React from 'react'
import { Switch, Route, useRouteMatch,useParams  } from 'react-router-dom';
import IotGraphScreen from '../../Iot/IotGraph/IotGraphScreen'

function UserData() {
  let { path, url } = useRouteMatch();
   console.log(path)
   let { id } = useParams();
   console.log(id)
  return (
    <div style={{ height: 600, width: '100%' }}>UserData {id}
    <IotGraphScreen uid= {id} />  
    
    </div>
  )
}

export default UserData