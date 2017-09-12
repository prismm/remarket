/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextField from 'react-md/lib/TextFields'
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

import { UpdateNameButton, UpdateUsernameButton, UpdateBioButton, UpdateEmailButton, UpdatePasswordButton } from '../components/Buttons.jsx'
import Snackbar from '../HOC/Snackbar.jsx'

import { editUser_dispatch } from '../actions/user';

/*----------------------- Profile Component ---------------------------*/
class Profile extends Component {
    constructor(props){
        super(props);
        this.state = Object.assign({}, props.user, {error: false, password: 'actualpasswordishidden'});
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    handleNameChange(newName) {
        this.setState({name: newName});
    }

    handleUsernameChange(newUsername) {
        this.setState({username: newUsername});
    }

    handleBioChange(newBio) {
        this.setState({bio: newBio});
    }

    handleEmailChange(newEmail) {
        this.setState({email: newEmail});
    }

    handlePasswordChange(newPassword) {
        newPassword.length >= 7 ? this.setState({
            error: false,
            password: newPassword
        }) : this.setState({
            error: true,
            password: newPassword
        })
    }

    render(){
        let success = this.props.success;
        return (
            <div className="md-grid profile-form">
            <div className="md-cell md-cell--10">
                <h3>My Profile</h3>
                <DataTable plain>
                    <TableHeader>
                    <TableRow>
                        <TableColumn>PUBLIC PROFILE</TableColumn>
                        <TableColumn />
                        <TableColumn />
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow key={1}>
                            <TableColumn className="md-cell--bottom">Name</TableColumn>
                            <TableColumn>
                                <TextField
                                id="name"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleNameChange}
                                className="profile-field"
                                required
                                />
                            </TableColumn>
                            <TableColumn className="md-cell--bottom"><UpdateNameButton newName={this.state.name} updateName={this.props.updateName} currentUser={this.props.user} /></TableColumn>
                        </TableRow>
                        <TableRow key={2}>
                            <TableColumn className="md-cell--bottom">Username</TableColumn>
                            <TableColumn>
                                <TextField
                                id="username"
                                name="username"
                                value={this.state.username ? this.state.username : this.state.userId}
                                onChange={this.handleUsernameChange}
                                className="profile-field"
                                required
                                />
                                </TableColumn>
                            <TableColumn className="md-cell--bottom"><UpdateUsernameButton newUsername={this.state.username} updateUsername={this.props.updateUsername} currentUser={this.props.user} /></TableColumn>
                        </TableRow>
                        <TableRow key={3}>
                            <TableColumn>Bio</TableColumn>
                            <TableColumn>
                                <TextField
                                id="bio"
                                maxLength={140}
                                errorText="Bio must be no more than 140 characters. Less is more!"
                                rows={2}
                                name="bio"
                                value={this.state.bio}
                                onChange={this.handleBioChange}
                                className="profile-field"
                                />
                            </TableColumn>
                            <TableColumn><UpdateBioButton newBio={this.state.bio} updateBio={this.props.updateBio} currentUser={this.props.user} /></TableColumn>
                        </TableRow>
                    </TableBody>
                </DataTable>
                <DataTable plain>
                    <TableHeader>
                    <TableRow>
                        <TableColumn>PRIVATE INFORMATION</TableColumn>
                        <TableColumn />
                        <TableColumn />
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow key={1}>
                            <TableColumn>Email</TableColumn>
                            <TableColumn>
                                <TextField
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                                className="profile-field"
                                required
                                />
                                </TableColumn>
                            <TableColumn><UpdateEmailButton newEmail={this.state.email} updateEmail={this.props.updateEmail} currentUser={this.props.user} /></TableColumn>
                        </TableRow>
                        <TableRow key={2}>
                            <TableColumn>Password</TableColumn>
                            <TableColumn>
                                <TextField
                                id="password"
                                name="password"
                                type="password"
                                error={this.state.error}
                                errorText="To reset, your new password must be at least 7 characters"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                className="profile-field"
                                required
                                />
                            </TableColumn>
                            <TableColumn><UpdatePasswordButton newPassword={this.state.password} updatePassword={this.props.updatePassword} currentUser={this.props.user} /></TableColumn>
                        </TableRow>
                    </TableBody>
                </DataTable>
            </div>
            {success ? <Snackbar /> : null}
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
        success: state.browse.success
    });

const mapDispatchToProps = dispatch => {
    return {
        updateName: (userId, newName) => {
            dispatch(editUser_dispatch(userId, {name: newName}))
        },
        updateUsername: (userId, newUsername) => {
            dispatch(editUser_dispatch(userId, {username: newUsername}))
        },
        updateBio: (userId, newBio) => {
            dispatch(editUser_dispatch(userId, {bio: newBio}))
        },
        //need to do email verification; have commented out update email button until this is addressed
        updateEmail: (userId, newEmail) => {
            dispatch(editUser_dispatch(userId, {email: newEmail}))
        },
        updatePassword: (userId, newPassword) => {
            dispatch(editUser_dispatch(userId, {password: newPassword}))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);