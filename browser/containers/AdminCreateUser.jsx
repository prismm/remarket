/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import generator from 'generate-password';

import { Button } from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';


import {adminCreateUser_dispatch} from '../actions/user'

/*----------------------- MyOffers Component ---------------------------*/
class AdminCreateUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: null,
            error: null,
            emailError: null
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.generateTemporaryPassword = this.generateTemporaryPassword.bind(this)
    }

    generateTemporaryPassword(){
        const password = generator.generate({
            length: 10,
            numbers: true
        });

        this.setState({password, error: null});
    }

    handleEmailChange (email){
        this.setState({email, error: null});
        if (this.state.email.length < 10 || this.state.email.indexOf('@') < 0 ){
            this.setState({emailError: 'please enter a valid email address'})
        } else {
            this.setState({emailError: null})
        }
    }

    handleSubmit(){
        if (this.state.email && this.state.password) {
            this.props.adminCreateUser(this.state.email, this.state.password)
        } else {
            this.setState({error: 'Please enter a valid email address and generate a temporary password for the user.'})
        }
        console.log('Data to be submitted: ', this.state.email, this.state.password)
    }

    checkEmailError(){
        return (this.state.email.length < 10 || this.state.email.indexOf('@') < 0 )
    }

    render(){
        return (
            <div>
                <Input type="email" label="Email address" icon="email" value={this.state.email} onChange={this.handleChange} error={this.state.emailError} />
                <Button label="Generate temporary password" raised primary /><div>{ this.state.password ? this.state.password : <em>none</em> }</div>
                <Button icon="add" label="Create confirmed user" raised accent disabled={!this.state.password || !this.state.email} onMouseUp={this.handleSubmit} />
                <div>{this.state.error ? this.state.error : null}</div>
            </div>
        )
    }
}

AdminCreateUser.PropTypes = {
    adminCreateUser: PropTypes.func.isRequired
}


/*---------------------------------Container------------------------------------*/

const mapState = () => {};

const mapDispatch = dispatch => ({
    adminCreateUser: (email, password) => dispatch(adminCreateUser_dispatch(email, password))
})


export default connect(mapState, mapDispatch)(AdminCreateUser);
