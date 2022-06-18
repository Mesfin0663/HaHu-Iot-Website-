import React,{useState} from 'react'
import './gaugeEdit.css'
function GaugeEdit(props) {
    const [gaugeName, setGaugeName]= useState([]);
    const [gaugeColor, setGaugeColor] = useState([]);
    const [gaugeUnit, setGaugeUnit] = useState([]);
    function cancelHandler() {
        props.onCancel();
      }
    
    
      const confirmHandler =(e) =>{
        e.preventDefault();
        let gaugeData ={
            name: gaugeName,
            color: gaugeColor,
            unit: gaugeUnit,
        }
        if(props.gaugeId === 1){
            props.setGaugeData(gaugeData);

          }
        if(props.gaugeId === 2){
            props.setGaugeData(gaugeData);

          }
        setGaugeName('');
        setGaugeColor('');
        setGaugeUnit('');
       
        props.onConfirm();
    }
  return (
  <div className="container">
          <div className='my-modal'>
    <p>Edit Gauge {props.gaugeId}</p>
    <form autoComplete='off' className="form-group px-5" onSubmit={confirmHandler}>
                            <input type="text" className="form-control" placeholder='Gauge Name' required 
                             onChange={(e)=> setGaugeName(e.target.value)} value = {gaugeName}
                            />
                           <br />
                            <input type="text" className="form-control" placeholder='Gauge Color' required
                             onChange={(e)=> setGaugeColor(e.target.value)} value = {gaugeColor}
                            />
                           <br />
                            <input type="text" className="form-control mb-2" placeholder='Gauge Unit' required
                              onChange={(e)=> setGaugeUnit(e.target.value)} value = {gaugeUnit}                           
                            />
                             <button className='my-btn btn--alt' onClick={cancelHandler}>
      Cancel
    </button>
                           <button type= "submit" className="my-btn ">
                              Confirm
                           </button>
                        </form>
   
  </div>
  </div>
    )
}

export default GaugeEdit