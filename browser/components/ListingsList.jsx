import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import PropTypes from 'prop-types';

import Listing from './Listing.jsx';
import spinner from '../HOC/Spinner.jsx';

import Dropdown from 'react-toolbox/lib/dropdown';

/*------------------- ListingsList component ----------------------*/

class ListingsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            subcategory: props.subcategory || null,
            listings: props.listings
        }
        this.handleSubcategoryChange = this.handleSubcategoryChange.bind(this);
    }

    handleSubcategoryChange(value){
        const catUrl = this.props.category === 'for sale' ? 'for-sale' : this.props.category;
        const subcatUrl = value ? value : '';
        browserHistory.push(`/${catUrl}/${subcatUrl}`);
        this.setState({subcategory: value})
    }

    render(){
        let {listings, category, currentNetwork, classNames} = this.props;
        // let listings = this.props.listings;
        const catUrl = category === 'for sale' ? 'for-sale' : category;
        const subcategories = this.props.subcategories ? this.props.subcategories : null;
        //filtering by network
        if (currentNetwork && currentNetwork.id) listings = listings.filter(listing => listing.networks && listing.networks.some(network => network.id === currentNetwork.id));
        //filtering by subcategory
        if (this.state.subcategory) listings = listings.filter(listing => listing.subcategory === this.state.subcategory)
        return (
            <div className={classNames}>
                <h2 className="category-header"><Link to={`/${catUrl}`}>{category}</Link></h2>
                {subcategories ?
                    <Dropdown
                        auto
                        allowBlank={true}
                        label="subcategory"
                        className="subcategory-dropdown"
                        onChange={this.handleSubcategoryChange}
                        source={subcategories}
                        value={this.state.subcategory}
                    />
                    :
                    null}
                { listings && listings.length ?
                    listings.map(listing => <div key={listing.id}><Listing listing={listing} /></div>)
                    :
                    <div className="no-posts">No posts to display.</div>
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
