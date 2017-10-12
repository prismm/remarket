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
            // img = this.convertCanvasToImage(img);
            if (this.refs && this.refs.container){this.refs.container.appendChild(img)};
          }
        },
        {
          orientation: true,
          contain: true
        }
      )
    }

    // Converts canvas to an image
    convertCanvasToImage(canvas) {
      console.log('this is happening now')
      var image = new Image();
      image.src = canvas.toDataURL("image/png");
      image.classList.add('contain-image');
      return image;
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
  