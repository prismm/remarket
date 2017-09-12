import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TimeAgo from './TimeAgo.jsx';

/*------------------- ListingsLink component ----------------------*/
function Listing({ listing, currentNetwork }) {
    let networkColoring = '';
    if (currentNetwork && currentNetwork.id === 1) networkColoring = 'columbia-selected';
    if (currentNetwork && currentNetwork.id === 2) networkColoring = 'nyu-selected';
    return (
        listing && (
        <div>
            <Link className={networkColoring} to={`/listings/${listing.id}`}>{listing.name}<p className="listing-list-time-ago"><TimeAgo time={listing.updatedAt} /></p></Link>
        </div>)
    )
}

Listing.propTypes = {
  listing: PropTypes.object.isRequired
};
/*------------------- Container ----------------------*/

const mapState = state => ({
    currentNetwork: state.network.currentNetwork
  });

export default connect(mapState)(Listing);
