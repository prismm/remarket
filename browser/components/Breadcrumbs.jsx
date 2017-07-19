import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

/*------------------- Breadcrumbs component ----------------------*/
export default function Breadcrumbs({ currentListing }) {
    const catUrl = currentListing.category === 'for sale' ? 'for-sale' : currentListing.category;
    return (
        <div className="listing-detail-breadcrumbs md-cell md-cell--12">
            <Link to="/">listings</Link> > <Link to={`/${catUrl}`}>{currentListing.category}</Link> >
        </div>
    )
}

Breadcrumbs.propTypes = {
    currentListing: PropTypes.object.isRequired
}