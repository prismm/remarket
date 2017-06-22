/* eslint-disable camelcase */
import axios from 'axios';
import { browserHistory } from 'react-router';

/* ------------   ACTION CREATORS     ------------------ */

const getUser_action = user => ({ type: 'GET_USER', user });
const removeUser_action = () => ({ type: 'REMOVE_USER' });


/* ------------       DISPATCHERS     ------------------ */
const defaultUser = {};

export const me_dispatch = () => dispatch => {
    axios.get('/auth/me')
        .then(res =>
            dispatch(getUser_action(res.data || defaultUser)))
        .catch(console.error)
}
export const auth_dispatch = (email, password, method) => dispatch => {
    axios.post(`/auth/${method}`, { email, password })
        .then(res => {
            dispatch(getUser_action(res.data));
            browserHistory.push('/home');
        })
        .catch(error =>
            dispatch(getUser_action({ error })));
}

export const logout_dispatch = () =>
    dispatch =>
    axios.post('/auth/logout')
    .then(res => {
        dispatch(removeUser_action());
        browserHistory.push('/login');
    })
    .catch(err => console.log(err));