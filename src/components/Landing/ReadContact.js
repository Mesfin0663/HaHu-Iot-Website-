import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import { getDatabase, ref, onValue,get } from "firebase/database";

function ReadContact(props) {
    const db = getDatabase();
    const [data, setData]= useState({});
    const [url, setUrl] = useState("");
   
    useEffect(()=>{
        const starCountRef = ref(db, '/users/' + props.uid + '/portfolio/personDetail');
        
        onValue(starCountRef, (snapshot) => {
            if(snapshot.val() !== null){
                setData({...snapshot.val()})
                
                console.log(url);
            }else{
                setData({})
            }
        });
        return ()=>{
            setData({});
            setUrl({})
        }

    },[]);
  return (
    <ReactContactStyled>
        <div className={{marginTop: "100px"}}>
            <h1>{data.name}</h1>
           
            <h1>{data.sex}</h1>
            <h1>{data.age}</h1>
            <h1>{data.nationality}</h1>
            <h1>{data.name}</h1>
            <h1>{data.service}</h1>
            <h1>{data.languages}</h1>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th styled ={{textAlign: "center"}}>No. </th>
                        <th styled ={{textAlign: "center"}}>Name </th>

                        <th styled ={{textAlign: "center"}}>Email </th>

                        <th styled ={{textAlign: "center"}}>Contact</th>
                        <th styled ={{textAlign: "center"}}>Action </th>

                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map((id, index)=>{
                        return(
                            <tr key={id}>
                                <th scope="row">{index +1}</th>
                                <td>{data[id].name}</td>
                                <td>{data[id].age}</td>
                                <td>{data[id].nationality}</td>

                            </tr>
                        )
                    })

                    }
                </tbody>
            </table>

            <img src={data.profileImage || "http://via.placeholder.com/300"} alt="firebase-image" />
           <p>{url}</p>
        </div>
    </ReactContactStyled>
  )
}

const ReactContactStyled = styled.div`
  
`
export default ReadContact