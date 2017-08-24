import React from 'react';
import { connect } from 'react-redux';

/*----------------------- ListingImages Component ---------------------------*/
function ListingImages({ photos }){
    return (
        <div className="listing-images md-cell md-cell--5">
            { photos ?
                photos.map(photo => <img className="item-img" key={photo.id} src={ photo.link } />)
                :
                null
            }
        </div>
    )
}

/*---------------------------------Container------------------------------------*/
const mapState = state => ({
    currentListing: state.listing.currentListing
  });

// const mapDispatch = dispatch => ({
//     upload: (listing, photos) => dispatch(storeUploadedPhotos_dispatch(listing, photos))
//   });

export default connect(mapState)(ListingImages);
