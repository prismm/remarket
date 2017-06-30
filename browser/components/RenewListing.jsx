import Button from 'react-md/lib/Buttons/Button';
import React, { Component } from 'react';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
import PropTypes from 'prop-types';

/*----------------------- RenewListing Component ---------------------------*/
export default class RenewListing extends Component {
  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
            value: today,
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
    this.props.renewListing(this.props.currentListing.id, value);
    this.setState({ value });
  }

  _handleVisibilityChange(visible) {
    this.setState({ visible });
  }

  render() {
    const { value, visible } = this.state;
    const today = new Date();
    const twoMonthsLater = new Date(new Date().setMonth(today.getMonth() + 2));
    return (
      <div>
        <Button label="RENEW" raised className="md-inline-block md-btn md-btn--raised md-background--secondary md-background--secondary-hover md-pointer--hover md-btn--text md-btn--raised-pressed my-listing-button" onClick={this._openPicker} />
        <div className="renew-picker">
          <DatePicker
            id="fully-controlled"
            className="md-cell"
            minDate={today}
            maxDate={twoMonthsLater}
            visible={visible}
            value={value}
            onChange={this._handleChange}
            onVisibilityChange={this._handleVisibilityChange}
          />
        </div>
      </div>
    );
  }
}

RenewListing.propTypes = {
  currentListing: PropTypes.object,
  renewListing: PropTypes.func
};
