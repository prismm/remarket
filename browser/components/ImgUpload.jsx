/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import spinner from '../HOC/Spinner.jsx'
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Button from 'react-md/lib/Buttons';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';
import FileUpload from 'react-md/lib/FileInputs/FileUpload';
import S3Upload from '../S3Upload/s3upload.js';
const HOST = window.location.protocol.concat('//').concat(window.location.host);

import {storeUploadedPhotos_dispatch, deleteUploadedPhotos_dispatch} from '../actions/listing';
import UploadedFileCard from './UploadedFileCard.jsx';

/*----------------------- ImgUpload Component ---------------------------*/

class ImgUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null, //should hold the individual file being uploaded
      files: {}, //stored here for UI purposes
      photos: props.photos || [], //stores photo objects with AWS S3 links for dispatch to database upon submit
      deletePhotos: [],
      error: null,
      progress: null
      // photoIndex: props.photos && props.photos.length ? props.photos[props.photos.lastIndexOf()].index : 1
    };
    this.timeout = null; //set by onUploadFinish to clear progress bar
    this.upload = null; //set by setUpload function as reference for file input, preprocessing
    // this.photoIndex = 1;

    //upload lifecycle methods, in order
    this.setUpload = this.setUpload.bind(this); //sets this.upload as ref for file input, proprocessing, aborting
    this.loadStart = this.loadStart.bind(this); //sets this.state.error = null, and this.state.file (to what end?)
    this.handleProgress = this.handleProgress.bind(this); //sets progress from S3Upload for progress bar
    this.onLoad = this.onLoad.bind(this); //this.abort() if error or !image; checks totalSize > 8mb and if so this.abort(), else initiates S3Upload requests and adds file to this.state.files
    this.onUploadFinish = this.onUploadFinish.bind(this); //creates photo obj for db dispatch using response from AWS S3, adds to this.state.photos array, sets progress to 100% then clears progress

    //abort & stop methods
    this.onError = this.onError.bind(this); //invoked by S3Upload if there is an error; passes error message to this.abort() to abort
    this.abort = this.abort.bind(this); //aborts HTTP request to AWS S3, aborts upload of file ref for file input on UI, sets this.state({progress: null, file: null, error})
    this.checkForError = this.checkForError.bind(this); // on react upload, the progress event can sometimes happen once more after the abort has been called -- so this just a sanity check
    this.handleListClick = this.handleListClick.bind(this); // removes an uploaded file from this.state.files and this.state.photos if the close button is clicked

    //submit button handler
    this.publishPhotos = this.publishPhotos.bind(this);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  setUpload(upload, next) {
    if (!next) next = console.log;
    this.upload = upload;
    this.props.preprocess(upload, next);
  }

  loadStart(file) {
    this.setState({ file, error: null });
  }

  handleProgress(percent, message){
    console.log('Upload progress: ' + percent + '% ' + message);
    this.setState({ progress: percent });
  }

  checkForError (file, progress) {
    // The progress event can sometimes happen once more after the abort has been called. So this just a sanity check
    if (this.state.error) return this.abort(this.state.error);
  }

  onError(errorMessage){
    this.props.onError(errorMessage);
    return this.abort(errorMessage);
  }

  onLoad(file, uploadResult) {
    const { name, size, type } = file;
    //checks file type -- must be image
    if (this.state.error){
      return this.abort(this.state.error);
    } else if (!(type.match(/image/))) {
      return this.abort('Sorry, you can only upload images.')
    } else {
        const files = Object.assign({}, this.state.files); //copies this.state.files
        files[name] = { name, type, size, uploadResult}; //adds new file to files with name as key
        //checks total size of upload < 8MB
        let totalSize = 0;
        Object.keys(files).map(function(key){totalSize += files[key].size});
        if (totalSize > 8000000){
          return this.abort('Sorry, the upload was stopped. Please note that files cannot exceed 8MB in total size.');
        } else {
          this.setState({ file, files }); //sets this.state.files to new obj which includes new file //SETS THIS.STATE.FILE     
          this.myUploader = new S3Upload({ //initiates S3Upload requests
            fileElement: file,
            signingUrl: '/s3/sign',
            accept: 'image/*',
            preprocess: this.setUpload,
            onProgress: this.handleProgress,
            onFinishS3Put: this.onUploadFinish,
            onError: this.onError,
            signingUrlMethod: 'GET',
            signingUrlWithCredentials: true,
            uploadRequestHeaders: {'Access-Control-Allow-Origin': '*', 'x-amz-acl': 'public-read'},
            contentDisposition: 'auto',
            server: HOST,
            scrubFilename: (filename) => filename.replace(/[^\w\d_\\.]+/ig, '')
          });
        }
    }
  }

  onUploadFinish(photo, file) {
    //creates photo obj for db using response from AWS S3, adds to this.state.photos array
    let newPhoto = {
      link: HOST.concat(photo.publicUrl),
      listingId: this.props.currentListing.id,
      name: file.name
      // index: this.state.photoIndex
    };
    // this.setState(this.photoIndex++;
    let currentPhotos = this.state.photos;
    currentPhotos.push(newPhoto);
    this.setState({
        photos: currentPhotos,
        progress: 100
    })
    //sets progress to 100% and then times out after 1 sec so progress bar disappears
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.setState({ progress: null });
    }, 1000);
    console.log('Upload finished: ' + photo.publicUrl)
  }

  abort(errorMsg) {
    if (!errorMsg) errorMsg = 'Sorry, the upload was stopped. Please note that files must be images and cannot exceed 8MB in total size.';
    this.myUploader && this.myUploader.abortUpload(); //aborts HTTP request to AWS S3
    if (this.upload && this.upload.abort){
      this.upload.abort();
    } //aborts upload of file ref for file input on UI
    this.setState({ file: null, progress: null, error: errorMsg }); //SETS THIS.STATE.FILE
  }

  handleListClick(event) {
    let target = event.target;
    while (target && target.parentNode) {
      if (target.dataset.name) {
        let targetName = target.dataset.name
        //removes clicked file from this.state.files
        const files = Object.assign({}, this.state.files);
        delete files[targetName];
        //removes clicked file from this.state.photos
        const deletePhotos = this.state.photos.filter(photo => photo.name === targetName )
        const photos  = this.state.photos.filter(photo => photo.name !== targetName )
        this.setState({ files, photos, deletePhotos });
        return;
      }
      target = target.parentNode;
    }
  }

  publishPhotos(){
    this.props.upload(this.props.currentListing, this.state.photos);
    this.props.deletePhotos(this.props.currentListing, this.state.deletePhotos);
    this.props.onPublishPhotoClick();
  }

  render() {
    const { files, photos, progress } = this.state;
    const cards = photos.length ? photos.map(photo => <UploadedFileCard key={photo.name} photo={photo} />) : null;
    // Object.keys(files).map(key => <UploadedFileCard key={key} file={files[key]} />);
    let stats, submit;
    if (typeof progress === 'number') {
      stats = [
        <LinearProgress id="progress" key="progress" value={progress} />,
        <Button raised key="abort" className="abort-upload" label="Stop Upload" onClick={() => this.abort('Upload stopped.')} />,
      ];
    }

    if (photos.length > 0) submit = [];
    // if (Object.keys(files).length > 0) submit = []

    return (
      this.props.currentListing && (
        <div className="uploaded-pics-container">
        {stats}
        <FileUpload
          id="multiFileUpload"
          multiple
          secondary
          name="mutlipart-file-upload"
          accept="image/*"
          maxSize = {4000000}
          onError = {(file, error, event) => {return this.onError(error)}}
          onSizeError = {() => this.abort('Sorry, the upload was stopped. Please note that individual files cannot exceed 4MB in total size.')}
          ref={this.setUpload}
          label="Select photos to upload"
          onLoadStart={this.loadStart}
          onProgress={this.checkForError}
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
        {this.state.photos && this.state.photos.length ? <Button raised primary label="Publish Photos" onClick={this.publishPhotos} className="md-cell--12 md-cell--right" /> : null}
      </div>
      )
    );
  }
}

