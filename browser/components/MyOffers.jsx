import React, { Component } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown';

/*----------------------- MyOffers Component ---------------------------*/
class MyOffers extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: 'ES-es'
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value){
        this.setState({value: value});
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
            <h3>My Offers</h3>
            <Dropdown
                auto
                onChange={this.handleChange}
                source={countries}
                value={this.state.value}
            />
        </div>
    )}
}

export default MyOffers;
