/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

/*----------------------- Account Component ---------------------------*/
class Account extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
        <div className="md-grid">
            <div className="md-cell md-cell--2">
            <h3> account > </h3>
            <ul className="account-nav">
                <li><Link className="account-nav-link" to="/account">My Profile</Link></li>
                <li><Link className="account-nav-link" to="/account/managelistings">My Listings</Link></li>
                <li><Link className="account-nav-link" to="/account/manageoffers">Offer History</Link></li>
                <li><Link className="account-nav-link" to="/account/savedlistings">My Saved Listings</Link></li>
            </ul>
            </div>
            <div className="md-cell md-cell--10">
                {this.props.children}
            </div>
        </div>
        )
    }
}

Account.propTypes = {
    user: PropTypes.object.isRequired
};

/*----------------------- Container ---------------------------*/
const mapStateToProps = (state) => ({
        user: state.user,
    });

export default connect(mapStateToProps)(Account);