ImgUpload.propTypes = {
  currentListing: PropTypes.object.isRequired,
  upload: PropTypes.func.isRequired,
  onPublishPhotoClick: PropTypes.func.isRequired,
  photos: PropTypes.array,
  preprocess: PropTypes.func,
  onProgress: PropTypes.func, 
  onFinish: PropTypes.func,
  onError: PropTypes.func
};

/*---------------------------------Container------------------------------------*/
const mapState = state => ({
  currentListing: state.listing.currentListing,
  preprocess: function(file, next) {
    file && console.log('Pre-process: ' + file.name);
    next(file);
  },
  onProgress: function(percent, message) {
      console.log('Upload progress: ' + percent + '% ' + message);
  },
  onFinish: function(signResult) {
      console.log('Upload finished: ' + signResult.publicUrl)
  },
  onError: function(message) {
      console.log('Upload error: ' + message);
  }
});

const mapDispatch = dispatch => ({
  upload: (listing, photos) => dispatch(storeUploadedPhotos_dispatch(listing, photos)),
  deletePhotos: (listing, photos) => dispatch(deleteUploadedPhotos_dispatch(listing, photos))
});

const ImgUploadWithSpinner =  spinner('currentListing')(ImgUpload);
export default connect(mapState, mapDispatch)(ImgUploadWithSpinner);
