import React from 'react'
import Navigation from '../Navigation'
import { AuthUserContext } from '../Session';
import DataFetch from '../Home/DataFetch';
function EditPortfolio() {
  return (
    <div className="">
     <div className="gradient__bg">
      <Navigation />
      </div>
  <AuthUserContext.Consumer>
      
      {authUser => (
<div>

     <DataFetch uid= {authUser.uid}/>
     </div>
      )}
</AuthUserContext.Consumer>
    </div>
  
  
  )
}

export default EditPortfolio