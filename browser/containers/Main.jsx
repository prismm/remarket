import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout_dispatch } from '../actions/user';
import ListingsContainer from './ListingsContainer.jsx'

// Component //

const Main = ({ children, handleClick, loggedIn }) => {
  console.log(children);
  return (
    <div>
      <h1><Link to="/">remarket</Link></h1>
      { loggedIn ?
          <nav>
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>Logout</a>
            <Link to="/listings/post">New Post</Link>
          </nav> :
          <nav>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
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

// Container //

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
