import React from 'react';
import { connect } from 'react-redux';
import spinner from '../HOC/Spinner.jsx'

/*----------------------- ListingImages Component ---------------------------*/
function ListingImages({ photos }){
    return (
        <div className="listing-images md-cell md-cell--5">
            { photos ?
                photos.map(photo => <a href={ photo.link }><img className="item-img" key={photo.id} src={ photo.link } /></a>)
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

const ListingImagesWithSpinner =  spinner('photos')(ListingImages);

export default connect(mapState)(ListingImagesWithSpinner);