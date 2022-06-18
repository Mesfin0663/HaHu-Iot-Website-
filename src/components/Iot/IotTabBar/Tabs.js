import React from 'react'
import Tab from './IotTabBar/Tab'
function Tabs(props) {
 
  return (
    <div>
         <ul className="nav nav-tabs">
          {props.tabData.map(function(tab){
            return (
              <Tab data={tab} isActive={this.props.activeTab === tab} handleClick={this.props.changeTab.bind(this,tab)} />
            );
          }.bind(this))}      
        </ul>
    </div>
  )
}

export default Tabs