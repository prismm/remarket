import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout_dispatch } from '../actions/user';
import ListingsContainer from './ListingsContainer.jsx'

// Component //

const Main = props => {

  const { children, handleClick, loggedIn } = props;

  return (
    <div>
      <h1>remarket</h1>
      { loggedIn ?
          <nav>
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>Logout</a>
          </nav> :
          <nav>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </nav>
      }
      <hr />
      <ListingsContainer />
      { children }
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
