/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SelectField from 'react-md/lib/SelectFields';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';

import { addMyNetwork_dispatch } from '../actions/network'

/*----------------------- AddNetwork Component ---------------------------*/
class AddNetwork extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleNetworkChange = this.handleNetworkChange.bind(this);
        this.state = {
                        network: {},
                        verificationEmail: ''
                    };
        const networkNames = props.networks.map(network => network.name);
        console.log("PROPS IN ADD NETWORK", props);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleNetworkChange(value, index, event) { // eslint-disable-line no-unused-vars
        let thisNetwork = this.props.networks.filter(network => (network.id === value))[0];
        this.setState({ network: thisNetwork });
    };

    handleSubmit(event){
        event.preventDefault();
        console.log(event);
        this.props.addNetwork(this.state.network);
    }
    render(){
        return (
        <div className="add-network">
            <h1>Your networks:</h1>
            { (this.props.user.networks && this.props.user.networks.length) ?
                this.props.user.networks.map(networkId => <li key={networkId}>networkId</li>)
                :
                <h2>You currently are not affiliated with any networks. Add a network below.</h2>
            }
            <h1>Add a new network here</h1>
            <form onSubmit={this.handleSubmit}>
                <SelectField
                    id="chooseNetwork"
                    placeholder="Choose your Network"
                    itemLabel="name"
                    itemValue="id"
                    value={this.state.network.id}
                    onChange={this.handleNetworkChange}
                    menuItems={this.props.networks}
                    className="md-cell"
                />
                <TextField
                    id="verificationEmail"
                    name="verificationEmail"
                    onChange={this.handleChange} 
                    label="Verify your network with your associated email address"
                    defaultValue={this.state.network.name ? this.state.network.suggestedDomain : ''}
                    className="md-cell md-cell--1-phone md-cell--4"
                    required
                />
                <Button flat primary label="Submit" type="submit" className="submit md-cell--4" />
            </form>
        </div>
        )
    }
}

AddNetwork.propTypes = {
  user: PropTypes.object.isRequired,
  networks: PropTypes.array.isRequired,
  addNetwork: PropTypes.func.isRequired
};

/*----------------------- Container ---------------------------*/
const mapStateToProps = (state) => ({
        user: state.user,
        networks: state.network.networks
    });

const mapDispatchToProps = dispatch => {
    return {
        addNetwork: network => {
            dispatch(addMyNetwork_dispatch(this.props.user, network))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNetwork);