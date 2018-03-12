/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MetaTags from 'react-meta-tags';

import ListingsList from '../components/ListingsList.jsx';
import Filters from '../components/Filters.jsx';
import Snackbar from '../HOC/Snackbar.jsx'

import { setLocation_action } from '../actions/listing';
import {communitySubcategories, housingSubcategories, forSaleSubcategories} from '../subcategories'

/*----------------------- Listings Component ---------------------------*/
class Listings extends Component {
    constructor(props){
        super(props);
        this.state = {
                        searchTerm: '',
                        filters: [],
                        networkFilters: [],
                        location: props.location || null,
                        filteredListings: props.listings,
                        unfilteredListings: props.listings
                    }
        this.generalFilter = this.generalFilter.bind(this);
        // this.filterByNetwork = this.filterByNetwork.bind(this);
        this.filterByLocation = this.filterByLocation.bind(this);  
        this.filterByCategory = this.filterByCategory.bind(this);
        this.handleChange = this.handleChange.bind(this); 
        // this.handleNetworkChange = this.handleNetworkChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({filteredListings: nextProps.listings})
    }

    generalFilter(searchTerm){
        searchTerm = searchTerm.toLowerCase();
        let filteredListings = this.props.listings.filter(listing => {
            return (listing.name.toLowerCase().indexOf(searchTerm) !== -1) || (listing.description.toLowerCase().indexOf(searchTerm) !== -1) || (listing.neighborhood && listing.neighborhood.toLowerCase().indexOf(searchTerm) !== -1)
        })
        this.setState({
            searchTerm: searchTerm,
            filteredListings: filteredListings
        })
    }

    filterByCategory(category, arr){
        if (!arr) arr = this.state.filteredListings;
        let categoryListings = arr.filter(listing => (listing.category === category));
        return categoryListings;
    }

    // handleNetworkChange(network){
    //     this.setState({
    //         networkFilters: this.state.filters.concat([network])
    //     })
    // }

    //filter by network logic is currently handled in Main component; some draft logic is stored here as comments
    // filterByNetwork(arr, network){
    //     if (network) return network.getAllListings();
    //     else return arr;
    // }

    handleLocationChange(value){
        this.setState({location: value})
    }

    filterByLocation(arr){
        if (!this.state.location) {
            return arr;
        } else {
            return arr.filter(listing => (listing.location === this.state.location))
        }
    }

    handleSubmit(searchTerm){
        this.setState({
            filters: this.state.filters.concat([searchTerm]),
            searchTerm: ''
        })
    }

    handleChange(event){
        this.generalFilter(event);
    }

    render(){
        let success = this.props.success;
        //filtering listings based on network and location -- should go off props.listings (complete list) or state.filteredListings (list filtered by generalFilter?)
        let filteredListings = this.state.filteredListings;
        // this.state.networkFilters.forEach( networkFilter => {
        //     filteredListings = this.filterByNetwork(filteredListings, networkFilter)
        // });
        filteredListings = this.filterByLocation(filteredListings);
        //filter by network logic is handled in Main component; some draft logic is stored here in comments
        const subcategory = this.props.subcategory ? this.props.subcategory : null;
        const subcategories = this.props.subcategories ? this.props.subcategories : null;
        return (
            <div>
                <MetaTags>
                    <meta id="og-url" property="og:url" content="https://www.reuse.market" />
                    <meta id="og-type" property="og:type" content="website" />
                    <meta id="fb-app-id" property="fb:app_id" content="1809907029339544" />
                    <meta id="og-title" property="og:title" content="Remarket" />
                    <meta id ="og-description" property="og:description" content="Remarket (www.reuse.market) is a classifieds site and marketplace for students at NYU & Columbia. The goal of remarket is to improve the efficiency of our community's secondhand markets by unifying and streamlining all the fragmented markets that are in place today (on facebook groups, listservs, etc.)." />
                    <meta id ="og-image" property="og:image" content="https://s3.us-east-2.amazonaws.com/remarket-123/remarket-logo-588.png" />
                </MetaTags>
                <Filters
                    handleLocationChange={this.handleLocationChange}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    searchTerm={this.state.searchTerm}
                    generalFilter={this.generalFilter}
                    filterByCategory={this.filterByCategory}
                    filterByLocation={this.filterByLocation}
                    filterByNetwork={this.filterByNetwork}
                    location={this.state.location}
                />
                <div>
                    {this.props.selectedCategory ?
                        (<div className="md-grid">
                            <ListingsList classNames="category-list md-cell md-cell--10" listings={this.filterByCategory(this.props.selectedCategory, filteredListings)} category={this.props.selectedCategory} subcategories={subcategories} subcategory={subcategory} />
                        </div>) : (
                        <div className="md-grid">
                            <div className="category-list md-cell md-cell--6">
                                <ListingsList classNames="category-list" listings={this.filterByCategory('for sale', filteredListings)} category="for sale" menuSubcategories={forSaleSubcategories.slice(1)} />
                                <ListingsList classNames="category-list" listings={this.filterByCategory('community', filteredListings)} category="community" menuSubcategories={communitySubcategories.slice(1)} />
                            </div>
                            <div className="category-list md-cell md-cell--6">
                                <ListingsList classNames="category-list" listings={this.filterByCategory('housing', filteredListings)} category="housing" menuSubcategories={housingSubcategories.slice(1)} />
                            </div>
                        </div>
                    )
                    }
                </div>
                {success ? <Snackbar /> : null}
            </div>
        )
    }
}

Listings.propTypes = {
  listings: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string,
  location: PropTypes.string
};

/*----------------------- Listings Container ---------------------------*/
const mapStateToProps = ({user, listing, network, browse}) => ({
        listings: listing.listings,
        user: user,
        network: network,
        location: listing.location,
        success: browse.success
    });

const mapDispatchToProps = dispatch => {
    return {
        setLocation: location => dispatch(setLocation_action(location))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Listings);