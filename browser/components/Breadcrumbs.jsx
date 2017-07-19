import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

/*------------------- Breadcrumbs component ----------------------*/
export default function Breadcrumbs({ currentListing }) {
    return (
        <div className="listing-detail-breadcrumbs md-cell md-cell--12">
            <Link to="/">breadcrumbs</Link> > here > here > here
        </div>
    )
}

Breadcrumbs.propTypes = {
    currentListing: PropTypes.object.isRequired
}