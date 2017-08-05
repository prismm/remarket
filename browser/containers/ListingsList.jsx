import React from 'react';
import Listing from './Listing.jsx';
import PropTypes from 'prop-types';
import spinner from '../HOC/Spinner.jsx'

/*------------------- ListingsList component ----------------------*/
function ListingsList({listings, category}) {
    return (
        <div className="listing-container">
            <h2>{category}</h2>
            { listings ?
                listings.map(listing => <Listing listing={listing} key={listing.id} />)
                :
                <div>No listings to display, sorry!</div>
            }
        </div>
    )
}
const ListingsListWithSpinner = spinner('listings')(ListingsList);
export default ListingsListWithSpinner;

ListingsList.propTypes = {
    category: PropTypes.string,
    listings: PropTypes.array
};
