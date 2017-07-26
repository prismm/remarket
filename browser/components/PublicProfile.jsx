/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Listing from './Listing.jsx';
import spinner from '../HOC/Spinner.jsx'
import {NetworkAvatar} from './Avatars.jsx'

import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

import { clearUser_action } from '../actions/listing';

/*------------------- PublicProfile component ----------------------*/

class PublicProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            writeMessage: false,
            message: ''
        }
        this.onMessageClick = this.onMessageClick.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
        this.onMessageSubmit = this.onMessageSubmit.bind(this);
    }

    componentWillUnmount(){
        return this.props.clearUser();
    }

    onMessageClick(){
        this.setState({writeMessage: true})
    }

    onMessageChange(event){
        //check whether e.target.value is what we want
        this.setState({message: event.target.value})
    }

    onMessageSubmit(event){
        event.preventDefault();
        //need to write this function -- sendMessage
        this.props.sendMessage(this.props.user.email, this.props.browse.user.email, this.state.message);
    }

    render(){
        //make sure thisUser has .name, .networks, .listings
        const thisUser = this.props.browse.user;
        return (
        <div className="md-grid">
            <Card className="md-paper md-paper--8 md-card md-background--card md-cell">
                <CardTitle className="public-profile-username" title={thisUser.userId} />
                <h4>{thisUser.name}</h4>
                { (thisUser.networks && thisUser.networks.length) ?
                    thisUser.networks.map(
                        network => <NetworkAvatar key={network.id} network={network.name} tooltipLabel={network.name} tooltipPosition="top" />
                    )
                :
                null
                }
                <p>{thisUser.bio}</p>
                <hr />
                <h4> Message {thisUser.name} </h4>
                <hr />
                 <div className="my-listings md-cell-10">
                    <h3>{thisUser.name}\'s Listings</h3>
                    <DataTable plain>
                        <TableHeader>
                        <TableRow>
                            <TableColumn>listing</TableColumn>
                            <TableColumn>category</TableColumn>
                            <TableColumn>created on</TableColumn>
                            <TableColumn>status</TableColumn>
                            <TableColumn>expires on</TableColumn>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        { thisUser.listings && thisUser.listings.length ?
                            (thisUser.listings.map(listing => (      
                                        <TableRow key={listing.id}>
                                            <TableColumn><Listing listing={listing}/></TableColumn>
                                            <TableColumn>{listing.category}</TableColumn>
                                            <TableColumn>{listing.createdOn}</TableColumn>
                                            <TableColumn>{listing.status !== 'active' ? <i>{listing.status}</i> : listing.status}</TableColumn>
                                            <TableColumn>{listing.status !== 'active' ? <i>{listing.expiresIn}</i> : listing.expiresIn}</TableColumn>
                                        </TableRow>
                                )
                            )
                        )
                        :
                        <div>{thisUser.name} hasn't posted anything yet.</div>
                        }
                        </TableBody>
                    </DataTable>
                </div>
            </Card>
        </div>
        )
    }

}

PublicProfile.propTypes = {
  browse: PropTypes.object,
  sendMessage: PropTypes.func,
  clearUser: PropTypes.func
};

/*------------------- PublicProfile Container ----------------------*/
const mapStateToProps = ({user, browse}) => ({
        browse: browse,
        user: user
    });

const mapDispatchToProps = dispatch => {
    return {
        clearUser: () => dispatch(clearUser_action()),
        sendMessage: () => {}
    }
}

const PublicProfileWithSpinner =  spinner('browse.user')(PublicProfile);

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfileWithSpinner);

