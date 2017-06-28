import React from 'react';
import Listing from './Listing.jsx';
import PropTypes from 'prop-types';

/*------------------- ListingsList component ----------------------*/
export default function ListingsList({listings}) {
    return (
        <div className="listing-container">
            { listings ?
                listings.map(listing => <Listing listing={listing} key={listing.id} />)
                :
                <div>No listings to display, sorry!</div>
            }
        </div>
    )
}

ListingsList.propTypes = {
  listings: PropTypes.array
};
