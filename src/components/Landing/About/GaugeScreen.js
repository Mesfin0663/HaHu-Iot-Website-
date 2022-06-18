import React,{useState} from 'react'
import Gauge from './Gauge'
import './gaugeScreen.css'
import GaugeEdit from './GaugeEdit';
import Backdrop from './Backdrop';
function GaugeScreen() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [gauge1Edit, setGauge1Edit] = useState(false);
    const [gauge1Data, setGauge1Data] = useState([]);
    const [gauge2Edit, setGauge2Edit] = useState(false);
    const [gauge2Data, setGauge2Data] = useState([]);
    console.log(gauge2Data);
    function handleGauge1Edit(){
        setGauge1Edit(true);
    }
    function closeGauge1Edit() {
        setGauge1Edit(false);
      }
    function handleGauge2Edit(){
        setGauge2Edit(true);
    }
    function closeGauge2Edit() {
        setGauge2Edit(false);
      }
    function handleGauge1Click(){
        setModalIsOpen(true);
    }

    function deleteHandler() {
      setModalIsOpen(true);
    }
  
    function closeModalHandler() {
      setModalIsOpen(false);
    }
  return (
    <section>
    <div className="container p-3">
        <div className="row">
            <div className="col-12 col-sm-4 col-lg-4 ">
            <div className="gaugeWrapper" onClick={handleGauge1Edit}>
                <Gauge Value = {56} Title = {gauge1Data.name} color= {gauge1Data.color} unit={gauge1Data.unit} />

                </div>
                {gauge1Edit && (
        <GaugeEdit onCancel={closeGauge1Edit} onConfirm={closeGauge1Edit} gaugeId={1} setGaugeData={setGauge1Data}/>
      )}
      {gauge1Edit && <Backdrop onCancel={closeGauge1Edit} />}
            </div>
            <div className="col-12 col-sm-4 col-lg-4">
                <div className="gaugeWrapper" onClick={handleGauge2Edit}>
                <Gauge Value = {56} Title = {gauge2Data.name} color= {gauge2Data.color} unit={gauge2Data.unit} />

                </div>
                {gauge2Edit && (
        <GaugeEdit onCancel={closeGauge2Edit} onConfirm={closeGauge2Edit} gaugeId={2} setGaugeData={setGauge2Data}/>
      )}
      {gauge2Edit && <Backdrop onCancel={closeGauge2Edit} />}
            </div>
            <div className="col-12 col-sm-4 col-lg-4">
            <Gauge Value = {87} Title = {"Moisture"} color={"blueviolet"}/>

            </div>
        </div>
    </div>
    <div className="container">
        <div className="row">
            <div className="col-12 col-sm-4 col-lg-4">
            <Gauge Value = {45} Title = {"Temperatue"} color={"orange"} />

            </div>
     
            <div className="col-12 col-sm-4 col-lg-4">
            <Gauge Value = {56} Title = {"Humidity"} />

            </div>
            <div className="col-12 col-sm-4 col-lg-4">
            <Gauge Value = {87} Title = {"Moisture"} />

            </div>
        </div>
    </div>

</section>  )
}

export default GaugeScreen