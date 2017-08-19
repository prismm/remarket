/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { messageUser_dispatch } from '../actions/user';

import TransitionGroup from 'react-addons-transition-group';
import Card from 'react-md/lib/Cards/Card';
import Button from 'react-md/lib/Buttons/Button'; 
import TextField from 'react-md/lib/TextFields';

/*-------- MessageUser component ---------*/

class MessageUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            on: false
        }
        this.showMessage = this.showMessage.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    showMessage(){
        this.setState({on: true});
    }

    hideMessage(){
        this.setState({on: false});
    }

    handleSubmit(event){
        event.preventDefault();
        const from = this.props.sender;
        const to = this.props.currentListing.author ? this.props.currentListing.author : this.props.receiver;
        const message = event.target.message.value;
        const subject = this.props.subject ? this.props.subject + event.target.subject.value  : event.target.subject.value;
        this.props.messageUser(from, to, message, subject);
    }

    render(){
        const sent = this.props.messageSent;
        return (
        <div className="message-button-container">
            {!this.state.on &&
            <Button
                raised
                secondary
                label={this.props.label}
                className="message-button"
                onClick={() => this.showMessage()}
            />}
            <TransitionGroup>
            {this.state.on &&
            <Card className="md-card md-background--card md-cell--12 message-card md-cross-fade">
            <form onSubmit={this.handleSubmit} name={this.props.label}>
                <div>
                    <label htmlFor="subject"><small>subject</small></label>
                    <TextField name="subject" type="text" />
                </div>
                <div>
                    <label htmlFor="message"><small>body</small></label>
                    <TextField name="message" type="text" rows={4} />
                </div>
                <Button
                    raised
                    primary
                    label="Send Message"
                    type="submit"
                    className="message-button send-message"
                />
                { sent.response &&  <div> { sent.response.data } </div> }
            </form>
            </Card>
            }
            </TransitionGroup>
        </div>
        )}
}

MessageUser.propTypes = {
    label: PropTypes.string.isRequired, //prop should be passed down
    receiver: PropTypes.object.isRequired,
    currentListing: PropTypes.object,
    sender: PropTypes.object.isRequired,
    messageUser: PropTypes.func.isRequired,
    subject: PropTypes.string //prop should be passed down
  };

/*----------------------- Container ---------------------------*/
const mapStateToProps = state => ({
    receiver: state.browse.user,
    currentListing: state.listing.currentListing,
    sender: state.user,
    messageSent: state.browse.message
});

const mapDispatchToProps = dispatch => {
return {
    messageUser: (from, to, message, subject) => {
        dispatch(messageUser_dispatch(from, to, message, subject))
    }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageUser);
