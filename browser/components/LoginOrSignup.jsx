import { Login, Signup } from './Auth.jsx';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Snackbar from '../HOC/Snackbar.jsx'

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Tabs from 'react-md/lib/Tabs/Tabs';
import Tab from 'react-md/lib/Tabs/Tab';
import TabsContainer from 'react-md/lib/Tabs/TabsContainer';

/*------------------- LoginOrSignup component ----------------------*/

class LoginOrSignup extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeTabIndex: Number(props.route.method === 'signup')
        }
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleTabChange(activeTabIndex){
        this.setState({activeTabIndex})
    }

    componentWillReceiveProps(nextProps){
        this.setState({activeTabIndex: Number(nextProps.route.method === 'signup')})
    }

    render (){
        let success = this.props.success;
        return (
            <div className="login-or-signup md-grid">
            <div className="tab-container md-cell--6">
            <TabsContainer onTabChange={this.handleTabChange} activeTabIndex={this.state.activeTabIndex} panelClassName="login-panel" colored >
                <Tabs tabId="tab">
                    <Tab label="Log In">
                        <h2>Log In</h2>
                        <h6><i>Welcome back.</i></h6>
                        <hr />
                        <div className="login-signup-form">
                        <Login />
                        </div>
                    </Tab>
                    <Tab label="Sign Up">
                        <CSSTransitionGroup
                        component="div"
                        transitionName="md-cross-fade"
                        transitionEnterTimeout={300}
                        transitionLeave={false}
                        >
                        <h2>Create an Account</h2>
                        <h6><i>Join your network, post, and reply to listings on remarket.</i></h6>
                        <hr />
                        <div className="login-signup-form">
                        <Signup />
                        </div>
                        </CSSTransitionGroup>
                    </Tab>
                </Tabs>
                </TabsContainer>
                </div>
                {success ? <Snackbar /> : null}
            </div>
    )
    }
}

LoginOrSignup.propTypes = {
    status: PropTypes.string
}

/*----------------------- Container ---------------------------*/
const mapStateToProps = state => ({
    success: state.browse.success
});


export default connect(mapStateToProps)(LoginOrSignup);
