import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import TimeAgo from './TimeAgo.jsx';

/*------------------- ListingsLink component ----------------------*/
export default function Listing({ listing }) {
    return (
        listing && (
        <div>
            <Link to={`/listings/${listing.id}`}>{listing.name}<p className="listing-list-time-ago"><TimeAgo time={listing.updatedAt} /></p></Link>
        </div>)
    )
}

Listing.propTypes = {
  listing: PropTypes.object.isRequired
};
