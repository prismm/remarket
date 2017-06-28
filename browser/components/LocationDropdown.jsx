/* LocationDropdown.jsx */
import React, { PureComponent, PropTypes } from 'react';

import SelectField from 'react-md/lib/SelectFields';
import ExpansionPanel from 'react-md/lib/ExpansionPanels';
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList';

const locations = [
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
          location: locations[0],
          tempLocation: locations[0],
        };
    }

  setTempLocation(tempLocation){
    this.setState({ tempLocation });
  }

  setLocation(){
    this.setState({ location: this.state.tempLocation });
  }

  resetLocation(){
    this.setState({ tempLocation: this.state.tempLocation });
  }

  render() {
    const { location, tempLocation } = this.state;
    const { focused, columnWidths, mobile } = this.props;
    return (
    <ExpansionList style={{ padding: 16 }}>
      <ExpansionPanel
        focused={focused}
        flat
        columnWidths={columnWidths}
        label="Location:     "
        secondaryLabel={!mobile ? location : null}
        onSave={this.setLocation}
        onCancel={this.resetLocation}
      >
        <SelectField
          id="locations"
          menuItems={locations}
          label="Select a location"
          className="md-cell"
          value={tempLocation}
          onChange={this.setLocation}
        />
      </ExpansionPanel>
    </ExpansionList>
    );
  }
}
