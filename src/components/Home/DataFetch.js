import React,{useState} from 'react'
import { getDatabase, push, ref, set, update } from "firebase/database";
import styled from 'styled-components';
import {toast} from 'react-toastify';
import { getStorage, uploadBytes } from "firebase/storage";
import { storage } from "../Firebase/firebase";
import { v4 as uuidv4 } from "uuid";
const initialState ={
    name: "",
    age:"",
    sex:"",
    languages:"",
    location:"",
    nationality: "",
    service:"",
  }

  const db = getDatabase();
function DataFetch(props) {
    const [state,setState]= useState(initialState);
  const [data, setData] =  useState({});
  const {name, age, sex,languages,location,nationality,service} = state;
  const handleInputChange = (e)=> {
    const {name, value} = e.target;
    setState({...state, [name]: value})
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    if(!name || !age || !sex){
        toast.error("Please fill all fields")
    }else{
      update(ref(db,'/users/' + props.uid + '/portfolio/personDetail'),state).then(() => {
        toast.success("Contact Added")

    })
        .catch((error) => {
            toast.error(error);

        });;
    }
  }
  
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uuid4 = uuidv4();
    const uploadTask = storage.ref(`images/${ props.uid}/${uuid4}${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
         storage
          .ref("images")
          .child(props.uid)
          .child(uuid4+image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
            set(ref(db,'/users/' + props.uid + '/portfolio/personDetail/profileImage' ),url).then(() => {
                console.log("success");
        
            })
                .catch((error) => {
                   console.log(error)
                });
          });
      }
    );
  };

  return (
    <DataFetchStyled>
    
        <div style={{marginTop: "100px"}}>
      <form style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "400px",
        alignContent: "center",
      
      }}>
        <label htmlFor="name">Name</label>
        <input 
        type="text"
          id= "name"
          name= "name"
          placeholder='Your Name...'
          value= {name}
          onChange = {handleInputChange}
        />
        <label htmlFor="name">age</label>
        <input 
        type="number"
          id= "age"
          name= "age"
          placeholder='Your Age...'
          value= {age}
          onChange = {handleInputChange}
        />
        <label htmlFor="name">Sex</label>
        <input 
        type="text"
          id= "sex"
          name= "sex"
          placeholder='Your Sex...'
          value= {sex}
          onChange = {handleInputChange}
        />
        <label htmlFor="name">Nationality</label>
        <input 
        type="text"
          id= "nationality"
          name= "nationality"
          placeholder='Your nationality...'
          value= {nationality}
          onChange = {handleInputChange}
        />
           <label htmlFor="name">Languages</label>
        <input 
        type="text"
          id= "languages"
          name= "languages"
          placeholder='List Your Languages separted by comma...'
          value= {languages}
          onChange = {handleInputChange}
        />
           <label htmlFor="name">Location</label>
        <input 
        type="text"
          id= "location"
          name= "location"
          placeholder='Put Your Location...'
          value= {location}
          onChange = {handleInputChange}
        />
          <label htmlFor="name">Service</label>
        <input 
        type="text"
          id= "service"
          name= "service"
          placeholder='Put Your service...'
          value= {service}
          onChange = {handleInputChange}
        />
        <input type="submit" onClick={handleSubmit} value ="save"/>
      </form>
      <div>
      <progress value={progress} max="100" />
      <br />
      <br />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {url}
      <br />
      <img src={url || "http://via.placeholder.com/300"} alt="firebase-image" />
    </div>
  );
    </div>
    </DataFetchStyled>
    
  )
}
const DataFetchStyled= styled.div`
input[type='text'],
input[type= 'email'],
input[type= 'number'],
select{
    width: 100%;
    padding: 6px 10px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
input[type='submit']{
    width: 100%;
    background-color: #4caf50;
    color: white;
    padding: 8px 10px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  
}
input[type='submit']:hover{
    background-color: #45a049;
}


`
export default DataFetch