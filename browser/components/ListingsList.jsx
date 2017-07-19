import React from 'react';
import { Link } from 'react-router';
import Listing from './Listing.jsx';
import PropTypes from 'prop-types';
import spinner from '../HOC/Spinner.jsx'

/*------------------- ListingsList component ----------------------*/
function ListingsList({listings, category}) {
const catUrl = category === 'for sale' ? 'for-sale' : category;

    return (
        <div className="md-cell md-cell--4">
            <h2><Link to={`/${catUrl}`}>{category}</Link></h2>
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

export default spinner('listings')(ListingsList);