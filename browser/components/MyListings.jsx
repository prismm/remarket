import React from 'react';
import { connect } from 'react-redux';
import Listing from './Listing.jsx';
import PropTypes from 'prop-types';

import { fetchListingsByUser_dispatch } from '../actions/listing';

import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import { EditListingButton, DeleteListingButton, RenewListingButton } from './Buttons.jsx'

/*------------------- MyListings component ----------------------*/
function MyListings({myListings}) {
    console.log(myListings);
    const editListing = () => {};
    const renewListing = () => {};
    const deleteListing = () => {};
    const archiveListing = () => {};

    return (
        <div className="my-listings">
            <h3>My Listings</h3>
            <DataTable plain>
                <TableHeader>
                <TableRow>
                    <TableColumn>listing</TableColumn>
                    <TableColumn>category</TableColumn>
                    <TableColumn>status</TableColumn>
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
                                    <TableColumn><EditListingButton editListing={editListing} currentListing={listing} /></TableColumn>
                                    <TableColumn><RenewListingButton renewListing={renewListing} currentListing={listing} /></TableColumn>
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
  myListings: PropTypes.array
};


/*----------------------- Container ---------------------------*/
const mapStateToProps = state => ({
        myListings: state.listing.myListings
    });

export default connect(mapStateToProps)(MyListings);


// /*----------------------- Container ---------------------------*/
// const mapStateToProps = state => ({
//         user: state.user,
//     });

// const mapDispatchToProps = dispatch => {
//     return {
//         getMyListings: userId => {
//             dispatch(fetchListingsByUser_dispatch(userId))
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(MyListings);