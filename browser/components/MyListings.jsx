import React from 'react';
import Listing from './Listing.jsx';
import PropTypes from 'prop-types';

import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import { EditListingButton, DeleteListingButton, RenewListingButton } from './Buttons.jsx'

/*------------------- ListingsList component ----------------------*/
export default function ListingsList({myListings}) {
    return (
        <div className="my-listings">
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
                                    <TableColumn><EditListingButton /></TableColumn>
                                    <TableColumn><RenewListingButton /></TableColumn>
                                    <TableColumn><DeleteListingButton /></TableColumn>
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

ListingsList.propTypes = {
  myListings: PropTypes.array
};
