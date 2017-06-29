/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

import AddNetwork from './AddNetwork.jsx'
import { UpdateNameButton, UpdateUsernameButton, UpdateBioButton, UpdateEmailButton, UpdatePasswordButton } from '../components/Buttons.jsx'

import { fetchListingsByUser_dispatch } from '../actions/listing';
import { editUser_dispatch } from '../actions/user';


import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

/*----------------------- Profile Component ---------------------------*/
class Profile extends Component {
    constructor(props){
        super(props);
    }

    // componentDidMount(){
    //     this.props.getMyListings(this.props.user.id);
    // }

    render(){
        return (
            <div className="md-grid">
            <div className="md-cell">
                <AddNetwork />
            </div>
            <div className="md-cell">
                <DataTable plain>
                    <TableHeader>
                    <TableRow>
                        <TableColumn>PUBLIC PROFILE</TableColumn>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow key={1}>
                            <TableColumn>name</TableColumn>
                            <TableColumn>{this.props.user.name}</TableColumn>
                            <TableColumn><UpdateNameButton updateName={this.props.updateName} currentUser={this.props.user} /></TableColumn>
                        </TableRow>
                        <TableRow key={2}>
                            <TableColumn>user name</TableColumn>
                            <TableColumn>{this.props.user.username ? this.props.user.username : this.props.user.userId}</TableColumn>
                            <TableColumn><UpdateUsernameButton updateUsername={this.props.updateUsername} currentUser={this.props.user} /></TableColumn>
                        </TableRow>
                        <TableRow key={3}>
                            <TableColumn>bio</TableColumn>
                            <TableColumn></TableColumn>
                            <TableColumn><UpdateBioButton updateBio={this.props.updateBio} currentUser={this.props.user} /></TableColumn>
                        </TableRow>
                    </TableBody>
                </DataTable>
            </div>
            <div className="md-cell">
                <DataTable plain>
                    <TableHeader>
                    <TableRow>
                        <TableColumn>PRIVATE INFORMATION</TableColumn>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow key={1}>
                            <TableColumn>email address</TableColumn>
                            <TableColumn>{this.props.user.email}</TableColumn>
                            <TableColumn><UpdateEmailButton updateEmail={this.props.updateEmail} currentUser={this.props.user} /></TableColumn>
                        </TableRow>
                        <TableRow key={2}>
                            <TableColumn>password</TableColumn>
                            <TableColumn>[hidden]</TableColumn>
                            <TableColumn><UpdatePasswordButton updatePassword={this.props.updatePassword} currentUser={this.props.user} /></TableColumn>
                        </TableRow>
                    </TableBody>
                </DataTable>
            </div>
        </div>
        )
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    updateName: PropTypes.func,
    updateUsername: PropTypes.func,
    updateBio: PropTypes.func,
    updateEmail: PropTypes.func,
    updatePassword: PropTypes.func
};

/*----------------------- Container ---------------------------*/
const mapStateToProps = state => ({
        user: state.user,
    });

const mapDispatchToProps = dispatch => {
    return {
        updateUsername: (userId, newUsername) => {
            console.log('updating username...');
            dispatch(editUser_dispatch(userId, {username: newUsername}))
        },
        updateBio: (userId, newBio) => {
            console.log('updating bio...');
            dispatch(editUser_dispatch(userId, {bio: newBio}))
        },
        //need to do email verification
        updateEmail: (userId, newEmail) => {
            console.log('updating email...');
            dispatch(editUser_dispatch(userId, {email: newEmail}))
        },
        //need to do password validation
        updatePassword: (userId, newPassword) => {
            console.log('updating password...');
            dispatch(editUser_dispatch(userId, {password: newPassword}))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);