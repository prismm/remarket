/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

import {TimeLeft} from './TimeLeft.jsx';
import Listing from './Listing.jsx';
import spinner from '../HOC/Spinner.jsx'

/*----------------------- MySavedListings Component ---------------------------*/
function MySavedListings(props){
    let mySavedPosts = [];
    props.mySavedListings && props.mySavedListings.forEach(save => mySavedPosts.push(save.listing));
    return (
        <div>
            <h3>My Saved Posts</h3>
            <DataTable plain>
            <TableHeader>
            <TableRow>
                <TableColumn>post</TableColumn>
                <TableColumn>category</TableColumn>
                <TableColumn>status</TableColumn>
                <TableColumn>expires on</TableColumn>
            </TableRow>
            </TableHeader>
            <TableBody>
                { mySavedPosts && mySavedPosts.length ?
                    (mySavedPosts.map(listing => (      
                            <TableRow key={listing.id}>
                                <TableColumn><Listing listing={listing}/></TableColumn>
                                <TableColumn>{listing.category}</TableColumn>
                                <TableColumn>{listing.status !== 'active' ? <i>{listing.status}</i> : listing.status}</TableColumn>
                                <TableColumn>{listing.status !== 'active' ? <i>{listing.expiresIn}</i> : <div>{listing.expiresIn} <TimeLeft time={listing.expirationDate} /></div>}</TableColumn>
                            </TableRow>
                        )
                    )
                )
                :
                <div className="no-posts-yet">You haven't saved any posts yet.</div>
                }
            </TableBody>
            </DataTable>
        </div>
    )
}

MySavedListings.propTypes = {
  mySavedListings: PropTypes.array
};


/*----------------------- Container ---------------------------*/
const mapStateToProps = state => ({
        mySavedListings: state.action.mySaves
    });


const MySavedPostsWithSpinner = spinner('mySavedListings')(MySavedListings);
export default connect(mapStateToProps)(MySavedPostsWithSpinner);