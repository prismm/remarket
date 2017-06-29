/*------------------- managing state.user ----------------------*/
const initialState = {}

export default function(state = initialState, action) {
    switch (action.type) {
        case 'GET_USER':
            return action.user;
        case 'REMOVE_USER':
            return {};
        case 'EDIT_USER':
            return Object.assign({}, state, action.changes)
        default:
            return state;
    }
}