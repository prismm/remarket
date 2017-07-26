/*------------------- managing state.browse ----------------------*/
const initialState = {
    user: {},
    listing: {}
}

export default function(state = initialState, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case 'VIEW_USER':
            newState.user = action.user;
            break;
        case 'CLEAR_USER':
            newState.user = {};
            break;
        default:
            return state;
    }
}