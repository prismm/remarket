/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { messageUser_dispatch, messageSent_action } from '../actions/user';
import Loader from '../HOC/Loader.jsx'

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Card from 'react-md/lib/Cards/Card';
import Button from 'react-md/lib/Buttons/Button'; 
import TextField from 'react-md/lib/TextFields';

/*-------- MessageUser component ---------*/

class MessageUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            on: false,
            subject: this.props.subject ? this.props.subject : '',
            waiting: false
        }
        this.showMessage = this.showMessage.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    showMessage(){
        this.setState({on: true});
    }

    hideMessage(){
        this.setState({on: false});
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.messageSent){
            console.log("we are in here")
            this.setState({on: false, waiting: false});
        }
    }

    ComponentWillUnmount(){
        return this.props.clearMessage();
    }

    handleSubjectChange(subject){
        this.setState({subject: subject});
    }

    handleSubmit(event){
        event.preventDefault();
        const from = this.props.sender;
        const to = this.props.currentListing && this.props.currentListing.author ? this.props.currentListing.author : this.props.receiver;
        const message = event.target.message.value;
        const subject = event.target.subject.value;
        this.props.messageUser(from, to, message, subject);
        this.setState({waiting: true});
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
            <CSSTransitionGroup
                transitionName="md-cross-fade"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={150}
            >
            {this.state.on &&
            <Card className="md-card md-background--card md-cell--12 message-card md-cross-fade">
            <form onSubmit={this.handleSubmit} name={this.props.label}>
                <div>
                    <label htmlFor="subject"><small>subject</small></label>
                    <TextField name="subject" type="text" value={this.state.subject} onChange={this.handleSubjectChange} />
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
            </form>
            </Card>
            }
            </CSSTransitionGroup>
            { this.state.waiting &&
                <div>
                    <Loader loadingText="Sending...(this may take a few minutes)" />
                </div>
            }
            {   sent &&  <div className="response-message"> { sent } </div> }
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
    },
    clearMessage: () => {
        return dispatch(messageSent_action(null))
    }
}
}
//clearMessage not working -- loader message floats over text beneath
export default connect(mapStateToProps, mapDispatchToProps)(MessageUser);
