/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dialog from 'react-toolbox/lib/dialog';
import FontIcon from 'react-toolbox/lib/font_icon';

import {flagListing_dispatch} from '../actions/listing';
import {saveListing_dispatch} from '../actions/user'

/*----------------------- MyOffers Component ---------------------------*/
class SelectedItemActions extends Component {
    constructor(props){
        super(props);
        this.state = {
            saved: props.listingActions.saved || false,
            shared: false,
            dialogActive: false,
            flagged: false,
            error: null
        }
        this.saveListing = this.saveListing.bind(this);
        this.showFlagDialog = this.showFlagDialog.bind(this);
        this.handleDialogCancel = this.handleDialogCancel.bind(this);
        this.flagListing = this.flagListing.bind(this);
        this.facebookShare = this.facebookShare.bind(this);
    }

    componentDidMount(){
        //figure out whether user has saved this listing in the past
        //figure out how many users have saved this listing
    }

    saveListing(){
        if (this.props.user && this.props.user.id){
            this.setState({saved: !this.state.saved});
            this.props.saveListing(this.props.currentListing.id, this.props.user);
        }
        else {
            this.setState({error: 'Please log in to save this post.'})
        }
    }

    showFlagDialog(){
        if (this.props.user && this.props.user.id){
            this.setState({dialogActive: true})
        } else {
            this.setState({error: 'Please log in to report this post.'})
        }
    }

    handleDialogCancel(){
        this.setState({dialogActive: false})
    }

    flagListing(){
        if (this.props.user && this.props.user.id){
            this.props.flagListing(this.props.currentListing.id, this.props.user);
            this.setState({
                flagged: true,
                dialogActive: false
            })
        } else {
            this.setState({error: 'Please log in to report this post.'})
        }
    }

    facebookShare(){
        if (this.props.user && this.props.user.id){
            FB.ui(
                {
                method: 'share',
                href: window.location.href,
                },
                function(response){}
            );
            this.setState({shared: true});
        } else {
            this.setState({error: 'Please log in to share this post.'})
        }
    }

    render(){
        const isItMyListing = this.props.currentListing.authorId === this.props.user.id;
        const dialogActions = [
            { label: 'Cancel', onClick: this.handleDialogCancel },
            { label: 'Yes, Flag it!', className: 'yes-flag-it', onClick: this.flagListing }
          ];
        return (
        <div>
            {!this.state.shared ? <div className="action-item-container" onClick={ this.facebookShare }><span className="action-item">Share on Facebook </span> <i className="action-item-icon icon ion-social-facebook" /></div> : <div className="action-item-container" onClick={ this.facebookShare }><span className="action-item action-item-done">Shared </span> <i className="action-item-icon action-item-icon-done icon ion-social-facebook" /></div>}
            { !isItMyListing ?
                <div>
                    {!this.state.saved ? <div className="action-item-container" onClick={ this.saveListing }><span className="action-item action-save-item">Save this post </span> <FontIcon className="action-item-icon" value="favorite_border" /></div> : <div className="action-item-container" onClick={ this.saveListing }><span className="action-item action-item-done">You saved this post </span> <FontIcon className="action-item-icon action-item-icon-done" value="favorite" /></div>}
                    {!this.state.flagged ? <div className="action-item-container action-flag-container" onClick={ this.showFlagDialog }><span className="action-item">Flag as inappropriate </span> <FontIcon className="action-item-icon" value="error_outline" /></div> : <div className="action-item-container" onClick={ this.showFlagDialog }><span className="action-item action-item-done">Flagged </span> <FontIcon className="action-item-icon action-item-icon-done" value="error" /></div>}
                    <Dialog
                        actions={dialogActions}
                        active={this.state.dialogActive}
                        onEscKeyDown={this.handleDialogCancel}
                        onOverlayClick={this.handleDialogCancel}
                        title="Flag this post"
                        classname="flag-dialog"
                        type="small"
                    >
                    <p className="dialog-text">Are you sure you want to flag this post as inappropriate? If so, we'll review and remove it if necessary.</p>
                    </Dialog>
                </div>
                :
                null
            }
            { this.state.error ? <div className="selected-item-error">{ this.state.error }</div> : null}
        </div>
        )
    }
}

SelectedItemActions.propTypes = {
    currentListing: PropTypes.object.isRequired,
    user: PropTypes.object,
    listingActions: PropTypes.object,
    flagListing: PropTypes.func.isRequired,
    saveListing: PropTypes.func.isRequired
  };

/*---------------------------------Container------------------------------------*/
const mapState = ({user, listing, browse}) => ({
    currentListing: listing.currentListing,
    user: user,
    listingActions: browse.listing
});

const mapDispatch = dispatch => ({
    flagListing: (listingId, user) => {
        dispatch(flagListing_dispatch(listingId, user))
    },
    saveListing: (listingId, user) => {
        console.log('trying to save listing!')
        dispatch(saveListing_dispatch(listingId, user))
    }
});

export default connect(mapState, mapDispatch)(SelectedItemActions);
