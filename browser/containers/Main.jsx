/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout_dispatch } from '../actions/user';

/*------------------- Main component ----------------------*/
const Main = ({ children, handleClick, loggedIn }) => {
  return (
    <div>
      <h1 className="site-header"><Link to="/">remarket</Link></h1>
      { loggedIn ?
          <nav className="site-nav">
            <Link className="site-nav-link" to="/home">Home</Link>
            <a className="site-nav-link" href="#" onClick={handleClick}>Logout</a>
            <Link className="site-nav-link" to="/listings/post">New Post</Link>
          </nav> :
          <nav className="site-nav">
            <Link className="site-nav-link" to="/login">Login</Link>
            <Link className="site-nav-link" to="/signup">Sign Up</Link>
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
