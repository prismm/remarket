/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { auth_dispatch, forgotPassword_dispatch, resendConfirmLink_dispatch, googleAuth_dispatch, facebookAuth_dispatch } from '../actions/user';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';
import Loader from '../HOC/Loader.jsx';

/*-------------------Auth Form component ----------------------*/
class AuthForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      pwLenError: false,
      email: '',
      error: null,
      waiting: false
    }
    this.checkPasswordChange = this.checkPasswordChange.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.error){
      console.log(nextProps.error);
      this.setState({error: nextProps.error, waiting: false});
    }
  }

  componentWillUnmount(){
    this.setState({error: null, waiting: false})
  }

  handleEmailChange(value){
    this.setState({email: value})
  }

  checkPasswordChange(value){
       if (this.props.name === 'signup') value.length > 6 ? this.setState({pwLenError: false}) : this.setState({pwLenError: true})
  }

  forgotPassword(evt){
    evt.preventDefault();
    this.props.forgotPassword(this.state.email);
  }

  resendConfirmLink(){
    this.props.resendConfirmLink(this.state.email);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formName = event.target.name;
    const email = this.state.email;
    const password = event.target.password.value;
    this.setState({waiting: true});
    this.props.loginOrSignup(email, password, formName);
  }

  render(){
    const { name, displayName, error } = this.props;
    const handleSubmit = this.handleSubmit;
    const googleSignin = <div className="md-ink-container"><img className="logo" src="/imgs/google.png" alt="Google" height="24" width="26" /><a className="google-text" href="/auth/google"><p className="google-button-text">Continue with Google</p></a></div>;
    const fcbkSignin = <div className="md-ink-container"><img className="logo" src="/imgs/facebook.png" alt="Facebook" height="24" width="24" /><a className="facebook-text" href="/auth/facebook"><p className="facebook-button-text">Continue with Facebook</p></a></div>;

    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email"><small>Email</small></label>
            <TextField
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </div>
          <div>
            <label htmlFor="password"><small>Password</small></label>
            <TextField
              onChange={this.checkPasswordChange}
              name="password" type="password"
              error={this.state.pwLenError}
              errorText="Password must be at least 7 characters"
            />
          </div>
          {this.props.name === 'login' ?
            <div className="forgot-pw-link">
              <a href="" onClick={ this.forgotPassword }>Forgot your password?</a>
            </div>
            : null}
            <Button raised primary label={ displayName } disabled={this.state.pwLenError} type="submit" className="local-login login-submit md-cell--12" />
            { this.state.waiting &&
                <div>
                    <Loader loadingText="One moment, please..." />
                </div>
            }
            {error && error.response && error.response.data ? <div className="login-error"> { error.response.data } </div> : null}
            {error && error.response && error.response.data === 'Your account is not yet confirmed -- check your email or click below to resend the confirmation email.' ?
            <div className="forgot-pw-link">
              <a href="" onClick={ this.resendConfirmLink }>Resend confirmation link</a>
            </div>
            : null}
          <div className="or-continue">OR</div>
          <p><a href="auth/google"><Button raised primary label={ googleSignin } onClick={() => {}} className="google-login login-submit md-cell--12" /></a></p>
          <p><a href="auth/facebook"><Button raised primary label={ fcbkSignin } onClick={() => {}} className="facebook-login login-submit md-cell--12" /></a></p>
        </form>
      </div>
    );
  }
};

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  loginOrSignup: PropTypes.func.isRequired,
  error: PropTypes.object,
  forgotPassword: PropTypes.func
};

/*-------------------Login & Signup containers ----------------------*/
const mapLogin = ({ user }) => ({
  name: 'login',
  displayName: 'Log In',
  error: user.error
});

const mapSignup = ({ user }) => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: user.error
});

const mapDispatch = dispatch => ({
  loginOrSignup: (email, password, formName) => dispatch(auth_dispatch(email, password, formName)),
  forgotPassword: email => dispatch(forgotPassword_dispatch(email)),
  resendConfirmLink: email => dispatch(resendConfirmLink_dispatch(email))
});

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
