/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextField from 'react-md/lib/TextFields';
import { Button } from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

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
            actionType: 'comment',
            actionLabel: 'What do you want to do?',
            typeClassName: 'action-comment'
        }
        this.chooseActionType = this.chooseActionType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.actionTypes = [
            { prompt: 'make an offer', label: 'offer', value: 'offer', className: 'action-offer' },
            { prompt: 'leave a question/comment', label: 'comment', value: 'comment', className: 'action-comment' },
            { prompt: 'endorse this post', label: 'endorse', value: 'endorse', className: 'action-endorse' },
            { prompt: 'save this post', label: 'save', value: 'save', className: 'action-save' }
        ]
    }

    chooseActionType(value){
        let actionType = this.actionTypes.filter(type => type.value === value)[0]
        console.log('actionType', actionType);
        this.setState({
            actionType: value,
            actionLabel: actionType.prompt,
            typeClassName: actionType.className
        });
    }

    componentWillReceiveProps(nextProps){
        console.log('in component will receive props')
        if (nextProps.listingActions.length !== this.props.listingActions.length){
            this.setState({listingActions: nextProps.listingActions})
            console.log(nextProps.listingActions)
        }
    }

    handleSubmit(event){
        event.preventDefault();
        if (this.state.actionType === 'offer'){ console.log('offer!') }
        else if (this.state.actionType === 'comment'){ console.log('comment!') }
        else if (this.state.actionType === 'save'){ console.log('save') }
        else if (this.state.actionType === 'endorse'){ console.log('endorse') }
        else console.log('OOPS!')
    }

    render(){
        const { author, floorPrice, askingPrice } = this.props.currentListing;
        const { goingPrice, offers, comments, endorsements, listingActions, myActions } = this.state;
        return (
        <div className="listing-feed-container">
            <div className="listing-feed-inner-container">
            <DataTable plain>
            <TableHeader>
                <TableRow>
                    <TableColumn>listing feed</TableColumn>
                    <TableColumn></TableColumn>
                    <TableColumn></TableColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
            {listingActions && listingActions.length ?
                (listingActions.map((action, index) => {
                    console.log('in the map')
                    if (action.type === 'offer'){
                        return (
                            <TableRow className="action-offer" key={index}>
                                <TableColumn>offer</TableColumn>
                                <TableColumn><div className="action-list-item action-user">{action.user.userId}</div> offered ${action.amount}</TableColumn>
                                <TableColumn></TableColumn>
                            </TableRow>
                            )
                    } else if (action.type === 'comment'){
                        return (
                            <TableRow className="action-list-item action-comment" key={index}>
                                <TableColumn>comment</TableColumn>
                                <TableColumn><div className="action-list-item action-user">{action.user.userId}</div>: {action.content}</TableColumn>
                                <TableColumn></TableColumn>
                            </TableRow>
                            )
                    } else if (action.type === 'save'){
                        return (
                            <TableRow className="action-list-item action-save" key={index}>
                                <TableColumn>save</TableColumn>
                                <TableColumn>{action.user.userId} liked this.</TableColumn>
                                <TableColumn></TableColumn>
                            </TableRow>
                            )
                    } else if (action.type === 'endorse'){
                        return (
                            <TableRow className="action-list-item action-endorse" key={index}>
                                <TableColumn>endorse</TableColumn>
                                <TableColumn>{action.user.userId} endorsed this.</TableColumn>
                                <TableColumn></TableColumn>
                            </TableRow>
                            )
                    }
                }
                ))
                :
                <div className="no-action-yet">no action yet</div>
            }
            </TableBody>
            </DataTable>
            <fieldset>
                <legend className="md-subheading-1">chime in</legend>
                <form onSubmit={this.handleSubmit}>
                <div className={this.state.typeClassName}>
                    <div className="md-grid inner-fieldset chime-in">
                        <div className="md-cell md-cell--2 action-type-dropdown">
                            <Dropdown
                                auto
                                allowBlank={true}
                                label="type"
                                className=""
                                onChange={this.chooseActionType}
                                source={this.actionTypes}
                                value={this.state.actionType}
                            />
                        </div>
                        <div className="md-cell md-cell--9 action-input">
                            <label htmlFor={this.state.actionLabel}><small>{this.state.actionLabel}</small></label>
                            <TextField name="message" type="text" />
                        </div>
                        <Button icon="add" floating accent mini type="submit" className="action-add-button md-cell"/>
                    </div>
                    </div>
                </form>
            </fieldset>
            </div>
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
