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
    };

    handleSubmit(event){
        event.preventDefault();
        this.props.addNetwork(this.state.network);
    }
    //value={this.state.network.id}
    render(){
        console.log("PROPS networks", this.props.networks);
        console.log('STATE', this.state.network);
        return (
        // <div className="add-network-container md-grid">
        //     <div className="add-network md-cell-8">
                <div className="your-networks md-cell-4">
                    <h2>Your networks:</h2>
                    { (this.props.user.networks && this.props.user.networks.length) ?
                        this.props.user.networks.map(network => <li key={network.id}>network.name</li>)
                        :
                        <h5>You currently are not affiliated with any networks. Add a network below.</h5>
                    }
                {/*</div>*/}
                {/*// <div className="add-network-form md-cell-4">
                // </div>*/}
            {/*</div>*/}
                    <h2>Add a new network:</h2>
                    <form onSubmit={this.handleSubmit}>
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
                            className={this.state.network.suggestedDomain + ' md-cell md-cell--1-phone md-cell--4'}
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