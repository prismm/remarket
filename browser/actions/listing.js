/* eslint-disable camelcase */
import axios from 'axios';
import { browserHistory } from 'react-router';

/* ------------   ACTION CREATORS     ------------------ */

const setListings_action = listings => ({ type: 'SET_LISTINGS', listings });
export const setCurrentListing_action = listing => ({ type: 'SET_CURRENT_LISTING', listing });
export const setEditStatus_action = editStatus => ({ type: 'SET_EDIT_STATUS', editStatus });
const setMyListings_action = listings => ({ type: 'SET_MY_LISTINGS', listings });
const createListing_action = listing => ({ type: 'CREATE_LISTING', listing });
const editListing_action = listing => ({ type: 'EDIT_LISTING', listing });
const deleteListing_action = listingId => ({ type: 'DELETE_LISTING', listingId });
export const setLocation_action = location => ({ type: 'SET_LOCATION', location });
const createListingError_action = error => ({ type: 'SET_ERROR', error })

/* ------------       DISPATCHERS     ------------------ */

export const fetchAllListings_dispatch = () => dispatch => {
    return axios.get('/api/listings')
        .then(res => {
            let listings = res.data;
            listings.sort((listing1, listing2) => new Date(listing2.updatedAt) - new Date(listing1.updatedAt));
            listings = listings.filter(listing => listing.status === 'active');
            dispatch(setListings_action(listings));
        })
        .catch(console.error);
}

export const fetchSingleListing_dispatch = listingId => dispatch => {
    return axios.get(`/api/listings/${listingId}`)
        .then(res => {
            dispatch(setCurrentListing_action(res.data));
        })
        .catch(error =>
            dispatch(setCurrentListing_action({ error })));
}

export const clearCurrentListing_dispatch = () => dispatch => {
    return dispatch(setCurrentListing_action(null));
}

export const fetchListingsByUser_dispatch = userId => dispatch => {
    return axios.get(`/api/listings/user/${userId}`)
        .then(res => {
            let listings = res.data;
            listings.sort((listing1, listing2) => new Date(listing2.updatedAt) - new Date(listing1.updatedAt));
            dispatch(setMyListings_action(listings));
        })
        .catch(console.error);
}

export const createListing_dispatch = listing => dispatch => {
    axios.post('/api/listings', listing)
        .then(res => {
            dispatch(createListing_action(res.data));
            browserHistory.push(`/listings/${res.data.id}`);
        })
        .catch(error =>
            dispatch(createListingError_action({ error })))
}

export const editListing_dispatch = (listingId, changes) => dispatch => {
    axios.put(`/api/listings/${listingId}`, changes)
        .then(res => {
            dispatch(editListing_action(res.data));
        })
        .catch(error =>
            dispatch(createListingError_action({ error })))
}

export const deleteListing_dispatch = listing => dispatch => {
    axios.delete(`/api/listings/${listing.id}`)
        .then(res => {
            dispatch(deleteListing_action(+res.data));
        })
        .catch(console.error);
}

export const storeUploadedPhotos_dispatch = (listing, photos) => dispatch => {
    axios.post(`/api/listings/${listing.id}/photos`, photos)
        .then(res => {
            dispatch(setCurrentListing_action(res.data));
        })
        .catch(error =>
            dispatch(setCurrentListing_action({ error })));
}

export const deleteUploadedPhotos_dispatch = (listing, deletedPhotos) => dispatch => {
    axios.put(`/api/listings/${listing.id}/photos`, deletedPhotos)
        .then(res => {
            dispatch(setCurrentListing_action(res.data));
        })
        .catch(error =>
            dispatch(setCurrentListing_action({ error })));
}