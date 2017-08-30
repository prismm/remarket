/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SelectField from 'react-md/lib/SelectFields';
import TextField from 'react-md/lib/TextFields';
import Dropdown from 'react-toolbox/lib/dropdown';
import Button from 'react-md/lib/Buttons/Button';
import {NetworkAvatar} from '../components/Avatars.jsx'

import { addMyNetwork_dispatch } from '../actions/network'

/*----------------------- AddNetwork Component ---------------------------*/
class AddNetwork extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.matchDomain = this.matchDomain.bind(this);
        this.state = {
                        value: null,
                        network: {suggestedDomain: '...'},
                        verificationEmail: '',
                        error: null,
                        submit: false
                    };
    }

    handleEmailChange(event) {
        this.setState({verificationEmail: event});
        this.matchDomain(event);
    }

    matchDomain(verificationEmail){
        let domain = this.state.network.suggestedDomain.slice(this.state.network.suggestedDomain.indexOf('@') + 1).toLowerCase();
        let inputDomain = verificationEmail.slice(domain.length * -1).toLowerCase();
        let match = (domain === inputDomain);
        this.setState( {error: !match })
    }

    handleChange(value){
        let thisNetwork = this.props.networks.filter(network => (network.id === value))[0];
        this.setState({value: value, network: thisNetwork, verificationEmail: thisNetwork.suggestedDomain, error: false});
    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({submit: true})
        this.props.addNetwork(this.props.user, this.state.network, this.state.verificationEmail);
    }

    render(){
        //still need to: default scope {confirmed: true} for all my networks queries! using front-end workaround right now
        const networksArr = [];
        this.props.networks.map(network => {(
            networksArr.push({
                value: network.id,
                label: network.name
            })
        )});
        return (
                <div className="md-grid">
                <div className="md-cell--2 my-networks-test" />
                    <div className="md-cell--5 add-a-network my-networks-test">
                        <h3>Add a Network</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="add-network-fields">
                            <Dropdown
                                auto
                                onChange={this.handleChange}
                                source={networksArr}
                                value={this.state.value}
                            />
                            <TextField
                                id="verificationEmail"
                                name="verificationEmail"
                                onChange={this.handleEmailChange}
                                label="Verify your network with your associated email address"
                                value={this.state.verificationEmail}
                                error={this.state.error}
                                errorText="Your email domain must match the network domain in order to verify affiliation."
                                required
                            />
                            </div>
                            <Button raised primary label="Submit" type="submit" disabled={this.state.error} />
                        </form>
                        {this.state.submit && <div className="network-submit-message"><div>Thank you!</div><div className="network-submit-note">One last step: check your email inbox for {this.state.verificationEmail} to confirm that you're indeed a part of this network.</div></div>}
                    </div>
                    <div className="md-cell--4 md-grid my-networks my-networks-test">
                    <div>
                        <h3 className="content-title-header">My Networks</h3>
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
        addNetwork: (user, network, email) => {
            dispatch(addMyNetwork_dispatch(user, network, email))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNetwork);
