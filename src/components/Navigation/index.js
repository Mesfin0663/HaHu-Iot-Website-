import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import { withFirebase } from '../Firebase';

//icons that are used for drop down for mobile and tablet view
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { PersonRounded } from '@mui/icons-material';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import './navbar.css'
function AdminButton({authUser}) {
  try {
    return   (
      authUser.roles[ROLES.ADMIN]  ?  <p>
      <NavLink to={ROUTES.ADMINTWO} activeClassName="active-class" exact>Admin</NavLink>
    </p> : ''
    )
  } catch (error) {
     return ''
  }
}
function Navigation() {
  const [toggleMenu, setToggleMenu] = useState(false);  //boolean used for detecting a click of humberger menu
  const [navbar, setNavbar] = useState(false);  // boolean used for detecting scroll at the top to make the mavbar fixed 

 
  const makeNavbarFixed = () => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }

  }
  window.addEventListener('scroll', makeNavbarFixed);
  return (

    <AuthUserContext.Consumer>

      {authUser =>
        authUser ? (
          <div className={navbar ? 'rap  active ' : 'rap'}>
            <div className="gpt3__navbar " >
              <div className="gpt3__navbar-links ">
                <div className='myLogo'><p>HaHu-IOT </p></div>
              </div>
              {/* Navigetion bar menu items for authenticated users on desktop */}
              <AuthNaviagationOnDestop authUser={authUser} />

              <div className="gpt3__navbar-menu">
                {toggleMenu
                  ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
                  : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
                {toggleMenu && (
                  // Navigation bar menu items for authenticated users on Mobile view
                <AuthNaviagationOnMobile authUser={authUser} />
                )}
              </div>
            </div>

          </div>


        ) : (
          <div className={navbar ? 'rap active' : 'rap'}>
            <div className="gpt3__navbar">
              <div className="gpt3__navbar-links ">
                <div className='myLogo'><p>AASTU IOT </p></div>
              </div>
              {/* Navbar menu items for non authenticated users on  desktop */}

              <NoneAuthNavOnDesktop />
              <div className="gpt3__navbar-menu">
                {toggleMenu
                  ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
                  : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
                {toggleMenu && (
                 <NoneAuthNavOnMobile/>
                )}
              </div>
            </div>
          </div>
        )
      }
    </AuthUserContext.Consumer>
  )
};

// navbar menu items for authenticated users on desktop view
const AuthNaviagationOnDestop = ({ authUser }) => (

  <div className="gpt3__navbar-links_container">
    <p>
      <NavLink to={ROUTES.LANDING} activeClassName="active-class" exact>Home</NavLink>
    </p>

 
 
    
  
      {/* <p>
      <NavLink to={ROUTES.SERVICES} activeClassName="active-class" exact>Services</NavLink>
    </p>
    <p>
      <NavLink to={ROUTES.COMPANY} activeClassName="active-class" exact>Company</NavLink>
    </p>
  
    <p>
      <NavLink to={ROUTES.BLOG} activeClassName="active-class" exact>Blog</NavLink>
    </p>
    <p>
      <NavLink to={ROUTES.ABOUT} activeClassName="active-class" exact>About</NavLink>
    </p>
    <p>
      <NavLink to={ROUTES.HOME} activeClassName="active-class" exact>Profile</NavLink>
    </p> */}
    <p>
      <NavLink to={ROUTES.DASHBOARD} activeClassName="active-class" exact>Dashboard</NavLink>
    </p>
    <AdminButton authUser={authUser}/>
{/*     
    {
      !!authUser.roles[ROLES.ADMIN] && (
        <p>
          <NavLink to={ROUTES.ADMINTWO} activeClassName="active-class" exact>Admin</NavLink>
        </p>
      )

    } */}


       {/* <div class="nav-item dropdown">
      <p>
        <NavLink to={''} activeClassName="active-class" exact><PersonRounded/> {authUser.name}</NavLink>

      </p>
      <div class="dropdown-content">
        <NavLink to={''} activeClassName="active-class" exact>Generic</NavLink>
        <NavLink  activeClassName="active-class" exact>Sign Out</NavLink>
      </div>
    </div> */}
      <p>
        <NavLink to={ROUTES.DASHBOARD} activeClassName="active-class" exact> <PersonRounded/> {authUser.username}</NavLink>
      </p>
      <p>
        
      </p>
      <div className="gpt3__navbar-sign">
        <p>
          <SignOutButton />
        </p>
      </div>
    
    <div className="gpt3__navbar-menu_container-links-sign">
      <SignOutButton />
  
    </div>
  </div>




);

const AuthNaviagationOnMobile = ({ authUser })=>{
   return(
    <div className="gpt3__navbar-menu_container scale-up-center">
    <div className="gpt3__navbar-menu_container-links">
  
      {/* Navigation bar menu items  for authenticated users on mobile and tablet view */}
      <p>
        <NavLink to={ROUTES.LANDING} activeClassName="active-class" exact>Home</NavLink>
      </p>
     
      {/* <div class="nav-item dropdown">
        <p>
          <p activeClassName="active-class" exact>Pages</p>
  
        </p>
        <div class="dropdown-content">
          <NavLink to={ROUTES.ACCOUNT} activeClassName="active-class" exact>Generic</NavLink>
          <NavLink to={ROUTES.ACCOUNT} activeClassName="active-class" exact>Element</NavLink>
        </div>
      </div> */}
          <AdminButton authUser={authUser}/>

      
      {/* {!!authUser.roles[ROLES.ADMIN] && (
        <p>
          <NavLink to={ROUTES.ADMINTWO} activeClassName="active-class" exact>Admin</NavLink>
        </p>
      )} */}
        {/* <p>
      <NavLink to={ROUTES.SERVICES} activeClassName="active-class" exact>Services</NavLink>
    </p>
    <p>
      <NavLink to={ROUTES.COMPANY} activeClassName="active-class" exact>Company</NavLink>
    </p>
    <p>
      <NavLink to={ROUTES.ABOUT} activeClassName="active-class" exact>About</NavLink>
    </p>
    <p>
      <NavLink to={ROUTES.BLOG} activeClassName="active-class" exact>Blog</NavLink>
    </p>
    <p>
        <NavLink to={ROUTES.HOME} activeClassName="active-class" exact>Profile</NavLink>
      </p> */}
      <p>
        <NavLink to={ROUTES.ACCOUNT} activeClassName="active-class" exact>Account</NavLink>
      </p>
      <p>
        <NavLink to={ROUTES.DASHBOARD} activeClassName="active-class" exact>Dashboard</NavLink>
      </p>
      <p>
        <NavLink to={ROUTES.DASHBOARD} activeClassName="active-class" exact><PersonRounded/>{authUser.username}</NavLink>
      </p>
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
   )
}
//Navbar menu items for none authenticated users on desktop view
const NoneAuthNavOnDesktop = () => (
  <div className="gpt3__navbar-links_container">


    <p>
      <NavLink to={ROUTES.LANDING} activeClassName="active-class" exact>Home</NavLink>
    </p>
    {/* <p>
      <NavLink to={ROUTES.SERVICES} activeClassName="active-class" exact>Services</NavLink>
    </p>
    <p>
      <NavLink to={ROUTES.COMPANY} activeClassName="active-class" exact>Company</NavLink>
    </p>
    <p>
      <NavLink to={ROUTES.ABOUT} activeClassName="active-class" exact>About</NavLink>
    </p>
    <p>
      <NavLink to={ROUTES.BLOG} activeClassName="active-class" exact>Blog</NavLink>
    </p> */}

    <p>
      {/* <NavLink to={ROUTES.PORTFOLIO} activeClassName="active-class" exact>Portfolio</NavLink> */}

    </p>
    <div className="gpt3__navbar-sign">
      <button>
        <NavLink to={ROUTES.SIGN_IN} >Sign In</NavLink>
      </button>
    </div>


  </div>



);
const NoneAuthNavOnMobile =()=>{
  return(
    <div className="gpt3__navbar-menu_container scale-up-center">
  <div className="gpt3__navbar-menu_container-links">
    {/* Navbar menu items for none authenticated usern on mobile and tablet view */}
    <p>
      <NavLink to={ROUTES.LANDING} activeClassName="active-class" exact>Home</NavLink>
    </p>
    {/* <p>
      <NavLink to={ROUTES.SERVICES} activeClassName="active-class" exact>Services</NavLink>
    </p>
    <p>
      <NavLink to={ROUTES.COMPANY} activeClassName="active-class" exact>Company</NavLink>
    </p>
    <p>
      <NavLink to={ROUTES.ABOUT} activeClassName="active-class" exact>About</NavLink>
    </p>
    <p>
      <NavLink to={ROUTES.BLOG} activeClassName="active-class" exact>Blog</NavLink>
    </p> */}
   
    <div className="gpt3__navbar-sign">
      <p>
        <button>
          <NavLink to={ROUTES.SIGN_IN} >Sign In</NavLink>
        </button>
      </p>
    </div>
  </div>
  <div className="gpt3__navbar-menu_container-links-sign">
    <button>
      <NavLink to={ROUTES.SIGN_IN} >Sign In</NavLink>
    </button>
  </div>
</div>
  )
}
export default Navigation;
