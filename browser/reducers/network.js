const initialState = {};

const networkReducer = (network = initialState, action) => {
    switch (action.type) {
        case 'ADD_NETWORK':
            return action.network;
        case 'REMOVE_NETWORK':
            return action.network;
        default:
            return network;
    }
}

export default networkReducer;