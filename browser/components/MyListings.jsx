import React from 'react';
import { connect } from 'react-redux';
import Listing from './Listing.jsx';
import PropTypes from 'prop-types';

import { fetchListingsByUser_dispatch, editListing_dispatch, deleteListing_dispatch} from '../actions/listing';

import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import { EditListingButton, DeleteListingButton, RenewListingButton } from './Buttons.jsx'

/*------------------- MyListings component ----------------------*/
function MyListings({myListings, editListing, renewListing, deleteListing, archiveListing}) {

    return (
        <div className="my-listings">
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
                { myListings && myListings.length ?
                    (myListings.map(listing => (      
                                <TableRow key={listing.id}>
                                    <TableColumn><Listing listing={listing}/></TableColumn>
                                    <TableColumn>{listing.category}</TableColumn>
                                    <TableColumn>{listing.status}</TableColumn>
                                    <TableColumn>{listing.expiresIn}</TableColumn>
                                    <TableColumn>{listing.status !== 'deleted' ? <RenewListingButton renewListing={renewListing} currentListing={listing} /> : null}</TableColumn>
                                    <TableColumn><EditListingButton editListing={editListing} currentListing={listing} /></TableColumn>
                                    <TableColumn><DeleteListingButton deleteListing={deleteListing} archiveListing={archiveListing} currentListing={listing} /></TableColumn>
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
            console.log('editing listing...');
            dispatch(editListing_dispatch(listingId, changes))
        },
        renewListing: (listingId, newDate) => {
            console.log('renewing listing...');
            dispatch(editListing_dispatch(listingId, {expirationDate: newDate}))
        },
        deleteListing: listing => {
            console.log('deleting listing...');
            dispatch(deleteListing_dispatch(listing));
            dispatch(editListing_dispatch(listing.id, {status: 'deleted'}))
        },
        archiveListing: listingId => {
            console.log('editing listing...');
            dispatch(editListing_dispatch(listingId, {status: 'archived'}))
        }
});

export default connect(mapStateToProps, mapDispatchToProps)(MyListings);