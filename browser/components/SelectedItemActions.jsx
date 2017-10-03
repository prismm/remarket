/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dialog from 'react-toolbox/lib/dialog';
import FontIcon from 'react-toolbox/lib/font_icon';

import {flagListing_dispatch, fetchPageViews_dispatch } from '../actions/listing';
import {clearListingActions_dispatch, fetchMyActions_dispatch, fetchListingActions_dispatch, addSave_dispatch, unsave_dispatch} from '../actions/action'

/*----------------------- MyOffers Component ---------------------------*/
class SelectedItemActions extends Component {
    constructor(props){
        super(props);
        this.state = {
            saved: props.saved || false,
            shared: false,
            dialogActive: false,
            flagged: false,
            error: null,
            numberOfSaves: 0,
            pageViews: 0
        }
        this.saveListing = this.saveListing.bind(this);
        this.showFlagDialog = this.showFlagDialog.bind(this);
        this.handleDialogCancel = this.handleDialogCancel.bind(this);
        this.flagListing = this.flagListing.bind(this);
        this.facebookShare = this.facebookShare.bind(this);
    }

    componentDidMount(){
        if (this.props.user.id) this.props.fetchMyActions(this.props.user.id);
        if (this.props.currentListing.id) {
            fetchPageViews_dispatch(this.props.currentListing.id)
                .then(views => {
                        this.setState({pageViews: views});
                    })
                .catch(error => {
                    console.error(error)
                })
            this.props.fetchListingActions(this.props.currentListing.id);
        }
    }

    componentWillReceiveProps(nextProps){
        //figure out whether user has saved this listing in the past
        if (nextProps.myActions && nextProps.myActions.saves){
            this.setState({saved: nextProps.myActions.saves.some(save => save.listingId === this.props.currentListing.id)});
        }
        //figure out how many users have saved this listing
        if (this.props.listingSaves.length !== nextProps.listingSaves.length){
            this.setState({numberOfSaves: nextProps.listingSaves.length})
        }
        if (this.props.currentListing.id !== nextProps.currentListing.id){
            fetchPageViews_dispatch(nextProps.currentListing.id)
            .then(views => {
                    this.setState({pageViews: views});
                })
            .catch(error => {
                console.error(error)
            })
            this.props.fetchListingActions(nextProps.currentListing.id);
        }
    }

    componentWillUnmount(){
        this.props.clearListingActions();
    }

    saveListing(){
        let currentSave;
        if (this.props.user && this.props.user.id){
            if (!this.state.saved){
                this.setState({saved: true, numberOfSaves: this.state.numberOfSaves + 1 });
                currentSave = {type: 'save', userId: this.props.user.id, listingId: this.props.currentListing.id};
                this.props.saveListing(currentSave);
                this.props.fetchListingActions(this.props.currentListing.id);
            } else {
                this.setState({saved: false, numberOfSaves: this.state.numberOfSaves - 1 });
                currentSave = this.props.myActions.saves.find(save => save.listingId === this.props.currentListing.id);
                if (currentSave && currentSave.id) this.props.unsaveListing(currentSave.id);
                this.props.fetchListingActions(this.props.currentListing.id);
            }
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
        const pageViewNote = this.state.pageViews === 1 ? '1 person ' : this.state.pageViews + ' people'
        return (
        <div>
            {this.state.pageViews ? <div className="selected-item-error">{pageViewNote} viewed this post.</div> : null}
            {!this.state.shared ?
                <div className="action-item-container" onClick={ this.facebookShare }>
                    <span className="action-item">Share on Facebook </span>
                    <i className="action-item-icon icon ion-social-facebook" />
                </div>
                :
                <div className="action-item-container" onClick={ this.facebookShare }>
                    <span className="action-item action-item-done">Shared </span>
                    <i className="action-item-icon action-item-icon-done icon ion-social-facebook" />
                </div>
            }
            {!isItMyListing ?
                <div>
                    {!this.state.saved ?
                        <div className="action-item-container" onClick={ this.saveListing }>
                            { this.state.numberOfSaves ? <span className="action-item action-save-item">{this.state.numberOfSaves} </span> : <span className="action-item action-save-item">Save this post </span>}
                            <FontIcon className="action-item-icon" value="favorite_border" />
                        </div>
                        :
                        <div className="action-item-container" onClick={ this.saveListing }>
                            <span className="action-item action-item-done">{this.state.numberOfSaves}</span>
                            <FontIcon className="action-item-icon action-item-icon-done" value="favorite" />
                        </div>
                    }
                    {!this.state.flagged ?
                        <div className="action-item-container action-flag-container" onClick={ this.showFlagDialog }>
                            <span className="action-item">Flag as inappropriate </span>
                            <FontIcon className="action-item-icon" value="error_outline" />
                        </div>
                        :
                        <div className="action-item-container" onClick={ this.showFlagDialog }>
                            <span className="action-item action-item-done">Flagged </span>
                            <FontIcon className="action-item-icon action-item-icon-done" value="error" />
                        </div>
                    }
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
    listingActions: PropTypes.array.isRequired,
    myActions: PropTypes.object,
    flagListing: PropTypes.func.isRequired,
    saveListing: PropTypes.func.isRequired,
    unsaveListing: PropTypes.func.isRequired,
    fetchMyActions: PropTypes.func.isRequired,
    fetchListingActions: PropTypes.func.isRequired,
    clearListingActions: PropTypes.func.isRequired
  };

/*---------------------------------Container------------------------------------*/
const mapState = ({user, listing, action}) => ({
    currentListing: listing.currentListing,
    user: user,
    listingActions: action.listingActions,
    listingSaves: action.listingActions.filter(action => action.type === 'save'),
    myActions: action.myActions,
    saved: !!(action.myActions.saves) && action.myActions.saves.some(save => save.listingId === listing.currentListing.id)
});

const mapDispatch = dispatch => ({
    flagListing: (listingId, user) => {
        dispatch(flagListing_dispatch(listingId, user))
    },
    saveListing: save => {
        dispatch(addSave_dispatch(save))
    },
    unsaveListing: saveId => {
        dispatch(unsave_dispatch(saveId));
    },
    fetchMyActions: userId => {
        dispatch(fetchMyActions_dispatch(userId))
    },
    fetchListingActions: listingId => {
        dispatch(fetchListingActions_dispatch(listingId))
    },
    clearListingActions: () => {
        dispatch(clearListingActions_dispatch())
    }
});

export default connect(mapState, mapDispatch)(SelectedItemActions);
