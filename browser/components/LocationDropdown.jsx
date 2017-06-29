/* LocationDropdown.jsx */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SelectField from 'react-md/lib/SelectFields';
import ExpansionPanel from 'react-md/lib/ExpansionPanels';
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList';

const locations = [
  'all',
  'New York',
  'New Haven',
  'Boston/Cambridge',
  'Philadelphia',
  'Princeton'
];

export default class LocationDropdown extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      location: locations[0]
    };
    this.setLocation = this.setLocation.bind(this);
    this.resetLocation = this.resetLocation.bind(this)
  }

  setLocation(event){
    console.log(event);
    this.setState({ location: event });
    this.props.handleLocationChange(event);
  }

  resetLocation(){
    this.setState({ location: '' });
    this.props.handleLocationChange('');
  }

  render() {
    const { location } = this.state;
    const { focused, columnWidths, mobile } = this.props;
    return (
    <ExpansionList style={{ padding: 16 }}>
      <ExpansionPanel
        focused={focused}
        columnWidths={columnWidths}
        label="Location:     "
        secondaryLabel={!mobile ? location : null}
        onCancel={this.resetLocation}
      >
        <SelectField
          id="locations"
          menuItems={locations}
          label="Select a location"
          className="md-cell"
          value={location}
          onChange={this.setLocation}
        />
      </ExpansionPanel>
    </ExpansionList>
    );
  }
}

// LocationDropdown.propTypes = {
//     handleLocationChange: PropTypes.func.isRequired
// };