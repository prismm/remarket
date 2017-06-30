import React from 'react'; 
import RenewListing from './RenewListing.jsx'

export default function MySavedListings(){
    const renewListing = () => {};

    return (
        <div>
        <h3>My Saved Listings</h3>
        <RenewListing renewListing={renewListing} expirationDate={new Date()}/>
        </div>
    )
}

