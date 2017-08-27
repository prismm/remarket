/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout_dispatch } from '../actions/user';
import Button from 'react-md/lib/Buttons/Button';

/*------------------- Main component ----------------------*/
const Main = ({ children, handleClick, loggedIn }) => {
  return (
    <div>
      <Link to="/"><img className="remarket-logo" src="/imgs/recycling-pink.png" alt="" height="40" width="40" /></Link><h1 className="site-header"><Link to="/">remarket</Link></h1>
      <Button raised primary className="network-button network-button-nyu" label="NYU" />
      <Button raised primary className="network-button network-button-columbia" label="Columbia" />
      { loggedIn ?
          <nav className="site-nav">
            <a className="site-nav-link" href="#" onClick={handleClick}>Logout</a>
            <Link className="site-nav-link" to="/account">My Account</Link>
            <Link className="site-nav-link" to="/listings/post">New Post</Link>
          </nav> :
          <nav className="site-nav">
            <Link className="site-nav-link" method="login" to="/login">Login</Link>
            <Link className="site-nav-link" method="signup" to="/signup">Sign Up</Link>
          </nav>
      }
      <hr />
      { children }
      <hr />

    </div>
  );
};

Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

/*------------------- Container ----------------------*/

const mapState = ({ user }) => ({
  loggedIn: !!user.id,
  currentUser: user
});

const mapDispatch = dispatch => ({
  handleClick () {
    dispatch(logout_dispatch());
  }
});

export default connect(mapState, mapDispatch)(Main);
