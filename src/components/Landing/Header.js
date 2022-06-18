import   './header.css';
import people from '../../assets/people.png';
import ai from '../../assets/ai.png';
import iot1 from '../../assets/iot1.jpg';
import React,{useState} from 'react'
import { getDatabase, push, ref, set, update } from "firebase/database";
import styled from 'styled-components';
import {toast} from 'react-toastify';
import { getStorage, uploadBytes } from "firebase/storage";
import { storage } from "../Firebase/firebase";
import  {NavLink} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const initialState ={
    uid: "",
}

function Header() {
    const [state,setState]= useState(initialState);

    const {uid} = state;
    const handleInputChange = (e)=> {
        const {name, value} = e.target;
        setState({...state, [name]: value})
      }
      const history = useHistory();
     
    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!uid ){
            toast.error("Please Enter User ID")
        }else{

            console.log(state.uid);
            history.push(`portfolio/${state.uid}/home`);
        }
      }
      const myComponentStyle = {
        "background-image": `url(${'https://mdbcdn.b-cdn.net/img/new/slides/003.webp'})`,
        height: "100vh",
        "background-size": "cover",
        "background-repeat": "no-repeat",
       
     }
     
  return (

    <div className="">
 <section className="  " >
 <div className="head">
<div className=" mybg-image">
     <div className="container">
       <div className="row head text-center align-items-center">
       <div className="col-12 ">
          <div className=""><span>AASTU IOT FOR INDUSTRY</span></div>
          <div className=" ">
          <span><p>An iot platform that could be used to control hardware devices monitor sensors from anywhere in the world</p></span>
         </div>
         </div>
      
   
       </div>
     </div>
 </div>
      
</div>
  </section>




    </div>
 
  
   
  )
}

export default Header