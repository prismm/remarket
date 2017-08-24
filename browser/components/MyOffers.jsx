import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactS3Uploader from 'react-s3-uploader';
import Button from 'react-md/lib/Buttons/Button';
import PropTypes from 'prop-types';

import {storeUploadedPhotos_dispatch} from '../actions/listing';

const HOST = window.location.protocol.concat('//').concat(window.location.host);

/*----------------------- MyOffers Component ---------------------------*/
class MyOffers extends Component {
    constructor(props){
        super(props);
        this.state = {
            progressFlag: false,
            error: null,
            photos: []
        }
        // this.onUploadProgress = this.onUploadProgress.bind(this);
        // this.onUploadFinish = this.onUploadFinish.bind(this);
        // this.onUploadError = this.onUploadError.bind(this);
        // this.publishPhotos = this.publishPhotos.bind(this)
    }

    // onUploadProgress(){
    //     this.setState({progressFlag: true})
    // }

    // onUploadError(err){
    //     this.setState({error: err})
    // }

    // onUploadFinish(photo){
    //     let newPhoto = {
    //         link: HOST.concat(photo.publicUrl),
    //         listingId: this.props.currentListing.id
    //     };
    //     let currentPhotos = this.state.photos;
    //     currentPhotos.push(newPhoto);
    //     this.setState({
    //         photos: currentPhotos,
    //         progressFlag: false
    //     })
    // }

    // publishPhotos(){
    //     console.log('PHOTOS ON STATE', this.state.photos)
    //     this.props.upload(this.props.currentListing, this.state.photos);
    // }

    render(){
        return (
        <div>
            <h3>My Offers</h3>
        </div>
        )
    }
}

MyOffers.propTypes = {
    currentListing: PropTypes.object.isRequired,
    upload: PropTypes.func.isRequired
  };

/*---------------------------------Container------------------------------------*/
const mapState = state => ({
    currentListing: state.listing.currentListing
});

const mapDispatch = dispatch => ({
  upload: (listing, photos) => dispatch(storeUploadedPhotos_dispatch(listing, photos))
});

export default connect(mapState, mapDispatch)(MyOffers);
