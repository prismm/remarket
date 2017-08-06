/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { auth_dispatch, forgotPassword_dispatch } from '../actions/user';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';

/*-------------------Auth Form component ----------------------*/
class AuthForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      pwLenError: false,
      email: ''
    }
    this.checkPasswordChange = this.checkPasswordChange.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleEmailChange(value){
    this.setState({email: value})
  }

  checkPasswordChange(value){
        value.length > 7 ? this.setState({pwLenError: false}) : this.setState({pwLenError: true})
  }
  
  forgotPassword(){
    this.props.forgotPassword(this.state.email);
  }

  render(){
    const { name, displayName, handleSubmit, error } = this.props;
    const googleSignin = <div className="md-ink-container"><img className="logo" src="/imgs/google.png" alt="Google logo" height="24" width="26" /><a className="google-text" href="/auth/google">{ displayName } with Google</a></div>;
    const fcbkSignin = <div className="md-ink-container"><img className="logo" src="/imgs/facebook.png" alt="Facebook logo" height="24" width="24" /><a className="facebook-text" href="/auth/facebook">{ displayName } with Facebook</a></div>;

    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email"><small>Email</small></label>
            <TextField name="email" type="text" value={this.state.email} onChange={this.handleEmailChange} />
          </div>
          <div>
            <label htmlFor="password"><small>Password</small></label>
            <TextField
              onChange={this.checkPwChange}
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
            <Button raised primary label={ displayName } type="submit" className="local-login login-submit md-cell--12" />
          { error &&  <div> { error.response.data } </div> }
        </form>
        <p><Button raised primary label={ googleSignin } type="submit" className="google-login login-submit md-cell--12" /></p>
        <p><Button raised primary label={ fcbkSignin } type="submit" className="facebook-login login-submit md-cell--12" /></p>
      </div>
    );
  }
};

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
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
  handleSubmit (evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(auth_dispatch(email, password, formName));
  },
  forgotPassword: function(email){
    dispatch(forgotPassword_dispatch(email));
  }
});

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
