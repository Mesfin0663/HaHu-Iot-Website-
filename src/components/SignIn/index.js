import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import {toast} from 'react-toastify';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Navigation from '../Navigation';
import './signin.css'
import Header from '../Landing/Header';
import { database } from "../Firebase/firebase";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const SignInPage = () => (
  <div>
     <div className="gradient__bg">
  
      <Navigation />
    
      </div>
      <div className="top1  mybg-image ">
      <div class="d-flex hundredHeight justify-content-center">
      <div className="container-flued boxsize">

<div className="row  text-white  ">
<h1 className='text-center text-white'>SignIn</h1> 
  <div className="col ">
    <div className="row">
   
    </div>
    <div className="row">
      
    <SignInForm />
<SignUpLink />
    </div>
    <div className="row">
    <div className="row">
   
   
   
    {/* <div className="col">
    <SignInFacebook />
    </div> */}
     {/* <div className="col">
     <SignInTwitter />
     </div> */}

    </div>
    </div>
  </div>
 

</div>

</div>

      </div>
      
   


      </div>
  
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  loading: false,
};

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    this.setState({ loading: true });

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((user) => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.DASHBOARD);    
        this.setState({ loading: false });

      })
      .catch(error => {
        this.setState({ error });
        this.setState({ loading: false });

      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
       <div>
      <form onSubmit={this.onSubmit} className="form">
      <div className="col ">
      <label for="exampleInputEmail1">Email address</label>
      <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          className='form-control text-white signin-input'
        />
       {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
  
      </div>
      <div className="col">
      <label for="exampleInputPassword1">Password</label>
      <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
          className='signin-input'
        />
     
      </div>
     <div className="col">
       <div className="row">
         <div className="col d-flex justify-content-between mt-2">
         <PasswordForgetLink className=" "/>
         {this.state.loading ? <div style={{backgroundColor: 'inherit', display: 'flex', justifyContent:'center'}} className="m-2"><CircularProgress color="inherit" /></div>
:''}
         <button disabled={isInvalid} type="submit"   className='btn btn-primary align-slef-start '>
          Sign In
        </button>
      
         </div>
    
       </div>
    
     </div>
       
    
       

        {error  && 
        <div>
                            <p className='bg-danger'></p>

                  <p className='bg-danger'>Error , make sure you are online <br /> check your email and password then try again</p>

        </div>
        }
      </form>
  
      </div>
    );
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
  
        return this.props.firebase.user(socialAuthUser.user.uid).update({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.LANDING);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit" className='form-control btn btn-primary align-slef-end '>Or Sign In with Google</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Facebook</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInTwitterBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithTwitter()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Twitter</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

const SignInFacebook = compose(
  withRouter,
  withFirebase,
)(SignInFacebookBase);

const SignInTwitter = compose(
  withRouter,
  withFirebase,
)(SignInTwitterBase);

export default SignInPage;

export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter };
