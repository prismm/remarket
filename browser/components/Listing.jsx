import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

export default function Listing({ listing }) {
    return (
        listing && (
        <div>
            <Link to={`/listings/${listing.id}`}>{listing.name}</Link>
        </div>)
    )
}

Listing.propTypes = {
  listing: PropTypes.object.isRequired
};
