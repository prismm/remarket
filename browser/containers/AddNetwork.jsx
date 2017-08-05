/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SelectField from 'react-md/lib/SelectFields';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';
import {NetworkAvatar} from '../components/Avatars.jsx'

import { addMyNetwork_dispatch } from '../actions/network'

/*----------------------- AddNetwork Component ---------------------------*/
class AddNetwork extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleNetworkChange = this.handleNetworkChange.bind(this);
        this.state = {
                        network: {suggestedDomain: '...'},
                        verificationEmail: ''
                    };
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleNetworkChange(value, index, event) { // eslint-disable-line no-unused-vars
        let thisNetwork = this.props.networks.filter(network => (network.id === value))[0];
        this.setState({ network: thisNetwork });
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.addNetwork(this.props.user, this.state.network);
    }

    render(){
        console.log(this.state.network);
        return (
                <div className="md-grid">
                <div className="md-cell--2 my-networks-test" />
                
                    <div className="md-cell--5 add-a-network my-networks-test">
                        <h3>Add a Network</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="add-network-fields">
                            <SelectField
                                id="chooseNetwork"
                                placeholder="Choose your Network"
                                itemLabel="name"
                                itemValue="id"
                                onChange={this.handleNetworkChange}
                                menuItems={this.props.networks}
                            />
                            <TextField
                                id="verificationEmail"
                                name="verificationEmail"
                                onChange={this.handleChange} 
                                label="Verify your network with your associated email address"
                                value={this.state.network.suggestedDomain}
                                className={this.state.network.suggestedDomain}
                                required
                            />
                            </div>
                            <Button flat primary label="Submit" type="submit" className="submit" />
                        </form>
                    </div>
                    <div className="md-cell--4 md-grid my-networks my-networks-test">
                    <div>
                        <h3>My Networks</h3>
                        { (this.props.user.networks && this.props.user.networks.length) ?
                            this.props.user.networks.map(
                                network => <li className="network-li" key={network.id}><NetworkAvatar key={network.id} network={network.name} tooltipLabel={network.name} tooltipPosition="top" />{network.name}</li>
                                )
                            :
                            <h5>You currently are not affiliated with any networks on remarket. <br /><br />But are you in real life? Add yourself to your network here.</h5>
                        }
                    </div>
                    </div>
                    <div className="md-cell--1 my-networks-test" />
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
const mapStateToProps = state => ({
        user: state.user,
        networks: state.network.networks
    });

const mapDispatchToProps = dispatch => {
    return {
        addNetwork: (user, network) => {
            dispatch(addMyNetwork_dispatch(user, network))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNetwork);