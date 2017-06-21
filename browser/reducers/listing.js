const initialState = {};

const listingReducer = (listing = initialState, action) => {
    switch (action.type) {
        case 'ADD_LISTING':
            return action.listing;
        case 'REMOVE_LISTING':
            return action.listing;
        case 'EDIT_LISTING':
            return action.listing;
        default:
            return listing;
    }
}

export default listingReducer;