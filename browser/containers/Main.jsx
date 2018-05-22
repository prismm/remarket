/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import Button from 'react-md/lib/Buttons/Button';

import Footer from '../components/Footer.jsx'

import { logout_dispatch } from '../actions/user';
import { fetchSingleNetwork_dispatch, setCurrentNetwork_action } from '../actions/network';

/*------------------- Main component ----------------------*/

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      toggle: false,
      rotateLogo: false,
      selectedNetwork: props.currentNetwork && props.currentNetwork.id
    };
    this.setNetwork = this.setNetwork.bind(this);
    this.clickLogo = this.clickLogo.bind(this);
  }

  setNetwork(networkId){
    if (networkId !== this.state.selectedNetwork) {
      this.props.selectNetwork(networkId);
      this.setState({selectedNetwork: networkId});
    } else {
      this.setState({selectedNetwork: 0});
      this.props.clearNetwork();
    }
  }

  clickLogo(){
    this.setState({ rotateLogo: true })
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.setState({ rotateLogo: false });
    }, 700);
  }

  componentWillUnmount(){
    if (this.timeout) {
        clearTimeout(this.timeout);
      }
}

  render(){
    const { children, handleClick, loggedIn } = this.props;
    // logic to determine button styling below
    let NyuClassNames = 'network-button'
    let ColumbiaClassNames = 'network-button'
    switch (this.state.selectedNetwork) {
      case 1:
        NyuClassNames += ' network-button-disabled-nyu'
        ColumbiaClassNames += ' network-button-columbia-selected'
        break;
      case 2:
        NyuClassNames += ' network-button-nyu-selected'
        ColumbiaClassNames += ' network-button-disabled-columbia'
        break;
      default:
        NyuClassNames += ' network-button-nyu'
        ColumbiaClassNames += ' network-button-columbia'
        break;
    }

    // logic for logo rotation
    let { rotateLogo } = this.state

    return (
      <div>
        <div className="site-header-container">
          <Link to="/">
            <img
              className={`remarket-logo ${rotateLogo && 'rotate-logo'}`}
              src="/imgs/remarket-logo.png"
              alt="" height="40" width="40"
              onClick={() => this.clickLogo()}
            />
          </Link>
          <h1 className="site-header">
            <Link to="/" onClick={() => this.clickLogo()}>remarket</Link>
          </h1>
          {(this.props.location.pathname === '/' || this.props.location.pathname === '/home') && //hide buttons if not on home page
          <Button raised primary className={NyuClassNames} onClick={() => this.setNetwork(2)} label="NYU" />}
          {(this.props.location.pathname === '/' || this.props.location.pathname === '/home') &&
          <Button raised primary className={ColumbiaClassNames} onClick={() => this.setNetwork(1)} label="Columbia" />}
          { loggedIn ?
              <nav className="site-nav">
                <a className="site-nav-link" href="#" onClick={handleClick}>Logout</a>
                <Link className="site-nav-link" to="/account">My Account</Link>
                <Link className="site-nav-link link-new-post" to="/listings/post">New Post</Link>
              </nav> :
              <nav className="site-nav">
                <Link className="site-nav-link" method="login" to="/login">Login</Link>
                <Link className="site-nav-link signup-link" method="signup" to="/signup">Sign Up</Link>
              </nav>
          }
        </div>
        <hr />
          <div className="container-div">
          { children }
          </div>
        <hr />
      <Footer />
      </div>
    );
    }
}

Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  selectNetwork: PropTypes.func.isRequired,
  currentNetwork: PropTypes.object
};

/*------------------- Container ----------------------*/

const mapState = state => ({
  loggedIn: !!state.user.id,
  currentUser: state.user,
  currentNetwork: state.network.currentNetwork
});

const mapDispatch = dispatch => ({
  handleClick: () => dispatch(logout_dispatch()),
  selectNetwork: networkId => {
    dispatch(setCurrentNetwork_action({id: networkId})); //doing this on frontend to improve performance
    // dispatch(fetchSingleNetwork_dispatch(networkId))
  },
  clearNetwork: () => dispatch(setCurrentNetwork_action({}))
});

export default connect(mapState, mapDispatch)(Main);
