import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ListingsList from '../components/ListingsList.jsx';
import Filters from '../components/Filters.jsx';

/*----------------------- Listings Component ---------------------------*/
class Listings extends Component {
    constructor(props){
        super(props);
        this.state = {
                        searchTerm: '',
                        filters: [],
                        networkFilters: [],
                        location: 'all',
                        filteredListings: props.listings,
                        unfilteredListings: props.listings
                    }
        this.generalFilter = this.generalFilter.bind(this);
        this.filterByNetwork = this.filterByNetwork.bind(this);
        this.filterByLocation = this.filterByLocation.bind(this);  
        this.filterByCategory = this.filterByCategory.bind(this);
        this.handleChange = this.handleChange.bind(this); 
        this.handleNetworkChange = this.handleNetworkChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({filteredListings: nextProps.listings})
    }

    generalFilter(searchTerm){
        let filteredListings = this.props.listings.filter(listing => (
            (listing.name.indexOf(searchTerm) !== -1) || (listing.description.indexOf(searchTerm) !== -1))
            );
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

    handleNetworkChange(network){
        this.setState({
            networkFilters: this.state.filters.concat([network])
        })
    }

    filterByNetwork(arr, network){
        if (network) return network.getAllListings();
        else return arr;
    }

    handleLocationChange(location){
        this.setState({
            location: location
        })
    }

    filterByLocation(arr, location){
        console.log(location);
        if (location === 'all') return arr;
        return arr.filter(listing => (listing.location === location));
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
        //filtering listings based on network and location -- should go off props.listings (complete list) or state.filteredListings (list filtered by generalFilter?)
        let filteredListings = this.state.filteredListings;
        this.state.networkFilters.forEach( networkFilter => {
            filteredListings = this.filterByNetwork(filteredListings, networkFilter)
        });
        console.log(filteredListings);
        filteredListings = this.filterByLocation(filteredListings, this.state.location);
        //filter by Location was tested and appears to work; filter by network not yet tested
        console.log("FILTERED LISTINGS IN RENDER FUNCTION OF LISTINGS CONTAINER", filteredListings)

        return (
            <div>
                <Filters handleLocationChange={this.handleLocationChange} handleSubmit={this.handleSubmit} handleChange={this.handleChange} searchTerm={this.state.searchTerm} generalFilter={this.generalFilter} filterByCategory={this.filterByCategory} filterByLocation={this.filterByLocation} filterByNetwork={this.filterByNetwork} />
                <div className="md-grid">
                    <ListingsList className="md-cell" listings={this.filterByCategory('for sale', filteredListings)} category="for sale" />
                    <ListingsList className="md-cell" listings={this.filterByCategory('housing', filteredListings)} category="housing" />
                    <ListingsList className="md-cell" listings={this.filterByCategory('community', filteredListings)} category="community" />
                </div>
            </div>
        )
    }
}

Listings.propTypes = {
  listings: PropTypes.array.isRequired
};

/*----------------------- Listings Container ---------------------------*/
const mapStateToProps = ({user, listing, network}) => ({
        listings: listing.listings,
        user: user,
        network: network
    });

export default connect(mapStateToProps)(Listings);