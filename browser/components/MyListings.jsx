/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {TimeLeft} from './TimeLeft.jsx';
import { EditListingButton, DeleteListingButton } from './Buttons.jsx'
import RenewListing from './RenewListing.jsx'
import Listing from './Listing.jsx';
import spinner from '../HOC/Spinner.jsx'

import { deleteListing_dispatch, setEditStatus_action, setCurrentListing_action, editListing_dispatch } from '../actions/listing';

import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

/*------------------- MyListings component ----------------------*/
//in the process of converting this to dumb component
//<TimeLeft time={listing.expirationDate} />
const MyListings = (props) => {
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
                <TableColumn />
                <TableColumn />
                <TableColumn />
            </TableRow>
            </TableHeader>
            <TableBody>
                { props.myListings && props.myListings.length ?
                    (props.myListings.map(listing => (      
                            <TableRow key={listing.id}>
                                <TableColumn><Listing listing={listing}/></TableColumn>
                                <TableColumn>{listing.category}</TableColumn>
                                <TableColumn>{listing.status !== 'active' ? <i>{listing.status}</i> : listing.status}</TableColumn>
                                <TableColumn>{listing.status !== 'active' ? <i>{listing.expiresIn}</i> : <p>{listing.expiresIn} <TimeLeft time={listing.expirationDate} /></p>}</TableColumn>
                                <TableColumn>{listing.status !== 'deleted' ? <RenewListing renewListing={props.renewListing} currentListing={listing} /> : null}</TableColumn>
                                <TableColumn>{listing.status !== 'deleted' ? <EditListingButton setCurrentListing={props.setCurrentListing} setEditStatus={props.setEditStatus} currentListing={listing} /> : null}</TableColumn>
                                <TableColumn>{listing.status !== 'deleted' ? <DeleteListingButton deleteListing={props.deleteListing} archiveListing={props.archiveListing} currentListing={listing} /> : null}</TableColumn>
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

MyListings.propTypes = {
  myListings: PropTypes.array,
  renewListing: PropTypes.func,
  deleteListing: PropTypes.func,
  archiveListing: PropTypes.func,
  setEditStatus: PropTypes.func,
  setCurrentListing: PropTypes.func
};


/*----------------------- Container ---------------------------*/
const mapStateToProps = state => ({
        myListings: state.listing.myListings
    });

const mapDispatchToProps = dispatch => ({
        setEditStatus: editStatus => {
            dispatch(setEditStatus_action(editStatus))
        },
        setCurrentListing: listing => {
            dispatch(setCurrentListing_action(listing))
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

const MyListingsWithSpinner = spinner('myListings')(MyListings);
export default connect(mapStateToProps, mapDispatchToProps)(MyListingsWithSpinner);