const initialState = {
    listings: [],
    currentListing: {}
};

const listingReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case 'GET_LISTINGS':
            newState.listings = action.listings;
            break;
        case 'SET_CURRENT_LISTING':
        case 'ARCHIVE_LISTING':
            newState.currentListing = action.listing;
            break;
        case 'CREATE_LISTING':
            newState.listings = [action.listing, ...newState.listings];
            newState.currentListing = action.listing;
            break;
        case 'EDIT_LISTING':
            newState.listings.map(listing => (listing.id === action.listing.id ? action.listing : listing));
            break;
        case 'DELETE_LISTING':
            newState.listings = newState.listings.filter(listing => (listing.id !== action.listingId));
            break;
        default:
            break;
    }
    return newState;
}

export default listingReducer;