import React, { Component } from 'react';
import { connect } from 'react-redux';
import Listing from '../components/Listing.jsx';

class ListingsContainer extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="listing-container">
                {/*<h1>Listings Container is here </h1>*/}
               { this.props.listings ? 
                    this.props.listings.map(listing => <Listing listing={listing} key={listing.id} />)
                    :
                    <div>No listings to display, sorry!</div>
                }
            </div>
        )
    }
}

const mapStateToProps = ({user, listing, network}) => {
    return (
            { 
            listings: listing.listings,
            user: user,
            network: network
        }
    )
}

export default connect(mapStateToProps)(ListingsContainer);