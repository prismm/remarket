/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Listing from './Listing.jsx';
import PropTypes from 'prop-types';

import { editListing_dispatch, deleteListing_dispatch} from '../actions/listing';

import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import { EditListingButton, DeleteListingButton } from './Buttons.jsx'
import RenewListing from './RenewListing.jsx'

/*------------------- MyListings component ----------------------*/
class MyListings extends Component {
    constructor(props){
        super(props);
        this.state = {  
        }
    }

    render(){
        return (
        <div className="my-listings md-cell-10">
            <h3>My Listings</h3>
            <DataTable plain>
                <TableHeader>
                <TableRow>
                    <TableColumn>listing</TableColumn>
                    <TableColumn>category</TableColumn>
                    <TableColumn>status</TableColumn>
                    <TableColumn>expires on</TableColumn>
                    <TableColumn></TableColumn>
                    <TableColumn></TableColumn>
                    <TableColumn></TableColumn>
                </TableRow>
                </TableHeader>
                <TableBody>
                { this.props.myListings && this.props.myListings.length ?
                    (this.props.myListings.map(listing => (      
                                <TableRow key={listing.id}>
                                    <TableColumn><Listing listing={listing}/></TableColumn>
                                    <TableColumn>{listing.category}</TableColumn>
                                    <TableColumn>{listing.status !== 'active' ? <i>{listing.status}</i> : listing.status}</TableColumn>
                                    <TableColumn>{listing.status !== 'active' ? <i>{listing.expiresIn}</i> : listing.expiresIn}</TableColumn>
                                    <TableColumn>{listing.status !== 'deleted' ? <RenewListing renewListing={this.props.renewListing} currentListing={listing} /> : null}</TableColumn>
                                    <TableColumn>{listing.status !== 'deleted' ? <EditListingButton editListing={this.props.editListing} currentListing={listing} /> : null}</TableColumn>
                                    <TableColumn>{listing.status !== 'deleted' ? <DeleteListingButton deleteListing={this.props.deleteListing} archiveListing={this.props.archiveListing} currentListing={listing} /> : null}</TableColumn>
                                </TableRow>
                        )
                    )
                )
                :
                <div>You haven't posted anything yet.</div>
                }
                </TableBody>
            </DataTable>
        </div>
        )
    }
}

MyListings.propTypes = {
  myListings: PropTypes.array,
  editListing: PropTypes.func,
  renewListing: PropTypes.func,
  deleteListing: PropTypes.func,
  archiveListing: PropTypes.func
};


/*----------------------- Container ---------------------------*/
const mapStateToProps = state => ({
        myListings: state.listing.myListings
    });

const mapDispatchToProps = dispatch => ({
        editListing: (listingId, changes) => {
            dispatch(editListing_dispatch(listingId, changes))
        },
        renewListing: (listingId, newDate) => {
            dispatch(editListing_dispatch(listingId, {
                expirationDate: newDate,
                status: 'active'
            }))
        },
        deleteListing: listing => {
            dispatch(deleteListing_dispatch(listing));
            dispatch(editListing_dispatch(listing.id, {status: 'deleted'}))
        },
        archiveListing: listingId => {
            dispatch(editListing_dispatch(listingId, {status: 'archived'}))
        }
});

export default connect(mapStateToProps, mapDispatchToProps)(MyListings);