/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CSSTransitionGroup from 'react-addons-css-transition-group';
import Button from 'react-md/lib/Buttons';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';
import FileUpload from 'react-md/lib/FileInputs/FileUpload';
import  S3Upload from 'react-s3-uploader/s3upload.js';
const HOST = window.location.protocol.concat('//').concat(window.location.host);

import {storeUploadedPhotos_dispatch} from '../actions/listing';
import UploadedFileCard from './UploadedFileCard.jsx';

//need typecheck and sizemax, error handling

/*----------------------- ImgUpload Component ---------------------------*/

class ImgUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { files: {}, photos: [] };
    this.timeout = null;

    //react-mdl methods
    this.setUpload = this.setUpload.bind(this);
    this.loadStart = this.loadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onUploadFinish = this.onUploadFinish.bind(this);

    //react-mdl abort methods
    this.abort = this.abort.bind(this);
    this.handleListClick = this.handleListClick.bind(this);

    //submit button handler
    this.publishPhotos = this.publishPhotos.bind(this);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  setUpload(upload) {
    this.upload = upload;
    this.props.preprocess(upload, console.error);
  }

  loadStart(file) {
    this.setState({ file });
  }

  handleProgress(file, progress) {
    // The progress event can sometimes happen once more after the abort
    // has been called. So this just a sanity check
    if (this.state.file === file) this.setState({ progress });
    this.props.onProgress(progress, 'PROGRESS')
  }

  onLoad(file, uploadResult) {
    const { name, size, type } = file;
    //checks file type -- must be image
    if (!(type.match(/image/))){
      return this.abort();
    } else {
      this.setState({error: null});
      console.log("WE ARE GETTING HERE!")
      this.myUploader = new S3Upload({
        fileElement: file,
        signingUrl: '/s3/sign',
        accept: 'image/*',
        preprocess: this.props.preprocess,
        onProgress: this.props.onProgress,
        onFinishS3Put: this.onUploadFinish,
        onError: this.props.onError,
        signingUrlMethod: 'GET',
        signingUrlWithCredentials: true,
        uploadRequestHeaders: {'Access-Control-Allow-Origin': '*', 'x-amz-acl': 'public-read'},
        contentDisposition: 'auto',
        server: HOST,
        scrubFilename: (filename) => filename.replace(/[^\w\d_\\.]+/ig, '')
      });
    }
    const files = Object.assign({}, this.state.files);
    files[name] = { name, type, size, uploadResult};
    //checks total size of upload < 8MB
    let totalSize = 0;
    Object.keys(files).map(function(key){totalSize += files[key].size});
    if (totalSize > 8000000){
      return this.abort();
    } else {
      this.setState({error: null})
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.setState({ progress: null });
    }, 2000);
    this.setState({ files, progress: 100 });
    // return this.props.handleUpload(this.state.files);
  }

  abort() {
    this.myUploader && this.myUploader.abortUpload();
    if (this.upload) {
      this.upload.abort();
    }
    this.setState({ file: null, progress: null, error: 'Sorry, files must be images and cannot exceed 8MB in total.' });
  }

  /*Removes an uploaded file if the close IconButton is clicked*/
  handleListClick(event) {
    let target = event.target;
    while (target && target.parentNode) {
      if (target.dataset.name) {
        const files = Object.assign({}, this.state.files);
        delete files[target.dataset.name];
        this.setState({ files });
        return;
      }
      target = target.parentNode;
    }
  }

  onUploadFinish(photo) {
    let newPhoto = {
      link: HOST.concat(photo.publicUrl),
      listingId: 1 //this.props.currentListing.id
  };
    let currentPhotos = this.state.photos;
    currentPhotos.push(newPhoto);
    this.setState({
        photos: currentPhotos
    })
    console.log("Upload finished: " + photo.publicUrl)
  }

  publishPhotos(){
    console.log('PHOTOS ON STATE', this.state.photos)
    return this.props.upload({id: 1}, this.state.photos);
  }

  render() {
    console.log("THIS.STATE", this.state);
    const { files, progress } = this.state;
    const cards = Object.keys(files).map(key => <UploadedFileCard key={key} file={files[key]} />);
    let stats, submit;
    if (typeof progress === 'number') {
      stats = [
        <LinearProgress id="progress" key="progress" value={progress} />,
        <Button raised key="abort" className="abort-upload" label="Stop Upload" onClick={this.abort} />,
      ];
    }

    if (Object.keys(files).length > 0) {
      submit = []
    }

    return (
      <div className="uploaded-pics-container">
        {stats}
        <FileUpload
          id="multiFileUpload"
          multiple
          secondary
          name="mutlipart-file-upload"
          ref={this.setUpload}
          label="Select photos to upload"
          onLoadStart={this.loadStart}
          onProgress={this.handleProgress}
          onLoad={this.onLoad}
        />
        {this.state.error ? <p className="login-error">{this.state.error}</p> : null}
        <CSSTransitionGroup
          component="output"
          className="md-grid"
          transitionName="md-cross-fade"
          transitionEnterTimeout={300}
          transitionLeave={false}
          onClick={this.handleListClick}
        >
          {cards}
        </CSSTransitionGroup>
        <Button raised primary label="Publish Photos" onClick={this.publishPhotos} className="md-cell--12 md-cell--right" />
      </div>
    );
  }
}

ImgUpload.propTypes = {
  currentListing: PropTypes.object.isRequired,
  upload: PropTypes.func.isRequired
};

/*---------------------------------Container------------------------------------*/
const mapState = state => ({
  currentListing: state.listing.currentListing,
  preprocess: function(file, next) {
    console.log('Pre-process: ' + file.name);
    next(file);
  },
  onProgress: function(percent, message) {
      console.log('Upload progress: ' + percent + '% ' + message);
  },
  onFinish: function(signResult) {
      console.log("Upload finished: " + signResult.publicUrl)
  },
  onError: function(message) {
      console.log("Upload error: " + message);
  }
});

const mapDispatch = dispatch => ({
upload: (listing, photos) => dispatch(storeUploadedPhotos_dispatch(listing, photos))
});

export default connect(mapState, mapDispatch)(ImgUpload);
