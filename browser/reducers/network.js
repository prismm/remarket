const initialState = {
    networks: [],
    currentNetwork: {}
};

const networkReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case 'GET_MY_NETWORKS':
            newState.networks = action.networks;
            break;
        case 'SET_CURRENT_NETWORK':
            newState.currentNetwork = action.network;
            break;
        case 'ADD_NETWORK':
            newState.networks = [action.network, ...newState.networks];
            newState.currentNetwork = action.network;
            break;
        case 'REMOVE_NETWORK':
            newState.networks = newState.networks.filter(network => (network.id !== action.networkId));
            break;
        default:
            break;
    }
    return newState;
}

export default networkReducer;