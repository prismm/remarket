import Button from 'react-md/lib/Buttons/Button';
import React, { Component } from 'react';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
import PropTypes from 'prop-types';

export default class RenewListing extends Component {
  constructor(props) {
    super(props);

    this.state = { 
            value: props.expirationDate,
            visible: false
            };
    this._reset = this._reset.bind(this);
    this._openPicker = this._openPicker.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleVisibilityChange = this._handleVisibilityChange.bind(this);
  }

  _reset() {
    this.setState({ value: null });
  }

  _openPicker() {
    this.setState({ visible: true });
  }

  _handleChange(value) {
    this.setState({ value });
  }

  _handleVisibilityChange(visible) {
    this.setState({ visible });
  }

  render() {
    const { value, visible } = this.state;
    return (
      <div>
        <Button label="Open the Picker" raised onClick={this._openPicker} />
        <div className="md-grid">
          <DatePicker
            id="fully-controlled"
            label="Select some date"
            className="md-cell"
            visible={visible}
            value={value}
            onChange={this._handleChange}
            onVisibilityChange={this._handleVisibilityChange}
          />
          <Button icon onClick={this._reset} className="md-cell--bottom">close</Button>
        </div>
      </div>
    );
  }
}

RenewListing.propTypes = {
  expirationDate: PropTypes.object,
  renewListing: PropTypes.func
};
