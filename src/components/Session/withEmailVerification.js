import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import './emailVarfy.css'
const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password');

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props);

      this.state = { isSent: false };
    }

    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }));
    };

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <div className=" email-mybg-image ">
                   <div className="container mytop  ">
                     <div className="row myWidth  ">
                     {this.state.isSent ? (
                 <div className=" text-white">
                       <div className="row text-center alert alert-success ">
                       <p className='text-center'>  Success ..!!</p>

                         <p className=''>
                          E-Mail confirmation sent: {authUser.username}  Check your E-Mails (Spam
                    folder included) for a confirmation E-Mail.
                    Refresh this page once you confirmed your E-Mail.
                  </p>
                  </div>
                 </div>
                 
                ) : (
                  <div className="container">
                    <div className="row text-center justify-content-center alert alert-info">
                    <p className='text-center'> {authUser.username} You have signed up successfully!!</p>

                      <p className='text-center'>  Verify your Email ..!!</p>
                    <p className=' '>
                    Check your E-Mails (Spam folder
                    included) for a confirmation E-Mail or send
                    another confirmation E-Mail.
                  </p>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={this.onSendEmailVerification}
                  disabled={this.state.isSent}
                  className='btn btn-outline-primary text-white '
                >
                  Send confirmation E-Mail Again
                </button>
                     </div>
                   </div>
            
              </div>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
