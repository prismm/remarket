/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import AddNetwork from './AddNetwork.jsx'

import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

/*----------------------- Account Component ---------------------------*/
class Profile extends Component {
    constructor(props){
        super(props);
    }

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
                            <TableColumn>[update NAME]</TableColumn>
                        </TableRow>
                        <TableRow key={2}>
                            <TableColumn>user name</TableColumn>
                            <TableColumn>{this.props.user.userId}</TableColumn>
                            <TableColumn>[update USERNAME]</TableColumn>
                        </TableRow>
                        <TableRow key={3}>
                            <TableColumn>bio</TableColumn>
                            <TableColumn></TableColumn>
                            <TableColumn>[update BIO]</TableColumn>
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
                            <TableColumn>[update EMAIL]</TableColumn>
                        </TableRow>
                        <TableRow key={2}>
                            <TableColumn>password</TableColumn>
                            <TableColumn>[hidden]</TableColumn>
                            <TableColumn>[update PASSWORD]</TableColumn>
                        </TableRow>
                    </TableBody>
                </DataTable>
            </div>
        </div>
        )
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired
};

/*----------------------- Container ---------------------------*/
const mapStateToProps = (state) => ({
        user: state.user,
    });

export default connect(mapStateToProps)(Profile);