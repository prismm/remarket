/* eslint-disable camelcase */
import axios from 'axios';

/* ------------   ACTION CREATORS     ------------------ */

const setActions_action = listingActions => ({ type: 'SET_ACTIONS', listingActions });
const setMyActions_action = myActions => ({ type: 'SET_MY_ACTIONS', myActions });
const addComment_action = comment => ({ type: 'ADD_COMMENT', comment });
const deleteComment_action = commentId => ({ type: 'DELETE_COMMENT', commentId });
const editComment_action = comment => ({ type: 'EDIT_COMMENT', comment });
const addOffer_action = offer => ({ type: 'ADD_OFFER', offer });
const revokeOffer_action = offerId => ({ type: 'REVOKE_OFFER', offerId });
const editOffer_action = offer => ({ type: 'EDIT_OFFER', offer });
const savePost_action = save => ({ type: 'SAVE_POST', save });
const unsavePost_action = saveId => ({ type: 'UNSAVE_POST', saveId });
const setMySaves_action = mySaves => ({ type: 'SET_MY_SAVES', mySaves });
const addEndorsement_action = endorse => ({ type: 'ADD_ENDORSEMENT', endorse });
const removeEndorsement_action = endorseId => ({ type: 'REMOVE_ENDORSEMENT', endorseId });

//sets state.browse, not state.action:
export const interactionSuccess_action = interaction => ({ type: 'SUCCESS', interaction })

/* ------------       DISPATCHERS     ------------------ */

export const fetchListingActions_dispatch = listingId => dispatch => {
    return axios.get(`/api/actions/listing/${listingId}`)
        .then(res => {
            let actions = res.data;
            dispatch(setActions_action(actions));
        })
        .catch(console.error);
}

export const clearListingActions_dispatch = () => dispatch => {
    dispatch(setActions_action([]))
}

export const fetchMyActions_dispatch = userId => dispatch => {
    return axios.get(`/api/actions/user/${userId}`)
        .then(res => {
            dispatch(setMyActions_action(res.data));
        })
        .catch(error =>
            dispatch(setMyActions_action({ error })));
}

export const addComment_dispatch = comment => dispatch => {
    return axios.post('/api/actions/comments', comment)
        .then(res => {
            dispatch(addComment_action(res.data));
            dispatch(interactionSuccess_action('Comment added'));
        })
        .catch(console.error);
}

export const editComment_dispatch = (commentId, changes) => dispatch => {
    return axios.put(`/api/actions/comments/${commentId}`, changes)
        .then(res => {
            dispatch(editComment_action(res.data));
            dispatch(interactionSuccess_action('Comment updated'));
        })
        .catch(console.error)
}

export const deleteComment_dispatch = commentId => dispatch => {
    return axios.delete(`/api/actions/comments/${commentId}`)
        .then(() => {
            dispatch(deleteComment_action(commentId));
            dispatch(interactionSuccess_action('Comment erased'));
        })
        .catch(console.error)
}

export const addOffer_dispatch = offer => dispatch => {
    return axios.post('/api/actions/offers', offer)
        .then(res => {
            dispatch(addOffer_action(res.data));
            dispatch(interactionSuccess_action('Offer added'));
        })
        .catch(console.error);
}

export const revokeOffer_dispatch = offerId => dispatch => {
    return axios.delete(`/api/actions/offers/${offerId}`)
        .then(() => {
            dispatch(revokeOffer_action(offerId));
            dispatch(interactionSuccess_action('Offer revoked'));
        })
        .catch(console.error)
}

export const editOffer_dispatch = (offerId, changes) => dispatch => {
    return axios.put(`/api/actions/offers/${offerId}`, changes)
        .then(res => {
            dispatch(editOffer_action(res.data));
            dispatch(interactionSuccess_action('Offer updated'));
        })
        .catch(console.error)
}

export const addSave_dispatch = save => dispatch => {
    return axios.post('/api/actions/saves', save)
        .then(res => {
            dispatch(savePost_action(res.data));
            dispatch(interactionSuccess_action('Post saved'));
        })
        .catch(console.error);
}

export const unsave_dispatch = saveId => dispatch => {
    return axios.delete(`/api/actions/saves/${saveId}`)
        .then(() => {
            dispatch(unsavePost_action(saveId));
        })
        .catch(console.error)
};

export const fetchMySaves_dispatch = userId => dispatch => {
    return axios.get(`/api/actions/saves/user/${userId}`)
        .then(res => {
            dispatch(setMySaves_action(res.data));
        })
        .catch(error =>
            dispatch(setMySaves_action({ error })));
}

export const addEndorsement_dispatch = endorse => dispatch => {
    return axios.post('/api/actions/endorsements', endorse)
        .then(res => {
            dispatch(addEndorsement_action(res.data));
            dispatch(interactionSuccess_action('Post endorsed'));
        })
        .catch(console.error);
}

export const unendorse_dispatch = endorseId => dispatch => {
    return axios.delete(`/api/actions/endorsements/${endorseId}`)
        .then(() => {
            dispatch(removeEndorsement_action(endorseId));
        })
        .catch(console.error)
};