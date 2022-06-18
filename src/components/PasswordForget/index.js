import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Navigation from '../Navigation';
import './index.css'
const PasswordForgetPage = () => (
  <div>
    <div className="gradient__bg">
  
  <Navigation />
  <div className="top mybg-image ">
      <div class="d-flex hundredHeight justify-content-center">
      <div className="container-flued boxsize">

<div className="row   ">
<h1 className='text-white text-center'>Password Forget</h1>
    <PasswordForgetForm />
    </div>
    </div>
    </div>
    </div>
  </div>
  
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
  success: null,
};

class PasswordForgetFormBase extends Component {
  static emailStatus = null;
   static emailSent = false;
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then((success) => {
        this.setState({ ...INITIAL_STATE });
     
        alert('Password reset email sent, check your inbox');

      })
      .catch(error => {
        this.setState({ error });
        alert('Failed to send Password reset Email');

      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, error, success } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit} className='form'>
               <small id="emailHelp" className="form-text text-white">You forgot your password don't wory it happens we will send you a reset email just enter your email and press the button below</small>

        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          className='form-control text-white signin-input'

        />
       

        <button disabled={isInvalid} type="submit" className='btn btn-primary align-slef-start mt-5'>
          Reset My Password
        </button>

      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p className='align-slef-end'>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
