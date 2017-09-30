/*------------------- managing state.action (referring to user being viewed) ----------------------*/
const initialState = {
    listingActions: [],
    myActions: {},
    myComments: [],
    myOffers: [],
    mySaves: [],
    myEndorses: []
}

export default function(state = initialState, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case 'SET_ACTIONS':
            newState.listingActions = action.listingActions;
            break;
        case 'SET_MY_ACTIONS':
            newState.myActions = action.myActions;
            break;
        case 'ADD_COMMENT':
            newState.myComments = [action.comment, ...newState.myComments];
            newState.myActions.comments = [action.comment, ...newState.myActions.comments];
            break;
        case 'DELETE_COMMENT':
            newState.myComments = newState.myComments.filter(comment => comment.id !== action.commentId);
            newState.myActions.comments = newState.myActions.comments.filter(comment => comment.id !== action.commentId);
            break;
        case 'EDIT_COMMENT':
            newState.myComments = newState.myComments.map(comment => (comment.id === action.comment.id ? action.comment : comment));
            newState.myActions.comments = newState.myActions.comments.map(comment => (comment.id === action.comment.id ? action.comment : comment));
            break;
        case 'ADD_OFFER':
            newState.myOffers = [action.offer, ...newState.myOffers];
            newState.myActions.offers = [action.offer, ...newState.myActions.offers];
            break;
        case 'REVOKE_OFFER':
            newState.myOffers = newState.myOffers.filter(offer => offer.id !== action.offerId);
            newState.myActions.offers = newState.myActions.offers.filter(offer => offer.id !== action.offerId);
            break;
        case 'EDIT_OFFER':
            newState.myOffers = newState.myOffers.map(offer => (offer.id === action.offer.id ? action.offer : offer));
            newState.myActions.offers = newState.myActions.offers.map(offer => (offer.id === action.offer.id ? action.offer : offer));
            break;
        case 'SAVE_POST':
            newState.mySaves = [action.save, ...newState.mySaves];
            newState.myActions.saves = [action.save, ...newState.myActions.saves];
            // newState.listingActions = [action.save, ...newState.listingActions];
            break;
        case 'UNSAVE_POST':
            newState.mySaves = newState.mySaves.filter(save => save.id !== action.saveId);
            newState.myActions.saves = newState.myActions.saves.filter(save => save.id !== action.saveId);
            // newState.listingActions = newState.listingActions.filter(listingAction => listingAction.type === 'save' && listingAction.id !== action.saveId);
            break;
        case 'ADD_ENDORSEMENT':
            newState.myEndorses = [action.endorse, ...newState.myEndorses];
            newState.myActions.endorsements = [action.endorse, ...newState.myActions.endorsements];
            break;
        case 'REMOVE_ENDORSEMENT':
            newState.myEndorses = newState.myEndorses.filter(endorse => endorse.id !== action.endorseId);
            newState.myActions.endorsements = newState.myActions.endorsements.filter(endorse => endorse.id !== action.endorseId);
            break;
        default:
            return state;
    }
    return newState;
}