/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

/*----------------------- Account Component ---------------------------*/
function Account (props) {
    return (
        <div className="md-grid">
            <div className="md-cell md-cell--2">
            <h3> account > </h3>
            <ul className="account-nav">
                <li><Link className="account-nav-link" to="/account">My Profile</Link></li>
                <li><Link className="account-nav-link" to="/account/managenetworks">My Networks</Link></li>
                <li><Link className="account-nav-link" to="/account/managelistings">My Posts</Link></li>
                <li><Link className="account-nav-link" to="/account/manageoffers">Offer History</Link></li>
                <li><Link className="account-nav-link" to="/account/savedlistings">Saved Posts</Link></li>
                {props.user.isAdmin ? <li><Link className="account-nav-link" to="/account/admin-create-user">Admin: Create User</Link></li> : null }
            </ul>
            </div>
            <div className="md-cell md-cell--10">
                { props.children }
            </div>
        </div>
    )
}

Account.propTypes = {
    user: PropTypes.object
};

/*----------------------- Container ---------------------------*/
const mapStateToProps = (state) => ({
        user: state.user,
    });

export default connect(mapStateToProps)(Account);