/* eslint-disable camelcase */
import axios from 'axios';

/* ------------   ACTION CREATORS     ------------------ */

const setNetworks_action = networks => ({ type: 'SET_NETWORKS', networks });
const getMyNetworks_action = user => ({ type: 'GET_MY_NETWORKS', user });
export const setCurrentNetwork_action = network => ({ type: 'SET_CURRENT_NETWORK', network });
const addMyNetwork_action = user => ({ type: 'ADD_NETWORK', user });
const removeNetwork_action = network => ({ type: 'REMOVE_NETWORK', network })

/* ------------       DISPATCHERS     ------------------ */

export const fetchAllNetworks_dispatch = () => dispatch => {
    return axios.get('/api/networks')
        .then(res => {
            dispatch(setNetworks_action(res.data));
        })
        .catch(console.error);
}

//will return entries in join table now
export const getMyNetworks_dispatch = user => dispatch => {
    axios.get(`/api/users/${user.id}/networks`)
        .then(res => {
            dispatch(getMyNetworks_action(res.data));
        })
        .catch(console.error)
}

export const fetchSingleNetwork_dispatch = networkId => dispatch => {
    axios.get(`/api/networks/${networkId}`)
        .then(res => {
            dispatch(setCurrentNetwork_action(res.data))
        })
        .catch(console.error);
}

export const addMyNetwork_dispatch = (user, network, email) => dispatch => {
    axios.post(`/api/users/${user.id}/networks/${network.id}`, { email })
        .then(res => {
            let thisUser = res.data;
            thisUser.networks = thisUser.networks.filter(eachNetwork => eachNetwork.network_affiliations.confirmed);
            dispatch(addMyNetwork_action(thisUser));
            dispatch(setCurrentNetwork_action(network));
        })
        .catch(console.error);
}

export const removeNetwork_dispatch = (user, network) => dispatch => {
    axios.delete(`/api/users/${user.id}/networks/${network.id}`, network)
        .then(() => {
            dispatch(removeNetwork_action(network));
        })
        .catch(console.error);
}