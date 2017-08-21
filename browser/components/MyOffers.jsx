import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactS3Uploader from 'react-s3-uploader';
import Button from 'react-md/lib/Buttons/Button';

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
        this.onUploadProgress = this.onUploadProgress.bind(this);
        this.onUploadFinish = this.onUploadFinish.bind(this);
        this.onUploadError = this.onUploadError.bind(this);
        this.publishPhotos = this.publishPhotos.bind(this)
    }

    onUploadProgress(){
        this.setState({progressFlag: true})
    }

    onUploadError(err){
        this.setState({error: err})
    }

    onUploadFinish(photo){
        let newPhoto = {
            link: HOST.concat(photo.publicUrl),
            listingId: this.props.currentListing.id
        };
        let currentPhotos = this.state.photos;
        currentPhotos.push(newPhoto);
        this.setState({
            photos: currentPhotos,
            progressFlag: false
        })
    }

    publishPhotos(){
        this.props.upload(this.state.photos);
    }

    render(){
        return (
        <div>
            <ReactS3Uploader
                signingUrl="/s3/sign"
                signingUrlMethod="GET"
                accept="image/*"
                onProgress={this.onUploadProgress}
                onError={this.onUploadError}
                onFinish={this.onUploadFinish}
                signingUrlWithCredentials={ true }      // in case when need to pass authentication credentials via CORS
                uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  // this is the default
                contentDisposition="auto"
                scrubFilename={(filename) => filename.replace(/[^\w\d_\-\.]+/ig, '')}
                server = {HOST}
            />
            <Button raised primary label="Publish Photos" onClick={this.publishPhotos} className="md-cell--12 md-cell--right" />
        </div>
        )
    }
}

/*---------------------------------Container------------------------------------*/
const mapState = state => ({
    currentListing: state.listing.currentListing
});

const mapDispatch = dispatch => ({
  upload: (photos) => dispatch(storeUploadedPhotos_dispatch(photos))
});

export default connect(mapState, mapDispatch)(MyOffers);
