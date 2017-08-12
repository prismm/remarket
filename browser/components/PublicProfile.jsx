/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Listing from './Listing.jsx';
import spinner from '../HOC/Spinner.jsx';
import {NetworkAvatar} from './Avatars.jsx';
import {MessageUserButton} from './Buttons.jsx';
import {TimeLeft} from './TimeLeft.jsx';

import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

import { clearUser_dispatch } from '../actions/user';

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
        return this.props.clearViewUser();
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
        this.props.sendMessage(this.props.user.email, this.props.viewedUser.email, this.state.message);
    }

    render(){
        //make sure thisUser has .name, .networks, .listings
        const thisUser = this.props.viewedUser;
        const error = thisUser.error || null;
        const label =  'Message ' + thisUser.name;

        return (
        <div className="md-grid">
            { error &&
                <div>
                    <h3 className="error"> { error.response.status } / { error.response.statusText } </h3>
                    <div className="error listing-not-found"> { error.response.data } </div>
                </div> }
            {thisUser.id && <Card className="md-card md-background--card md-cell--10 public-profile-card">
                <h2><span className="public-profile-username divider">{thisUser.userId}</span> <span className="divider"> / </span> {thisUser.name}</h2>
                { (thisUser.networks && thisUser.networks.length) ?
                    thisUser.networks.map(
                        network => <NetworkAvatar key={network.id} network={network.name} tooltipLabel={network.name} tooltipPosition="top" />
                    )
                :
                null
                }
                <p>{thisUser.bio}</p>
                <MessageUserButton label={label} toEmail={thisUser.email} replyTo={this.props.user.email} message={this.state.message} />
                <hr className="profile-divider"/>
                 <div className="my-listings-profile md-cell-10">
                    <h3>{thisUser.name}'s Listings</h3>
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
                        { this.props.viewedUserListings && this.props.viewedUserListings.length ?
                            (this.props.viewedUserListings.map(listing => (      
                                        <TableRow key={listing.id}>
                                            <TableColumn><Listing listing={listing}/></TableColumn>
                                            <TableColumn>{listing.category}</TableColumn>
                                            <TableColumn>{listing.created}</TableColumn>
                                            <TableColumn>{listing.status !== 'active' ? <i>{listing.status}</i> : listing.status}</TableColumn>
                                            <TableColumn>{listing.status !== 'active' ? <i>{listing.expiresIn}</i> : <p>{listing.expiresIn} <TimeLeft time={listing.expirationDate} /></p>}</TableColumn>
                                        </TableRow>
                                )
                            )
                        )
                        :
                        <p className="divider no-listings">{thisUser.name} hasn't posted anything yet.</p>
                        }
                        </TableBody>
                    </DataTable>
                </div>
            </Card>}
        </div>
        )
    }

}

PublicProfile.propTypes = {
  viewedUser: PropTypes.object,
  sendMessage: PropTypes.func,
  clearViewUser: PropTypes.func,
  user: PropTypes.object
};

/*------------------- PublicProfile Container ----------------------*/
const mapStateToProps = ({user, browse}) => ({
        viewedUser: browse.user,
        viewedUserListings: browse.userListings,
        user: user
    });

const mapDispatchToProps = dispatch => {
    return {
        clearViewUser: () => dispatch(clearUser_dispatch()),
        sendMessage: () => {}
    }
}

const PublicProfileWithSpinner =  spinner('viewedUser')(PublicProfile);

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfileWithSpinner);

