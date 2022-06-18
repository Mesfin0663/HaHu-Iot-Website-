import React,{ useState } from 'react';
import  {NavLink, useRouteMatch} from 'react-router-dom';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { PersonRounded } from '@mui/icons-material';

import SignOutButton from '../../SignOut';
import './IotNav.css'
function HomeNav(props) {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [navbar, setNavbar]= useState(false);

  
  const changeBackground = ()=>{
    if( window.scrollY >= 60){
      setNavbar(true);
    }else{
      setNavbar(false);
    }
   
  }
  window.addEventListener('scroll', changeBackground);
  let { path, url } = useRouteMatch();

  return (
    <div className={navbar? 'iotrap  active ' : 'iotrap'}>
    <div className="gpt3__navbar " >
              <div className="gpt3__navbar-links ">
              <div className='myLogo'><p>HaHu-IOT </p></div>
            
             
            
              
              </div>
              <div className="gpt3__navbar-links_container">
           
      {/* <p>
        <NavLink to={'/dashboard/gauges'} activeClassName="active-class" exact>Gauges</NavLink>
      </p>
   
      <p>
        <NavLink to={'/dashboard/buttons'} activeClassName="active-class" exact>Buttons</NavLink>
      </p>
      <p>
        <NavLink to={'/dashboard/graphes'} activeClassName="active-class" exact>Graphes</NavLink>
      </p>
      <p>
        <NavLink to={'/dashboard/download-data'} activeClassName="active-class" exact>Download-Data</NavLink>
      </p> */}
   <p>
        <NavLink to={'/'} activeClassName="active-class" exact>Home</NavLink>
      </p>
      <p>
        <NavLink to={'/dashboard'} activeClassName="active-class" exact>Dashboard</NavLink>
      </p>
  <p>
        <NavLink to={'/'} activeClassName="active-class" exact><PersonRounded/>{props.authUser.username}</NavLink>
      </p>
     
              {/* <div class="nav-item dropdown">
        <p>
        <p  activeClassName="active-class" exact>Pages</p>
  
        </p>
                      <div class="dropdown-content">
                      <NavLink to={''} activeClassName="active-class" exact>Generic</NavLink>
                       <NavLink to={''} activeClassName="active-class" exact>Element</NavLink>
                      </div>
                  </div> */}

<p>
{/* <NavLink to={ROUTES.PORTFOLIO} activeClassName="active-class" exact>Portfolio</NavLink> */}

</p>
<div className="gpt3__navbar-sign">
<p>
        <SignOutButton />
      </p>
</div>


</div>
              <div className="gpt3__navbar-menu">
             
              {toggleMenu
            ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
            : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
          {toggleMenu && (
          <div className="gpt3__navbar-menu_container scale-up-center">
            <div className="gpt3__navbar-menu_container-links">
           
      {/* <p>
        <NavLink to={'/dashboard/gauges'} activeClassName="active-class" exact>Gauges</NavLink>
      </p>
   
      <p>
        <NavLink to={'/dashboard/buttons'} activeClassName="active-class" exact>Buttons</NavLink>
      </p>
      <p>
        <NavLink to={'/dashboard/graphes'} activeClassName="active-class" exact>Graphes</NavLink>
      </p>
      <p>
        <NavLink to={'/dashboard/download-data'} activeClassName="active-class" exact>Download-Data</NavLink>
      </p>
      <p>
        <NavLink to={'/'} activeClassName="active-class" exact>Landing</NavLink>
      </p>
      */}
       <p>
        <NavLink to={'/'} activeClassName="active-class" exact>Home</NavLink>
      </p>
      <p>
        <NavLink to={'/dashboard'} activeClassName="active-class" exact>Dashboard</NavLink>
      </p>
        <p>
        <NavLink to={'/'} activeClassName="active-class" exact><PersonRounded/>{props.authUser.username}</NavLink>
      </p>
     
      {/* <div class="nav-item dropdown">
        <p>
        <p  activeClassName="active-class" exact>Pages</p>
  
        </p>
                      <div class="dropdown-content">
                      <NavLink to={''} activeClassName="active-class" exact>Generic</NavLink>
                      <NavLink to={''} activeClassName="active-class" exact>Element</NavLink>
                      </div>
                  </div> */}
     
      <div className="gpt3__navbar-sign">
      <p>
        <SignOutButton />
      </p>
      </div>
            </div>
            <div className="gpt3__navbar-menu_container-links-sign">
            <SignOutButton />
  
            </div>
          </div>
          )}
              </div>
            </div>
           
            </div>
  )
}

export default HomeNav