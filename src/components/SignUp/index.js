import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { database,auth } from "../Firebase/firebase";
import firebase from "firebase/compat/app";

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import Navigation from '../Navigation';
import Backdrop from '@mui/material/Backdrop';
import {CircularProgress,LinearProgress} from '@mui/material/';
import './signup.css'
const SignUpPage = () => (
  <div>
     <div className="gradient__bg">
  
  <Navigation />

  </div>
  <div className=" mybg-image  ">
      <div class="d-flex hundredHeight justify-content-center">
      <div className="container-flued boxsize">

<div className="row   ">
    <h1 className='text-white text-center'>SignUp</h1>
    <SignUpForm />
    </div>
    </div>
    </div>
    </div>
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
  loading: false,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = {};
    this.setState({ loading: true });
    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        database.ref().child('users').child(authUser.user.uid).set({
          "email": email,
          "name": username,
          "Devices": {
            "Device_1": {
              "Live": {
                "State": {
                  "Ts": Date.now(),
                  "Value": 0
                },
                "Sliders": {
                  "Slider_1": 0,
                  "Slider_2": 0,
                  "Slider_3": 0,
                  "Slider_4": 0,
                  "Slider_5": 0,
                  "Slider_6": 0,
                },
                "Sensors": {
                  "Range": {
                    "Sensor_1": {
                      "Min": 0,
                      "Max": 100,
                    },
                    "Sensor_2": {
                      "Min": 0,
                      "Max": 100,
                    },
                    "Sensor_3": {
                      "Min": 0,
                      "Max": 100,
                    },
                    "Sensor_4": {
                      "Min": 0,
                      "Max": 100,
                    },
                    "Sensor_5": {
                      "Min": 0,
                      "Max": 100,
                    },
                    "Sensor_6": {
                      "Min": 0,
                      "Max": 100,
                    }
                  },
                  "names": {
                    "Sensor_1": "Sensor 1",
                    "Sensor_2": "Sensor 2",
                    "Sensor_3": "Sensor 3",
                    "Sensor_4": "Sensor 4",
                    "Sensor_5": "Sensor 5",
                    "Sensor_6": "Sensor 6"
                  },
                  "Sensor_1": {
                    "Ts":Date.now(),
                    "Value": 0
                  },
                  "Sensor_2": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_3": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_4": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_5": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_6": {
                    "Ts": Date.now(),
                    "Value": 0
                  }
                },
                "Buttons": {
                  "names": {
                    "Button_1": "Button 1",
                    "Button_2": "Button 2",
                    "Button_3": "Button 3",
                    "Button_4": "Button 4",
                    "Button_5": "Button 5",
                    "Button_6": "Button 6"
                  },
                  "Button_1": false,
                  "Button_2": false,
                  "Button_3": false,
                  "Button_4": false,
                  "Button_5": false,
                  "Button_6": false,
                  "Button_7": false,
                  "Button_8": false,
                  "Button_9": false
                }
              },
              "Storage": {
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": 0,
                "Sensor_2": 0,
                "Sensor_3": 0,
                "Sensor_4": 0,
                "Sensor_5": 0,
                "Sensor_6": 0
              },
            },
            "Device_2": {
              "Live": {
                "State": {
                  "Ts": Date.now(),
                  "Value": 0
                },
                "Sensors": {
                  "names": {
                    "Sensor_1": "Sensor 1",
                    "Sensor_2": "Sensor 2",
                    "Sensor_3": "Sensor 3",
                    "Sensor_4": "Sensor 4",
                    "Sensor_5": "Sensor 5",
                    "Sensor_6": "Sensor 6"
                  },
                  "Sensor_1": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_2": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_3": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_4": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_5": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_6": {
                    "Ts": Date.now(),
                    "Value": 0
                  }
                },
                "Buttons": {
                  "names": {
                    "Button_1": "Button 1",
                    "Button_2": "Button 2",
                    "Button_3": "Button 3",
                    "Button_4": "Button 4",
                    "Button_5": "Button 5",
                    "Button_6": "Button 6"
                  },
                  "Button_1": false,
                  "Button_2": false,
                  "Button_3": false,
                  "Button_4": false,
                  "Button_5": false,
                  "Button_6": false,
                  "Button_7": false,
                  "Button_8": false,
                  "Button_9": false
                }
              },
              "Storage": {
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": 0,
                "Sensor_2": 0,
                "Sensor_3": 0,
                "Sensor_4": 0,
                "Sensor_5": 0,
                "Sensor_6": 0
              },
            },
            "Device_3": {
              "Live": {
                "State": {
                  "Ts": Date.now(),
                  "Value": 0
                },
                "Sensors": {
                  "names": {
                    "Sensor_1": "Sensor 1",
                    "Sensor_2": "Sensor 2",
                    "Sensor_3": "Sensor 3",
                    "Sensor_4": "Sensor 4",
                    "Sensor_5": "Sensor 5",
                    "Sensor_6": "Sensor 6"
                  },
                  "Sensor_1": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_2": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_3": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_4": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_5": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_6": {
                    "Ts": Date.now(),
                    "Value": 0
                  }
                },
                "Buttons": {
                  "names": {
                    "Button_1": "Button 1",
                    "Button_2": "Button 2",
                    "Button_3": "Button 3",
                    "Button_4": "Button 4",
                    "Button_5": "Button 5",
                    "Button_6": "Button 6"
                  },
                  "Button_1": false,
                  "Button_2": false,
                  "Button_3": false,
                  "Button_4": false,
                  "Button_5": false,
                  "Button_6": false,
                  "Button_7": false,
                  "Button_8": false,
                  "Button_9": false
                }
              },
              "Storage": {
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": 0,
                "Sensor_2": 0,
                "Sensor_3": 0,
                "Sensor_4": 0,
                "Sensor_5": 0,
                "Sensor_6": 0
              },
            },
            "Device_4": {
              "Live": {
                "State": {
                  "Ts": Date.now(),
                  "Value": 0
                },
                "Sensors": {
                  "names": {
                    "Sensor_1": "Sensor 1",
                    "Sensor_2": "Sensor 2",
                    "Sensor_3": "Sensor 3",
                    "Sensor_4": "Sensor 4",
                    "Sensor_5": "Sensor 5",
                    "Sensor_6": "Sensor 6"
                  },
                  "Sensor_1": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_2": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_3": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_4": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_5": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_6": {
                    "Ts": Date.now(),
                    "Value": 0
                  }
                },
                "Buttons": {
                  "names": {
                    "Button_1": "Button 1",
                    "Button_2": "Button 2",
                    "Button_3": "Button 3",
                    "Button_4": "Button 4",
                    "Button_5": "Button 5",
                    "Button_6": "Button 6"
                  },
                  "Button_1": false,
                  "Button_2": false,
                  "Button_3": false,
                  "Button_4": false,
                  "Button_5": false,
                  "Button_6": false,
                  "Button_7": false,
                  "Button_8": false,
                  "Button_9": false
                }
              },
              "Storage": {
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": 0,
                "Sensor_2": 0,
                "Sensor_3": 0,
                "Sensor_4": 0,
                "Sensor_5": 0,
                "Sensor_6": 0
              },
            },
            "Device_5": {
              "Live": {
                "State": {
                  "Ts": Date.now(),
                  "Value": 0
                },
                "Sensors": {
                  "names": {
                    "Sensor_1": "Sensor 1",
                    "Sensor_2": "Sensor 2",
                    "Sensor_3": "Sensor 3",
                    "Sensor_4": "Sensor 4",
                    "Sensor_5": "Sensor 5",
                    "Sensor_6": "Sensor 6"
                  },
                  "Sensor_1": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_2": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_3": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_4": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_5": {
                    "Ts": Date.now(),
                    "Value": 0
                  },
                  "Sensor_6": {
                    "Ts": Date.now(),
                    "Value": 0
                  }
                },
                "Buttons": {
                  "names": {
                    "Button_1": "Button 1",
                    "Button_2": "Button 2",
                    "Button_3": "Button 3",
                    "Button_4": "Button 4",
                    "Button_5": "Button 5",
                    "Button_6": "Button 6"
                  },
                  "Button_1": false,
                  "Button_2": false,
                  "Button_3": false,
                  "Button_4": false,
                  "Button_5": false,
                  "Button_6": false,
                  "Button_7": false,
                  "Button_8": false,
                  "Button_9": false
                }
              },
              "Storage": {
                "names": {
                  "Sensor_1": "Sensor 1",
                  "Sensor_2": "Sensor 2",
                  "Sensor_3": "Sensor 3",
                  "Sensor_4": "Sensor 4",
                  "Sensor_5": "Sensor 5",
                  "Sensor_6": "Sensor 6"
                },
                "Sensor_1": 0,
                "Sensor_2": 0,
                "Sensor_3": 0,
                "Sensor_4": 0,
                "Sensor_5": 0,
                "Sensor_6": 0
              },
            }
          }
        });
       // Create a user in your Firebase realtime database
        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: username,
        
        }).then(() => {
          // Update successful
          // ...
        }).catch((error) => {
          // An error occurred
          // ...
        });  
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
         'roles': {
           'OWNER': true,
           'DataRead': true,
           'ADMIN': false
         }
        });
      
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.DASHBOARD);
        this.setState({ loading: false });

      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
        this.setState({ loading: false });

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (

      <div className="container">
        <div className="row">
          <div className="col">
          <form onSubmit={this.onSubmit} className='form'>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
          className='form-control text-white signin-input m-2'
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          className='form-control  text-white signin-input m-2'
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
          className='form-control  text-white signin-input m-2'
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password" 
          className='form-control  text-white signin-input m-2'


        />
      {this.state.loading ? <div style={{backgroundColor: 'inherit', display: 'flex', justifyContent:'center'}} className="m-2"><CircularProgress color="inherit" /></div>
:''}
        <button disabled={isInvalid} type="submit" className='form-control  btn btn-primary  m-2  mt-5=3'>
        
          Sign Up
        
        </button>

        {error && <p>{error.message}</p>}
      </form>
          </div>
        </div>
      </div>
     
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
