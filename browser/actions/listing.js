/* eslint-disable camelcase */
import axios from 'axios';

/* ------------   ACTION CREATORS     ------------------ */

const getListings_action = listings => ({ type: 'GET_LISTINGS', listings });
const setCurrentListing_action = listing => ({ type: 'SET_CURRENT_LISTING', listing });
const archiveListing_action = listing => ({ type: 'ARCHIVE_LISTING', listing });
const createListing_action = listing => ({ type: 'CREATE_LISTING', listing });
const editListing_action = listing => ({ type: 'EDIT_LISTING', listing });
const deleteListing_action = listingId => ({ type: 'DELETE_LISTING', listingId });


/* ------------       DISPATCHERS     ------------------ */

export const fetchAllListings_dispatch = () => dispatch => {
    axios.get('/api/listings')
        .then(res => {
            dispatch(getListings_action(res.data));
        })
        .catch(console.error);
}

export const fetchSingleListing_dispatch = listingId => dispatch => {
    axios.get(`/api/listings/${listingId}`)
        .then(res => {
            dispatch(setCurrentListing_action(res.data));
        })
        .catch(console.error);
}

export const createListing_dispatch = listing => dispatch => {
    axios.post('/api/listings', listing)
        .then(res => {
            dispatch(createListing_action(res.data));
        })
        .catch(console.error);
}

export const editListing_dispatch = listing => dispatch => {
    axios.put(`/api/listings/${listing.id}`, listing)
        .then(res => {
            dispatch(editListing_action(res.data));
        })
        .catch(console.error);
}

export const deleteListing_dispatch = listingId => dispatch => {
    axios.delete(`/api/listings/${listingId}`)
        .then(res => {
            dispatch(deleteListing_action(+res.data));
        })
        .catch(console.error);
}