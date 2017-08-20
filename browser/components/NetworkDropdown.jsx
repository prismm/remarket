import React, { Component } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown';

/*----------------------- MyOffers Component ---------------------------*/
class NetworkDropdown extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: 'ES-es'
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value){
        this.setState({value: value});
        console.log(value);
    }

    render(){
        const countries = [
            { value: 'EN-gb', label: 'England' },
            { value: 'ES-es', label: 'Spain'},
            { value: 'TH-th', label: 'Thailand' },
            { value: 'EN-en', label: 'USA'}
          ];

        return (
        <div>
            <Dropdown
                auto
                onChange={this.handleChange}
                source={countries}
                value={this.state.value}
            />
        </div>
    )}
}

export default NetworkDropdown;
