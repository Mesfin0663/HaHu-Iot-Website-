import React, { useState, useEffect } from 'react'
import IotButton from './IotButton'
import { database } from "../../Firebase/firebase";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function IotButtonScreen(props) {
    const [button1, setButton1] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sensorNames, setSensorNames]= useState([])
    const [deviceState, setDeviceState] = useState(false);

    const [button2, setButton2] = useState(false);
    const [button3, setButton3] = useState(false);
    const [buttenState, setButtonState] = useState({});
    useEffect(() => {
        database.ref().child('users').child(props.uid ).child('Devices').child('Device_1').child('Live').child('State').on("value", (snapshot)=>{
            if(snapshot.val()!==null){
              setDeviceState({...snapshot.val()});
          
  
            }else{
              setDeviceState({});
            }
          })
        database.ref().child('users').child(props.uid ).child('Devices').child('Device_1').child('Live').child('Buttons').child('names').on("value", (snapshot)=>{
            if (snapshot.val() !== null) {
              setSensorNames({ ...snapshot.val() });
              } else {
                setSensorNames({});
              }
          })
        database.ref().child('users').child(props.uid).child('Devices').child('Device_1').child('Live').child('Buttons').on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setButton1({ ...snapshot.val().Button_1 });
                setButtonState({ ...snapshot.val() });

                console.log(snapshot.val().Button_1);
                setLoading(false);
            } else {
                setButton1({});
            }
        })
    }, []);
    console.log(button1);
    function button1Click() {
        database.ref().child("users")
            .child(props.uid)
            .child("Devices")
            .child("Device_1")
            .child("Live")
            .child("Buttons")
            .update({ "Button_1": !buttenState.Button_1 })
    }
    function button2Click() {
        database.ref().child("users")
            .child(props.uid)
            .child("Devices")
            .child("Device_1")
            .child("Live")
            .child("Buttons")
            .update({ "Button_2": !buttenState.Button_2 })

    }
    function button3Click() {
        database.ref().child("users")
            .child(props.uid)
            .child("Devices")
            .child("Device_1")
            .child("Live")
            .child("Buttons")
            .update({ "Button_3": !buttenState.Button_3 })
    }
    function button4Click() {
        database.ref().child("users")
            .child(props.uid)
            .child("Devices")
            .child("Device_1")
            .child("Live")
            .child("Buttons")
            .update({ "Button_4": !buttenState.Button_4 })
    }
    function button5Click() {
        database.ref().child("users")
            .child(props.uid)
            .child("Devices")
            .child("Device_1")
            .child("Live")
            .child("Buttons")
            .update({ "Button_5": !buttenState.Button_5 })
    }
    function button6Click() {
        database.ref().child("users")
            .child(props.uid)
            .child("Devices")
            .child("Device_1")
            .child("Live")
            .child("Buttons")
            .update({ "Button_6": !buttenState.Button_6 })
    }
    return (
        <div>
            {
                loading ?
                    <div>
                        <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open

                    >

                        <CircularProgress color="inherit" />

                    </Backdrop>
                    </div>
                    :
                    <div>
                        {/* <div className='container home-content'>
         <h1>Welcome: {props.authUser.name}</h1>
                 <p>Your ID Is: {props.authUser.uid}</p>
                 <p>Your Email Is: {props.authUser.email}</p>
       </div> */}
       <section>
                        <div className="container  text-center justify-items-center">
                            
                    
                            <div className="row text-center justify-items-center">

                                <div className="col-sm-6 col-lg-4">
                                    <p onClick={button1Click}>
                                        <IotButton state={buttenState.Button_1} title={sensorNames.Button_1} />
                                    </p>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <p onClick={button2Click}>
                                        <IotButton state={buttenState.Button_2} title={sensorNames.Button_2} />
                                    </p>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <p onClick={button3Click}>
                                        <IotButton state={buttenState.Button_3} title={sensorNames.Button_3} />
                                    </p>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <p onClick={button4Click}>
                                        <IotButton state={buttenState.Button_4} title={sensorNames.Button_4} />
                                    </p>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <p onClick={button5Click}>
                                        <IotButton state={buttenState.Button_5} title={sensorNames.Button_5} />
                                    </p>
                                </div>
                                <div className="col-sm-6 col-lg-4">
                                    <p onClick={button6Click}>
                                        <IotButton state={buttenState.Button_6} title={sensorNames.Button_6}/>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </section>
                    </div>
                   
            }


        </div>
    )
}

export default IotButtonScreen