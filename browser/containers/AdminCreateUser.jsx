/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import generator from 'generate-password';

import { Button } from 'react-toolbox/lib/button';


import {adminCreateUser_dispatch} from '../actions/user'

/*----------------------- MyOffers Component ---------------------------*/
class AdminCreateUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: null
        };
    }

    generateTemporaryPassword(){
        const password = generator.generate({
            length: 10,
            numbers: true
        });

        this.setState(password);
    }

    render(){
        return (
            <div></div>
        )
    }
}

AdminCreateUser.PropTypes = {
}

/*---------------------------------Container------------------------------------*/

const mapState = () => {};

const mapDispatch = dispatch => ({
    adminCreateUser: (email, password) => dispatch(adminCreateUser_dispatch(email, password))
})


export default connect(mapState, mapDispatch)(AdminCreateUser);
