/*------------------- managing state.action (referring to user being viewed) ----------------------*/
const initialState = {
    myComments: [],
    myOffers: [],
    mySaves: [],
    myEndorses: []
}

export default function(state = initialState, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case 'ADD_COMMENT':
            newState.myComments = [action.comment, ...newState.myComments];
            break;
        case 'DELETE_COMMENT':
            newState.myComments = newState.myComments.filter(comment => comment.id !== action.commentId);
            break;
        case 'EDIT_COMMENT':
            newState.myComments = newState.myComments.map(comment => (comment.id === action.comment.id ? action.comment : comment));
            break;
        case 'ADD_OFFER':
            newState.myOffers = [action.offer, ...newState.myOffers];
            break;
        case 'REVOKE_OFFER':
            newState.myOffers = newState.myOffers.filter(offer => offer.id !== action.offerId);
            break;
        case 'EDIT_OFFER':
            newState.myOffers = newState.myOffers.map(offer => (offer.id === action.offer.id ? action.offer : offer));
            break;
        case 'SAVE_POST':
            newState.mySaves = [action.save, ...newState.mySaves];
            break;
        case 'UNSAVE_POST':
            newState.mySaves = newState.mySaves.filter(save => save.id !== action.saveId);
            break;
        case 'ADD_ENDORSEMENT':
            newState.myEndorses = [action.endorse, ...newState.myEndorses];
            break;
        case 'REMOVE_ENDORSEMENT':
            newState.myEndorses = newState.myEndorses.filter(endorse => endorse.id !== action.endorseId);
            break;
        default:
            return state;
    }
    return newState;
}