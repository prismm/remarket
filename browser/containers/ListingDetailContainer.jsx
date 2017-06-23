import React from 'react';
import { connect } from 'react-redux';
import ListingDetail from '../components/ListingDetail.jsx';

const mapStateToProps = ({user, listing, network}) => {
    return (
            {
            currentListing: listing.currentListing,
            user: user,
            network: network
        }
    )
}

// const mapDispatchToProps = (dispatch) => {
//     return ({

//     })
// }

const ListingDetailContainer = connect(mapStateToProps)(ListingDetail);

export default ListingDetailContainer;