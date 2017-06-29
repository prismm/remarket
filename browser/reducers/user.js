/*------------------- managing state.user ----------------------*/
const initialState = {
    user: {},
}

export default function(state = initialState, action) {
    const newState = Object.assign({}, state)
    switch (action.type) {
        case 'GET_USER':
            newState.user = action.user;
            break;
        case 'REMOVE_USER':
            newState.user = {};
            break;
        case 'EDIT_USER':
            newState.user = Object.assign({}, state.user, action.changes)
            break;
        default:
            break;
    }
    return newState;
}