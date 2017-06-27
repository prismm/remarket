import React from 'react';
import { connect } from 'react-redux';
import Listing from '../components/Listing.jsx';
import PropTypes from 'prop-types';

/*------------------- Listings component ----------------------*/
function Listings({listings}) {
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

Listings.propTypes = {
  listings: PropTypes.array
};

/*----------------------- Container ---------------------------*/
const mapStateToProps = ({user, listing, network}) => ({
        listings: listing.listings,
        user: user,
        network: network
    });

export default connect(mapStateToProps)(Listings);