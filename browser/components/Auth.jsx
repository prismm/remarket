/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { auth_dispatch } from '../actions/user';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';

/*-------------------Auth Form component ----------------------*/
class AuthForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      pwLenError: false
    }
    this.checkPasswordChange = this.checkPasswordChange.bind(this);
  }

  checkPasswordChange(value){
        value.length > 7 ? this.setState({pwLenError: false}) : this.setState({pwLenError: true})
  }

  render(){
    const { name, displayName, handleSubmit, error } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email"><small>Email</small></label>
            <TextField name="email" type="text" />
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
          <div className="md-grid">
            <Button raised primary label={ displayName } type="submit" className="login-submit md-cell--12" />
          </div>
          { error &&  <div> { error.response.data } </div> }
        </form>
        <p><a href="/auth/google">{ displayName } with Google</a></p>
        <p><a href="/auth/facebook">{ displayName } with Facebook</a></p>
      </div>
    );
  }
};

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};

/*-------------------Login & Signup containers ----------------------*/
const mapLogin = ({ user }) => ({
  name: 'login',
  displayName: 'Login',
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
  }
});

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
