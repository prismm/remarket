import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
// import { connect } from 'react-redux';
import LinearProgress from 'react-md/lib/Progress/LinearProgress';
import FileInput from 'react-md/lib/FileInputs';

// import { addNotification } from '../actions/notifications';

// @connect(() => ({}), { addNotification })
export default class FileUpload extends Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.interval = null;
    this.timeout = null;
  }

  componentWillUnmount() {
    if (this.interval) { clearInterval(this.interval); }
    if (this.timeout) { clearTimeout(this.timeout); }
  }

  startProgress(file) {
    if (!file || typeof this.state.progress === 'number') { return; }
    // pretend it always takes 6 seconds to upload a file
    const update = 20;
    const increment = 100 / (6000 / update);
    this.interval = setInterval(() => {
      const progress = Math.min(this.state.progress + increment, 100);
      if (progress >= 100) {
        clearInterval(this.interval);
        this.interval = null;
        // this.props.addNotification({ text: `You have uploaded '${file.name}'` });
        this.timeout = setTimeout(() => {
          this.timeout = null;
          this.setState({ progress: null });
        }, 2000);
      }
      this.setState({ progress });
    }, update);
    this.setState({ progress: 0 });
  }

  render() {
    const { progress } = this.state;
    return (
      <CSSTransitionGroup
        component="div"
        transitionName="opacity"
        transitionEnterTimeout={150}
        transitionLeaveTimeout={150}
      >
        {typeof progress === 'number' && <LinearProgress value={progress} />}
        <FileInput id="fileUpload" onChange={this.startProgress} label="Upload Photo" />
      </CSSTransitionGroup>
    );
  }
}