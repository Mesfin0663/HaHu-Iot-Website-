import React from 'react'
import { Tabs, Tab, AppBar } from '@material-ui/core';
import GaugeScreen from '../Gauges/GaugeScreen';
import IotButtonScreen from '../IotButtons/IotButtonScreen';
const IotTabBar = props => {

   const tabNameToIndex ={
       0: "gauges",
       1: "buttons"
   }
   const indexToTabName ={
       gauges: 0,
       buttons: 1
   }
   const [selectedTab, setSelectedTab] = React.useState();
   const handleChange = (event, newValue)=>{
       setSelectedTab(newValue);
   };
  return (
    <>
        <AppBar position="static">
          <Tabs value={selectedTab} onChange={handleChange}>
              <Tab label="Gauges"/>
              <Tab label="Buttons"/>
              <Tab label="Gauges"/>
              <Tab label="Buttons"/>
          </Tabs>
        </AppBar>
        {selectedTab===0 && <GaugeScreen/>}
        {selectedTab===1 && <IotButtonScreen/>}

    </>
  )
}

export default IotTabBar