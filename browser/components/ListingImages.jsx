import React from 'react';
import { connect } from 'react-redux';
import spinner from '../HOC/Spinner.jsx';
import loadImage from 'blueimp-load-image/js'

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

const ListingImagesWithSpinner =  spinner('photos')(ListingImages);

export default connect(mapState)(ListingImagesWithSpinner);

/* <div className="listing-images md-cell md-cell--5">
{ photos ?
    photos.map(photo => {
        return loadImage(photo.link, function(img){ console.log(img); return img.toString()}, {maxWidth: 600, orientation: true})
        })
    :
    null
}
</div> */