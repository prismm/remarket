import React from 'react';
import Listing from './Listing.jsx';
import PropTypes from 'prop-types';

/*------------------- ListingsList component ----------------------*/
export default function ListingsList({listings, category}) {
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

ListingsList.propTypes = {
    category: PropTypes.string,
    listings: PropTypes.array
};
