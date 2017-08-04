import { Login, Signup } from './Auth.jsx';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CSSTransitionGroup from 'react-addons-css-transition-group';
import Tabs from 'react-md/lib/Tabs/Tabs';
import Tab from 'react-md/lib/Tabs/Tab';
import TabsContainer from 'react-md/lib/Tabs/TabsContainer';

/*------------------- LoginOrSignup component ----------------------*/

class LoginOrSignup extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeTabIndex: props.status === 'signup'
        }
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleTabChange(activeTabIndex){
        this.setState({activeTabIndex})
    }

    render (){
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
                        <h6><i>Add yourself to a network, post, and reply to listings on remarket.</i></h6>
                        <hr />
                        <div className="login-signup-form">
                        <Signup />
                        </div>
                        </CSSTransitionGroup>
                    </Tab>
                </Tabs>
                </TabsContainer>
                </div>
            </div>
    )
    }
}

LoginOrSignup.propTypes = {
    status: PropTypes.string
}

export default LoginOrSignup;