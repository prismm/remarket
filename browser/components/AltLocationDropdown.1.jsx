/* LocationDropdown.jsx */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SelectField from 'react-md/lib/SelectFields';
import ExpansionPanel from 'react-md/lib/ExpansionPanels';
import ExpansionList from 'react-md/lib/ExpansionPanels/ExpansionList';
import Dropdown from 'react-toolbox/lib/dropdown';

/*------------------- LocationDropdown component ----------------------*/
const locations = [
  '',
  'New York',
  'New Haven',
  'Boston/Cambridge',
  'Philadelphia',
  'Washington DC'
];



const countries = [
  { value: 'EN-gb', label: 'England' },
  { value: 'ES-es', label: 'Spain'},
  { value: 'TH-th', label: 'Thailand' },
  { value: 'EN-en', label: 'USA'}
];

class DropdownTest extends React.Component {
  state = locations[0];

  handleChange = (value) => {
    this.setState({value: value});
  };

  render () {
    return (
      <Dropdown
        auto
        onChange={this.handleChange}
        source={locations}
        value={this.state.value}
      />
    );
  }
}


export default class LocationDropdown extends PureComponent {

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
    <ExpansionList style={{ padding: 16, width: '400px' }}>
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

LocationDropdown.propTypes = {
    handleLocationChange: PropTypes.func.isRequired
};