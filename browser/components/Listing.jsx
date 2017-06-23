import React from 'react';
import { Link } from 'react-router';

export default function Listing({ listing }) {
    return (
        listing && (
        <div>
            <Link to={`/listings/${listing.id}`}>{listing.name}</Link>
        </div>)
    )
}
