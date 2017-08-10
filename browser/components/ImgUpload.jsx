import React, { PureComponent } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Button from 'react-md/lib/Buttons';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';
import FileUpload from 'react-md/lib/FileInputs/FileUpload';
import FontIcon from 'react-md/lib/FontIcons';

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
    const files = Object.assign({}, this.state.files);
    files[name] = { name, type, size, uploadResult};
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
    this.setState({ file: null, progress: null });
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
    const { files, progress } = this.state;
    const cards = Object.keys(files).map(key => <UploadedFileCard key={key} file={files[key]} />);
    let stats;
    if (typeof progress === 'number') {
      stats = [
        <LinearProgress id="progress" key="progress" value={progress} />,
        <Button raised key="abort" className="abort-upload" label="Stop Upload" onClick={this.abortUpload} />,
      ];
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

