import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Listing from './Listing.jsx';
import PropTypes from 'prop-types';
import spinner from '../HOC/Spinner.jsx';


/*------------------- ListingsList component ----------------------*/

class ListingsList extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let {listings, category, currentNetwork} = this.props;
        const catUrl = category === 'for sale' ? 'for-sale' : category;

        if (currentNetwork && currentNetwork.id) listings = listings.filter(listing => listing.networks.some(network => network.id === currentNetwork.id));

    return (
        <div className="md-cell md-cell--4">
            <h2><Link to={`/${catUrl}`}>{category}</Link></h2>
            { listings ?
                listings.map(listing => <div key={listing.id}><Listing listing={listing} /></div>)
                :
                <div>No listings to display, sorry!</div>
            }
        </div>
    )}
}

ListingsList.propTypes = {
    category: PropTypes.string,
    listings: PropTypes.array,
    currentNetwork: PropTypes.object.isRequired
};


/*------------------- Container ----------------------*/

const mapState = state => ({
    currentNetwork: state.network.currentNetwork
  });

const ListingsListWithSpinner = spinner('listings')(ListingsList);
export default connect(mapState)(ListingsListWithSpinner);
