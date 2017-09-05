/* LocationDropdown.jsx */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Dropdown from 'react-toolbox/lib/dropdown';

/*------------------- AltLocationDropdown component ----------------------*/
const locations = [
  { label: 'all', value: null },
  { label: 'New York', value: 'New York' },
  { label: 'Boston/Cambridge', value: 'Boston/Cambridge' },
  { label: 'Washington DC', value: 'Washington DC' },
  { label: 'other', value: 'other' }
]

export default class AltLocationDropdown extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      location: props.location || locations[0]
    };
    this.setLocation = this.setLocation.bind(this);
    this.resetLocation = this.resetLocation.bind(this)
  }

  setLocation(event){
    console.log(event);
    //causes error "Cannot read property 'type' of undefined" upon close -- doesn't seem to affect functionality -- should resolve this later
    this.setState({ location: event });
  }

  resetLocation(){
    this.setState({ location: '' });
    this.props.handleLocationChange('');
  }

  render() {
    const { location } = this.state;
    return (
      <Dropdown
        auto
        allowBlank={true}
        label="location"
        className="location-dropdown create-listing-location-dropdown"
        onChange={this.handleLocationChange}
        source={locations}
        value={location}
      />
    );
  }
}

AltLocationDropdown.propTypes = {
    handleLocationChange: PropTypes.func.isRequired
};