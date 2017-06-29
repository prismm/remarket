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
        <div>
            <h2>My Account</h2>
            <ul>
                <li><Link className="account-nav-link" to="/account/managenetworks">My Networks</Link></li>
                <li><Link className="account-nav-link" to="/account/manageprofile">Edit Profile</Link></li>
                <li><Link className="account-nav-link" to="/account/managelistings">My Listings</Link></li>
                <li><Link className="account-nav-link" to="/account/manageoffers">Offer History</Link></li>
                <li><Link className="account-nav-link" to="/account/savedlistings">My Saved Listings</Link></li>
            </ul>
            <div>
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