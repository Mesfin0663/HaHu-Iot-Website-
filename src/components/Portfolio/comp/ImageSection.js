import React, { useState,  useEffect  }  from 'react'
import styled from 'styled-components';
import resume from '../img/resume.jpg';
import PrimaryButton from './PrimaryButton';
import { getDatabase, ref, onValue,get } from "firebase/database";

function ImageSection(props) {
    const db = getDatabase();
    const [data1, setData]= useState([]);
    const [languages, setLanguages]= useState([]);

    useEffect(()=>{
        const starCountRef = ref(db, '/users/' + props.uid + '/portfolio/personDetail');
        
        onValue(starCountRef, (snapshot) => {
            if(snapshot.val() !== null){
                setData({...snapshot.val()})
                setLanguages({...snapshot.val().languages})
                console.log(data1);
            }else{
                setData({})
            }
        });
      
        return ()=>{
            setData({});
          
        }
      
    },[]);

    return (
        <ImageSectionStyled>
            <div className="left-content">
                <img src={data1.profileImage} alt=""/>
            </div>
            <div className="right-content">
                <h4>I am <span>Lorem Ipsum</span></h4>
                
                <p className="paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, natus quas vero enim 
                    praesentium delectus est id fugiat ab libero adipisci recusandae at maxime veritatis! 
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi, nesciunt.
                    
                </p>
                <div className="about-info">
                    <div className="info-title">
                        <p>Full Name</p>
                        <p>Age</p>
                        <p>Nationality </p>
                        <p>Languages </p>
                        <p>Location</p>
                        <p>Service</p>
                    </div>
       
    
                            <div className="info">
                                <p>: {data1.name}</p>
                                <p>: {props.data.age}</p>
                                <p>: {props.data.nationality} </p>
                          
                                <p>:  {props.data.languages} </p>
                                <p>: { data1.location}</p>
                                <p>: {data1.service}</p>
                            </div>
                   
                    
                </div>
                <PrimaryButton title={'Download Cv'} />
            </div>
        </ImageSectionStyled>
    )
}


const ImageSectionStyled = styled.div`
    margin-top: 5rem;
    display: flex;
    @media screen and (max-width:1000px){
        flex-direction: column;
        .left-content{
            margin-bottom: 2rem;
        }
    }
    .left-content{
        width: 100%;
        img{
            width: 95%;
            object-fit: cover;
        }
    }
    .right-content{
        width: 100%;
        h4{
            font-size: 2rem;
            color: var(--white-color);
            span{
                font-size: 2rem;
            }
        }
        .paragraph{
            padding: 1rem 0;
        }
        .about-info{
            display: flex;
            padding-bottom: 1.4rem;
            .info-title{
                padding-right: 3rem;
                p{
                    font-weight: 600;
                }
            }
            .info-title, .info{
                p{
                    padding: .3rem 0;
                }
            }
        }
    }
`;
export default ImageSection;
