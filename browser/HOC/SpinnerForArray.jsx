import React, { Component } from 'react';
import './spinner.scss';

/*------------------- Higher Order Component: Spinner ----------------------*/

const isEmpty = (prop) => (
  prop === null ||
  prop === undefined ||
  (prop.hasOwnProperty('length') && prop.length === 0) || //<--checks if prop is an array with length = 0;
  (prop.constructor === Object && Object.keys(prop).length === 0)
);

const Spinner = (loadingProp) => (WrappedComponent) => {
  return class LoadingHOC extends Component {
    render() {
      return isEmpty(this.props[loadingProp]) ? <div className="loader" /> : <WrappedComponent {...this.props} />;
    }
  }
}


export default Spinner;