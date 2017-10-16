/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';

import Card from 'react-md/lib/Cards/Card';
import Button from 'react-md/lib/Buttons/Button'; 
import TextField from 'react-md/lib/TextFields';

import Snackbar from '../HOC/Snackbar.jsx'

import {contact_dispatch, interactionSuccess_action} from '../actions/user'
/*----------------------- Contact Component ---------------------------*/
function Contact (props) {
    let success = props.success;

    const style = {
        fontFamily: 'avenir',
        fontWeight: '500',
        color: '#FC0096'
    }

    return (
        <div className="md-grid">
            <div className="md-cell--5 about-body">
                <h2 style={style} classNames="category-header about-header">contact</h2>
                <div className="contact-p">Send us your thoughts & comments.</div>
                <Card className="md-card md-background--card md-cell--12 message-card md-cross-fade">
                <form onSubmit={props.handleSubmit}>
                    <div>
                        <label htmlFor="replyToEmail"><small>your email</small></label>
                        <TextField name="replyToEmail" type="text" />
                    </div>
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
                </form>
                </Card>
            </div>
            { success ? <Snackbar /> : null }
        </div>
    )
}

/*----------------------- Container ---------------------------*/
const mapStateToProps = state => ({
    success: state.browse.success
});

const mapDispatchToProps = dispatch => {
return {
        handleSubmit(event){
            event.preventDefault();
            const message = event.target.message.value;
            const subject = event.target.subject.value;
            const replyToEmail = event.target.replyToEmail.value;
            dispatch(contact_dispatch(replyToEmail, message, subject))
            dispatch(interactionSuccess_action('Message sent'))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
