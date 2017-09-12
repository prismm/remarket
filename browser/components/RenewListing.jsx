import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
import Button from 'react-md/lib/Buttons/Button';

/*----------------------- RenewListing Component ---------------------------*/
//Component is a button which, when clicked, opens a date picker that sets a new expiration date for the listing
export default class RenewListing extends Component {
  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
            value: today,
            visible: false
            };
    this.reset = this.reset.bind(this);
    this.openPicker = this.openPicker.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  reset() {
    this.setState({ value: null });
  }

  openPicker() {
    this.setState({ visible: true });
  }

  handleChange(value) {
    let newExpDate = new Date(value).setHours(23, 59);
    this.props.renewListing(this.props.currentListing.id, newExpDate);
    this.setState({ value });
  }

  handleVisibilityChange(visible) {
    this.setState({ visible });
  }

  render() {
    const { value, visible } = this.state;
    const today = new Date();
    const twoMonthsLater = new Date(new Date().setMonth(today.getMonth() + 2));
    return (
      <div>
        <Button
          label="RENEW"
          raised
          className="md-inline-block md-btn md-btn--raised md-background--secondary md-background--secondary-hover md-pointer--hover md-btn--text md-btn--raised-pressed my-listing-button"
          onClick={this.openPicker}
        />
        <div className="renew-picker">
          <DatePicker
            id="fully-controlled"
            className=""
            minDate={today}
            maxDate={twoMonthsLater}
            visible={visible}
            value={value}
            onChange={this.handleChange}
            onVisibilityChange={this.handleVisibilityChange}
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
