/* eslint-disable camelcase */
import axios from 'axios';

/* ------------   ACTION CREATORS     ------------------ */

const getMyNetworks_action = user => ({ type: 'GET_MY_NETWORKS', user });
const setCurrentNetwork_action = network => ({ type: 'SET_CURRENT_NETWORK', network });
const addMyNetwork_action = network => ({ type: 'ADD_NETWORK', network });
const removeNetwork_action = network => ({ type: 'REMOVE_NETWORK', network })

/* ------------       DISPATCHERS     ------------------ */

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

export const addMyNetwork_dispatch = (user, network) => dispatch => {
    axios.post(`/api/users/${user.id}/networks`, network)
        .then(() => {
            dispatch(addMyNetwork_action(user, network));
            dispatch(setCurrentNetwork_action(network));
        })
        .catch(console.error);
}

export const removeNetwork_dispatch = (user, network) => dispatch => {
    axios.delete(`/api/users/${user.id}/networks`, network)
        .then(() => {
            dispatch(removeNetwork_action(network));
        })
        .catch(console.error);
}