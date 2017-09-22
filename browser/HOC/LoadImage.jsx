import React, { Component } from 'react'
import loadImage from './blueimp-load-image/js'

class AutoRotateImage extends Component {
    loadImage() {
      const url = this.props.src;
      loadImage(
        url,
        (img) => {
          if (img.type === 'error') {
            console.log('Error loading image ' + url);
          } else {
            if (this.refs && this.refs.container){this.refs.container.appendChild(img)};
          }
        },
        {
          orientation: true,
          contain: true
        }
      )
    }

    componentDidMount() {
      this.loadImage();
    }

    componentDidUpdate() {
      this.refs.container.removeChild(this.refs.container.firstChild);
      this.loadImage();
    }

    render() {
      const { src } = this.props;
      return (
        <div ref="container" className="item-img" />
      );
    }
  }

  export default AutoRotateImage;
  