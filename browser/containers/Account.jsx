/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/*----------------------- Account Component ---------------------------*/
class Account extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
        <div>
            <h2>My Account</h2>
        </div>
        )
    }
}

Account.propTypes = {
    user: PropTypes.object.isRequired
};

/*----------------------- Container ---------------------------*/
const mapStateToProps = (state) => ({
        user: state.user,
    });

export default connect(mapStateToProps)(Account);