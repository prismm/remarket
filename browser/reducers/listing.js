/*------------------- managing state.listing ----------------------*/
const initialState = {
    listings: [],
    myListings: null, //initialized to null, instead of [], so that spinner can work on myListings view -- not sure if this is good practice
    currentListing: {},
    location: null,
    error: null
};

const listingReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case 'SET_LISTINGS':
            newState.listings = action.listings;
            break;
        case 'SET_MY_LISTINGS':
            newState.myListings = action.listings;
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
            newState.listings = newState.listings.map(listing => (listing.id === action.listing.id ? action.listing : listing));
            // newState.myListings = newState.myListings.map(listing => (listing.id === action.listing.id ? action.listing : listing)); got typeerror, cannot do map on undefined, was messing up edit listing, currently not using this field in state so just commented out
            newState.currentListing = action.listing;
            break;
        case 'DELETE_LISTING':
            newState.listings = newState.listings.filter(listing => (listing.id !== action.listingId));
            break;
        case 'SET_LOCATION':
            newState.location = action.location;
            break;
        case 'SET_EDIT_STATUS':
            newState.currentListing.editStatus = action.editStatus;
            break;
        case 'SET_ERROR':
            newState.error = action.error;
            break;
        default:
            break;
    }
    return newState;
}

export default listingReducer;