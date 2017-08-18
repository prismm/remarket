/*------------------- managing state.browse (referring to user being viewed) ----------------------*/
const initialState = {
    user: {},
    listing: {},
    userListings: {},
    message: {},
    destination: '/home'
}

export default function(state = initialState, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case 'VIEW_USER':
            newState.user = action.user;
            break;
        case 'VIEW_USER_LISTINGS':
            newState.userListings = action.listings;
            break;
        case 'MESSAGE_SENT':
            newState.message = action.response;
            break;
        case 'CLEAR_USER':
            newState.user = {};
            newState.userListings = {};
            break;
        case 'SET_DESTINATION':
            newState.destination = action.destination;
            break;
        default:
            return state;
    }
    return newState;
}