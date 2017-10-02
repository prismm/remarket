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
export const createListingError_action = error => ({ type: 'SET_ERROR', error })

//sets state.browse, not state.listing:
export const interactionSuccess_action = interaction => ({ type: 'SUCCESS', interaction })

/* ------------       DISPATCHERS     ------------------ */


export const fetchPageViews_dispatch = listingId => {
    return axios.get(`/api/listings/googleanalytics/${listingId}`)
        .then(res => {
            console.log(res.data);
            let pageViewsArr = res.data;
            if (pageViewsArr.length && pageViewsArr[1]) {
                return Number(pageViewsArr[1]);
            } else {
                return 0;
            }
        })
        .catch(console.error);
}
export const fetchAllListings_dispatch = () => dispatch => {
    return axios.get('/api/listings')
        .then(res => {
            let listings = res.data;
            listings.sort((listing1, listing2) => new Date(listing2.updatedAt) - new Date(listing1.updatedAt));
            // listings = listings.filter(listing => listing.status === 'active'); commented out to prevent home page from empty
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
            dispatch(interactionSuccess_action('Post created'));
            browserHistory.push(`/listings/${res.data.id}`);
        })
        .catch(error =>
            dispatch(createListingError_action({ error })))
}

export const editListing_dispatch = (listingId, changes) => dispatch => {
    axios.put(`/api/listings/${listingId}`, changes)
        .then(res => {
            dispatch(editListing_action(res.data));
            dispatch(interactionSuccess_action('Post updated'));
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

export const flagListing_dispatch = (listingId, user) => dispatch => {
    return axios.post('/api/users/contact', { replyToEmail: user.email, message: 'user ' + user.id + ' flagged listing ' + listingId, subject: 'FLAGGED LISTING' })
        .then(() => {
            dispatch(interactionSuccess_action('Post flagged'));
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