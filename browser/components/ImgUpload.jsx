import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Button from 'react-md/lib/Buttons';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';
import FileUpload from 'react-md/lib/FileInputs/FileUpload';

import UploadedFileCard from './UploadedFileCard.jsx';

//need typecheck and sizemax, error handling
export default class ImgUpload extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { files: {} };
    this.timeout = null;
    this.onLoad = this.onLoad.bind(this);
    this.setFile = this.setFile.bind(this);
    this.setUpload = this.setUpload.bind(this);
    this.abortUpload = this.abortUpload.bind(this);
    this.handleListClick = this.handleListClick.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  setUpload(upload) {
    this.upload = upload;
  }

  onLoad(file, uploadResult) {
    const { name, size, type } = file;
    //checks file type -- must be image
    if (!(type.match(/image/))){
      return this.abortUpload();
    } else {
      this.setState({error: null})
    }

    const files = Object.assign({}, this.state.files);
    files[name] = { name, type, size, uploadResult};
    //checks total size of upload < 8MB
    let totalSize = 0;
    Object.keys(files).map(function(key){totalSize += files[key].size});
    if (totalSize > 8000000){
      return this.abortUpload();
    } else {
      this.setState({error: null})
    }


    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.setState({ progress: null });
    }, 2000);
    this.setState({ files, progress: 100 });
  }

  setFile(file) {
    this.setState({ file });
  }

  handleProgress(file, progress) {
    // The progress event can sometimes happen once more after the abort
    // has been called. So this just a sanity check
    if (this.state.file === file) this.setState({ progress });
  }

  abortUpload() {
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

  render() {
    console.log("THIS.STATE", this.state);
    const { files, progress } = this.state;
    const cards = Object.keys(files).map(key => <UploadedFileCard key={key} file={files[key]} />);
    let stats, submit;
    if (typeof progress === 'number') {
      stats = [
        <LinearProgress id="progress" key="progress" value={progress} />,
        <Button raised key="abort" className="abort-upload" label="Stop Upload" onClick={this.abortUpload} />,
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
          onLoadStart={this.setFile}
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
      </div>
    );
  }
}

