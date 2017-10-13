/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';
import Dropdown from 'react-toolbox/lib/dropdown';

import {
    fetchListingActions_dispatch,
    fetchMyActions_dispatch,
    addComment_dispatch,
    editComment_dispatch,
    deleteComment_dispatch,
    addOffer_dispatch,
    editOffer_dispatch,
    revokeOffer_dispatch,
    addEndorsement_dispatch,
    unendorse_dispatch
} from '../actions/action'

/*----------------------- ListingFeed Component ---------------------------*/
class ListingFeed extends Component {
    constructor(props){
        super(props);   
        this.state = {
            offers: props.listingActions.filter(action => action.type === 'offer'),
            goingPrice: 0, //should be initialized to the highest offer so far
            comments: props.listingActions.filter(action => action.type === 'comment'),
            endorsements: props.listingActions.filter(action => action.type === 'endorse'),
            listingActions: props.listingActions,
            myActions: props.myActions,
            actionType: null,
            actionLabel: 'What do you want to do?'
        }
        this.chooseActionType = this.chooseActionType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    chooseActionType(actionType){
        this.setState({actionType});
    }

    handleSubmit(event){
        event.preventDefault();
        if (actionType === 'offer'){ console.log('offer!') }
        else if (actionType === 'comment'){ console.log('comment!') }
        else if (actionType === 'save'){ console.log('save') }
        else if (actionType === 'endorse'){ console.log('endorse') }
        else console.log('OOPS!')
    }

    render(){
        const { author, floorPrice, askingPrice } = this.props.currentListing;
        const { goingPrice, offers, comments, endorsements, listingActions, myActions } = this.state;
        const actionTypes = [
            { prompt: '', label: '', value: null },
            { prompt: 'make an offer', label: 'offer', value: 'offer' },
            { prompt: 'leave a question/comment', label: 'comment', value: 'comment' },
            { prompt: 'endorse this post', label: 'endorse', value: 'endorse' },
            { prompt: 'save this post', label: 'save', value: 'save' }
        ]
        return (
        <div>
            <fieldset className="feed">
                <legend className="md-subheading-1">listing feed</legend>
                <div className="md-grid inner-fieldset">
                    <ul>
                        {listingActions && listingActions.length ?
                            (listingActions.map((action, index) => {
                                if (action.type === 'offer'){
                                    return <li key={index}><div>offer</div>${action.amount}</li>
                                } else if (action.type === 'comment'){
                                    return <li key={index}><div>comment</div>{action.content}</li>
                                } else if (action.type === 'save'){
                                    return <li key={index}><div>{action.userId} liked this.</div></li>
                                } else if (action.type === 'endorse'){
                                    return <li key={index}><div>{action.userId} endorsed this.</div></li>
                                }
                            }
                            ))
                            :
                            null
                        }
                    </ul>
                </div>
            </fieldset>
            <fieldset>
                <legend className="md-subheading-1">chime in</legend>
                <form onSubmit={this.handleSubmit}>
                    <div className="md-grid inner-fieldset">
                        <div className="md-cell md-cell--3">
                            <Dropdown
                                auto
                                allowBlank={true}
                                label="type"
                                className="location-dropdown create-listing-location-dropdown"
                                onChange={this.chooseActionType}
                                source={actionTypes}
                                value={this.state.actionType}
                            />
                        </div>
                        <div className="md-cell md-cell--8">
                            <label htmlFor={this.state.actionLabel}><small>{this.state.actionLabel}</small></label>
                            <TextField name="message" type="text" />
                        </div>
                        <Button
                            raised
                            primary
                            label="Post"
                            type="submit"
                            className="md-cell md-cell--1"
                        />
                    </div>
                </form>
            </fieldset>
        </div>
        )
    }
}

ListingFeed.propTypes = {
    user: PropTypes.object,
    currentListing: PropTypes.object.isRequired,
    myActions: PropTypes.object,
    listingActions: PropTypes.array.isRequired,
    myComments: PropTypes.array.isRequired,
    myOffers: PropTypes.array.isRequired,
    mySaves: PropTypes.array.isRequired,
    myEndorses: PropTypes.array.isRequired,
    getListingActions: PropTypes.func.isRequired,
    getMyActions: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    addOffer: PropTypes.func.isRequired,
    editOffer: PropTypes.func.isRequired,
    revokeOffer: PropTypes.func.isRequired,
    addEndorsement: PropTypes.func.isRequired,
    unendorse: PropTypes.func.isRequired

  };

/*---------------------------------Container------------------------------------*/
const mapState = ({user, listing, action}) => ({
    user: user,
    myActions: action.myActions, // an object of all the current user's actions, stored as 'type': [], sorted by date(newest first)
    currentListing: listing.currentListing,
    listingActions: action.listingActions, //all actions associated with the currentListing, in an array, as objects with type attributes specifying what type of action ('endorsement', 'save', 'offer', 'comment') sorted by date (newest first) 
    myComments: action.myComments, //an array
    myOffers: action.myOffers, //an array
    mySaves: action.mySaves, //an array
    myEndorses: action.myEndorses //an array
});

const mapDispatch = dispatch => ({
    getListingActions: listingId => dispatch(fetchListingActions_dispatch(listingId)),
    getMyActions: userId => dispatch(fetchMyActions_dispatch(userId)),
    addComment: comment => dispatch(addComment_dispatch(comment)),
    editComment: (commentId, changes) => dispatch(editComment_dispatch(commentId, changes)),
    deleteComment: commentId => dispatch(deleteComment_dispatch(commentId)),
    addOffer: offer => dispatch(addOffer_dispatch(offer)),
    editOffer: (offerId, changes) => dispatch(editOffer_dispatch(offerId, changes)),
    revokeOffer: offerId => dispatch(revokeOffer_dispatch(offerId)),        
    addEndorsement: endorse => dispatch(addEndorsement_dispatch(endorse)),
    unendorse: endorseId => dispatch(unendorse_dispatch(endorseId))
});

export default connect(mapState, mapDispatch)(ListingFeed);
