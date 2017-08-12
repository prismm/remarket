/* eslint-disable camelcase */
import axios from 'axios';
import { browserHistory } from 'react-router';

/* ------------   ACTION CREATORS     ------------------ */

const getUser_action = user => ({ type: 'GET_USER', user });
const removeUser_action = () => ({ type: 'REMOVE_USER' });
const editUser_action = changes => ({ type: 'EDIT_USER', changes });

//sets state.browse, not state.user:
const viewUser_action = user => ({ type: 'VIEW_USER', user });
const viewUserListings_action = listings => ({ type: 'VIEW_USER_LISTINGS', listings });
export const clearViewUser_action = () => ({ type: 'CLEAR_USER' })

/* ------------     DISPATCHERS     ------------------ */
const defaultUser = {};

export const me_dispatch = () => dispatch => {
    return axios.get('/auth/me')
        .then(res =>
            dispatch(getUser_action(res.data || defaultUser)))
        .catch(console.error)
}

export const forgotPassword_dispatch = email => dispatch => {
    return axios.post('/auth/forgotpassword', { email })
        .then(res => {
            // dispatch(getUser_action(res.data));
            console.log('This should not occur', res.data)
        })
        .catch(error => {
            console.error(error);
            dispatch(getUser_action({ error }));
        })
}

export const viewUser_dispatch = userId => dispatch => {
    return axios.get(`/api/users/${userId}`)
        .then(res => {
            dispatch(viewUser_action(res.data))
        })
        .catch(error =>
            dispatch(viewUser_action({ error })));
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
    return axios.post(`/auth/${method}`, { email, password })
        .then(res => {
            dispatch(getUser_action(res.data));
            browserHistory.push('/home');
        })
        .catch(error =>
            dispatch(getUser_action({ error })));
}

export const editUser_dispatch = (userId, changes) => dispatch => {
    axios.put(`/api/users/${userId}`, changes)
        .then(res => {
            dispatch(editUser_action(res.data));
        })
        .catch(console.error);
}

export const logout_dispatch = () => dispatch => {
    return axios.post('/auth/logout')
        .then(() => {
            dispatch(removeUser_action());
            browserHistory.push('/login');
        })
        .catch(err => console.log(err));
}