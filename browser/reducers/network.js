/*------------------- managing state.network ----------------------*/
const initialState = {
    networks: [],
    myNetworks: [],
    currentNetwork: {}
};

const networkReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case 'SET_NETWORKS':
            newState.networks = action.networks;
            break;
        case 'GET_MY_NETWORKS':
            newState.myNetworks = action.myNetworks;
            break;
        case 'SET_CURRENT_NETWORK':
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