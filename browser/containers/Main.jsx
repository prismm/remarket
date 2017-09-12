/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { logout_dispatch } from '../actions/user';
import { fetchSingleNetwork_dispatch, setCurrentNetwork_action } from '../actions/network';
import Button from 'react-md/lib/Buttons/Button';
import Footer from '../components/Footer.jsx'

/*------------------- Main component ----------------------*/

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedNetwork: props.currentNetwork && props.currentNetwork.id
    };
    this.setNetwork = this.setNetwork.bind(this);
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

  render(){
    const { children, handleClick, loggedIn } = this.props;
    //logic to determine button styling below
    let NyuClassNames = this.state.selectedNetwork === 2 ? 'network-button network-button-nyu-selected' : 'network-button network-button-nyu';
    NyuClassNames = this.state.selectedNetwork === 1 ? 'network-button network-button-disabled-nyu' : NyuClassNames;
    NyuClassNames = this.state.selectedNetwork === 0 ? 'network-button network-button-nyu' : NyuClassNames;
    let ColumbiaClassNames = this.state.selectedNetwork === 1 ? 'network-button network-button-columbia-selected' : 'network-button network-button-columbia';
    ColumbiaClassNames = this.state.selectedNetwork === 2 ? 'network-button network-button-disabled-columbia' : ColumbiaClassNames;
    ColumbiaClassNames = this.state.selectedNetwork === 0 ? 'network-button network-button-columbia' : ColumbiaClassNames;
    return (
      <div>
        <Link to="/"><img className="remarket-logo" src="/imgs/recycling-pink.png" onClick={() => {browserHistory.push('/')}} alt="" height="40" width="40" /></Link><h1 className="site-header"><Link to="/">remarket</Link></h1>
        <Button raised primary className={NyuClassNames} onClick={() => this.setNetwork(2)} label="NYU" />
        <Button raised primary className={ColumbiaClassNames} onClick={() => this.setNetwork(1)} label="Columbia" />
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
        <hr />
        { children }
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
    dispatch(setCurrentNetwork_action({id: networkId}));
    dispatch(fetchSingleNetwork_dispatch(networkId))
  },
  clearNetwork: () => dispatch(setCurrentNetwork_action({}))
});

export default connect(mapState, mapDispatch)(Main);
