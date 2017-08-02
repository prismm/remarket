/*------------------- managing state.user (referring to logged in user) ----------------------*/
const initialState = {}

export default function(state = initialState, action) {
    switch (action.type) {
        case 'GET_USER':
            return action.user;
        case 'REMOVE_USER':
            return {};
        case 'EDIT_USER':
            return Object.assign({}, state, action.changes)
        case 'ADD_NETWORK':
            return action.user;
        default:
            return state;
    }
}