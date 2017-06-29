/* eslint-disable camelcase */
import axios from 'axios';
import { browserHistory } from 'react-router';

/* ------------   ACTION CREATORS     ------------------ */

const setListings_action = listings => ({ type: 'SET_LISTINGS', listings });
const setCurrentListing_action = listing => ({ type: 'SET_CURRENT_LISTING', listing });
const setMyListings_action = listings => ({ type: 'SET_MY_LISTINGS', listings });
const archiveListing_action = listing => ({ type: 'ARCHIVE_LISTING', listing });
const createListing_action = listing => ({ type: 'CREATE_LISTING', listing });
const editListing_action = listing => ({ type: 'EDIT_LISTING', listing });
const deleteListing_action = listingId => ({ type: 'DELETE_LISTING', listingId });


/* ------------       DISPATCHERS     ------------------ */

export const fetchAllListings_dispatch = () => dispatch => {
    return axios.get('/api/listings')
        .then(res => {
            dispatch(setListings_action(res.data));
        })
        .catch(console.error);
}

export const fetchSingleListing_dispatch = listingId => dispatch => {
    return axios.get(`/api/listings/${listingId}`)
        .then(res => {
            dispatch(setCurrentListing_action(res.data));
        })
        .catch(console.error);
}

export const fetchListingsByUser_dispatch = userId => dispatch => {
    return axios.get(`/api/listings/user/${userId}`)
        .then(res => {
            dispatch(setMyListings_action(res.data));
        })
        .catch(console.error);
}

export const createListing_dispatch = listing => dispatch => {
    axios.post('/api/listings', listing)
        .then(res => {
            dispatch(createListing_action(res.data));
            console.log("RES DATA", res.data)
            browserHistory.push(`/listings/${res.data.id}`);
        })
        .catch(console.error);
}

export const editListing_dispatch = (listingId, changes) => dispatch => {
    axios.put(`/api/listings/${listingId}`, changes)
        .then(res => {
            dispatch(editListing_action(res.data));
        })
        .catch(console.error);
}

export const deleteListing_dispatch = listing => dispatch => {
    axios.delete(`/api/listings/${listing.id}`)
        .then(res => {
            dispatch(deleteListing_action(+res.data));
        })
        .catch(console.error);
}