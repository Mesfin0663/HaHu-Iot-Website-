import React from 'react'
import {
    BrowserRouter as Router,
  
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";
  import DataFetch from '../Home/DataFetch';
  import ReadContact from '../Landing/ReadContact';
  import { useState } from "react";
import { useEffect } from "react";
import Sidebar from "./comp/Sidebar";
import styled from 'styled-components';
import HomePage from "./pag/HomePage";
import AboutPage from './pag/AboutPage';
import ResumePage from './pag/ResumePage';
import PortfoliosPage from './pag/PortfoliosPage';
import BlogsPage from './pag/BlogsPage';
import ContactPage from './pag/ContactPage';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import MenuIcon from '@material-ui/icons/Menu';
import {  Switch as Switching } from "react-router";
import { IconButton } from "@material-ui/core";
import GlobalStyle from './st/GlobalStyle';
import Navigation from './comp/Navigation';
import Switch from '@material-ui/core/Switch'
import { getDatabase, ref, onValue,get } from "firebase/database";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
function UserPortfolio() {
 
    const db = getDatabase();
    const [data, setData]= useState([]);

    const [url, setUrl] = useState("");
    let { uid } = useParams();
      
    let { path } = useRouteMatch();
    const [theme, setTheme] = useState('dark-theme');
    const [checked, setChecked] = useState(false);
    const [navToggle, setNavToggle] = useState(false);
     const [post, setPost] = useState(false)
     const [userFound, setUserFound] = useState(false);
     const [dataFetchCompleted, setDataFetchCompleted] = useState(false);

    useEffect(()=>{
        const starCountRef = ref(db, '/users/' + uid + '/portfolio/personDetail');
        
        onValue(starCountRef, (snapshot) => {
            if(snapshot.val() !== null){
                setData({...snapshot.val()})          
                console.log(data);
                setPost(true);
            }else{
                setData({})
            }
        });
      
        return ()=>{
            setData({});
            setUrl({})
        }
      
    },[]);
  
    useEffect(()=>{
      document.documentElement.className = theme;
    }, [theme]);
  
    const themeToggler = () =>{
      if(theme === 'light-theme'){
        setTheme('dark-theme');
        setChecked(false)
      }else{
        setTheme('light-theme');
        setChecked(true)
      }
    }
   
  return (
    <div>
   
    {
    post?  <div className="App">

<SidebarStyled >
   
      <div className={`${navToggle ? 'hide' : 'not-hide'}`}>
      <Navigation uid={uid} data ={data} />

      </div>


    </SidebarStyled>

    <div className="theme">
      <div className="light-dark-mode">
          <div className="left-content">
            <Brightness4Icon />
          </div>
          <div className="right-content">
            <Switch
              value=""
              checked={checked}
              inputProps={{ 'aria-label': '' }}
              size="medium"
              onClick={themeToggler}
              
            />
          </div>
        </div>
    </div>

    <div className="ham-burger-menu">
      <IconButton onClick={() => {setNavToggle(!navToggle); console.log({navToggle}+'clicked');}}>
          <MenuIcon />
      </IconButton>
    </div>

    <MainContentStyled>
      <div className="lines">
        <div className="line-1"></div>
        <div className="line-2"></div>
        <div className="line-3"></div>
        <div className="line-4"></div>
      </div>

      <Switching>
        <Route path={`${path}/home`}xact>
          <HomePage data= {data} />
        </Route>
        <Route path={`${path}/about`} exact>
          <AboutPage uid={uid}  data= {data}/>
        </Route>
        <Route path={`${path}/resume`} exact>
          <ResumePage />
        </Route>
        <Route path={`${path}/portfolios`}  exact>
          <PortfoliosPage />
        </Route>
        <Route path={`${path}/blogs`} exact>
           <BlogsPage />
        </Route>
        <Route path={`${path}/contact`}  exact>
          <ContactPage />
        </Route>
      </Switching>

    </MainContentStyled>
</div>: <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
       
      >
        
        <CircularProgress color="inherit" />
       
      </Backdrop>

    }
    
  </div>
  )
}
const SidebarStyled = styled.div`
  

    .not-hide{
      width: 16.3rem;
    position: fixed;
    height: 100vh;
    background-color: var(--sidebar-dark-color);
    overflow: hidden;
    transition: all .4s ease-in-out;
        transform: translateX(0%);
        z-index: 20;
        @media screen and (max-width:320px){
          width: 10.3rem;
               
  }
    }
    .hide{
      width: 13.3rem;
    position: fixed;
    height: 100vh;
    background-color: var(--sidebar-dark-color);
    overflow: hidden;
    transition: all .4s ease-in-out;
        transform: translateX(-100%);
        z-index: 20;
        @media screen and (min-width:1200px){
       
          transform: translateX(0%);
        z-index: 20;
  }
    }
    
`;
const MainContentStyled = styled.main`
  position: relative;
  margin-left: 16.3rem;
  min-height: 100vh;
  @media screen and (max-width:1200px){
    margin-left: 0;
  }
  .lines{
    position: absolute;
    min-height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    opacity: 0.4;
    z-index: -1;
    .line-1, .line-2, .line-3, .line-4{
      width: 1px;
      min-height: 100vh;
      background-color: var(--border-color);
    }
  }
`;
export default UserPortfolio