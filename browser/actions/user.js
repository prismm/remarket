/* eslint-disable camelcase */
import axios from 'axios';
import store from '../store.jsx';
import { browserHistory } from 'react-router';

/* ------------   ACTION CREATORS     ------------------ */

const getUser_action = user => ({ type: 'GET_USER', user });
const removeUser_action = () => ({ type: 'REMOVE_USER' });
const editUser_action = changes => ({ type: 'EDIT_USER', changes });

//sets state.browse, not state.user:
const viewUser_action = user => ({ type: 'VIEW_USER', user });
const viewUserListings_action = listings => ({ type: 'VIEW_USER_LISTINGS', listings });
export const messageSent_action = response => ({ type: 'MESSAGE_SENT', response });
export const clearViewUser_action = () => ({ type: 'CLEAR_USER' });
export const setDestination_action = destination => ({ type: 'SET_DESTINATION', destination });
export const interactionSuccess_action = interaction => ({ type: 'SUCCESS', interaction })

/* ------------     DISPATCHERS     ------------------ */
const defaultUser = {};

export const me_dispatch = () => dispatch => {
    return axios.get('/auth/me')
        .then(res => {
            let user = res.data;
            if (user) user.networks = user.networks.filter(network => network.network_affiliations.confirmed);
            dispatch(getUser_action(user || defaultUser))
        })
        .catch(console.error)
}

// export const googleAuth_dispatch = () => dispatch => {
//     return axios.get('/auth/google')
//         .then(res => {
//             console.log("google", res);
//             let user = res.data;
//             if (user) user.networks = user.networks.filter(network => network.network_affiliations.confirmed);
//             dispatch(getUser_action(user || defaultUser))
//         })
//         .catch(console.error)
// }

// export const facebookAuth_dispatch = () => dispatch => {
//     return axios.get('/auth/facebook')
//         .then(res => {
//             let user = res.data;
//             if (user) user.networks = user.networks.filter(network => network.network_affiliations.confirmed);
//             dispatch(getUser_action(user || defaultUser))
//         })
//         .catch(console.error)
// }

export const forgotPassword_dispatch = email => dispatch => {
    return axios.post('/auth/forgotpassword', { email })
        .then(res => {
            console.log('This should not occur', res.data) //should not occur because axios request should only return error status codes (401 or 307)
        })
        .catch(error => {
            dispatch(interactionSuccess_action('Password reset link sent'));
            console.error(error);
            dispatch(getUser_action({ error }));
        })
}

export const resendConfirmLink_dispatch = email => dispatch => {
    return axios.post('/auth/resendconfirmlink', { email })
        .then(res => {
            dispatch(getUser_action(res.data)); //unlikely to occur -- would mean that the user was in fact already confirmed
        })
        .catch(error => {
            dispatch(interactionSuccess_action('Confirmation link sent'));
            console.error(error);
            dispatch(getUser_action({ error })); //the error message will let the user know that the email is on its way.
        })
}

export const viewUser_dispatch = userId => dispatch => {
    return axios.get(`/api/users/${userId}`)
        .then(res => {
            let user = res.data;
            if (user) user.networks = user.networks.filter(network => network.network_affiliations.confirmed);
            dispatch(viewUser_action(user))
        })
        .catch(error =>
            dispatch(viewUser_action({ error })));
}

export const messageUser_dispatch = (sender, receiver, message, subject, listingId) => dispatch => {
    return axios.post('/api/users/msg', { sender, receiver, message, subject, listingId })
        .then(res => {
            dispatch(messageSent_action(res.data))
            dispatch(interactionSuccess_action('Message sent'));
        })
        .catch(error =>
            dispatch(messageSent_action({ error })))
}

export const viewUserListings_dispatch = userId => dispatch => {
    return axios.get(`/api/listings/user/${userId}`)
        .then(res => {
            dispatch(viewUserListings_action(res.data))
        })
        .catch(console.error)
}

export const clearUser_dispatch = () => dispatch => {
    return dispatch(clearViewUser_action());
}

export const auth_dispatch = (email, password, method) => dispatch => {
    let currentDestination = store.getState().browse.destination;
    return axios.post(`/auth/${method}`, { email, password })
        .then(res => {
            let user = res.data;
            if (user) user.networks = user.networks.filter(network => network.network_affiliations.confirmed);
            dispatch(getUser_action(user));
            browserHistory.push(currentDestination); //routes user back to original browse destination
        })
        .catch(error => {
            if (error.response && error.response.status === 307) {
                dispatch(interactionSuccess_action('Account created'));
            }
            dispatch(getUser_action({ error }));
        })
}

export const editUser_dispatch = (userId, changes) => dispatch => {
    if (changes.password) {
        axios.put(`/api/users/pw/${userId}`, changes)
            .then(res => {
                dispatch(editUser_action(res.data));
                dispatch(interactionSuccess_action('Updated password'));
            })
            .catch(console.error);
    } else {
        axios.put(`/api/users/${userId}`, changes)
            .then(res => {
                dispatch(editUser_action(res.data));
                dispatch(interactionSuccess_action('Updated user info'));
            })
            .catch(console.error);
    }
}

export const logout_dispatch = () => dispatch => {
    return axios.post('/auth/logout')
        .then(() => {
            dispatch(removeUser_action());
            browserHistory.push('/login');
            dispatch(interactionSuccess_action('Logged out'));
        })
        .catch(err => console.log(err));
}