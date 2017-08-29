/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Snackbar } from 'react-toolbox';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { interactionSuccess_action } from '../actions/user'

class SnackbarHOC extends Component {
    constructor(props){
        super(props);
        this.state = {
            active: true
        }
        this.closeSnackbar = this.closeSnackbar.bind(this);
        this.timeout = setTimeout(() => {
            this.timeout = null;
            this.props.clearSuccess();
          }, 3000);
    }

    closeSnackbar(){
        this.props.clearSuccess();
    }

    componentWillUnmount(){
        if (this.timeout) {
            clearTimeout(this.timeout);
          }
        this.props.clearSuccess();
    }

    render () {
      let label = this.props.success + ' successfully.'
      console.log(label); //ok to leave in -- gives user update on action
      return (
        <CSSTransitionGroup
            transitionName="md-cross-fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={150}
        >
                <Snackbar
                    className="snackbar-success"
                    active={this.state.active}
                    label={label}
                />
        </CSSTransitionGroup>
      );
    }
  }

SnackbarHOC.propTypes = {
    success: PropTypes.string.isRequired,
    clearSuccess: PropTypes.func.isRequired
}

/*----------------------- Container --------------------------*/
const mapStateToProps = state => ({
    success: state.browse.success
});

const mapDispatchToProps = dispatch => {
    return {
        clearSuccess: () => dispatch(interactionSuccess_action(null))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarHOC);