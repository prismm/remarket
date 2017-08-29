/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ListingsList from '../components/ListingsList.jsx';
import Filters from '../components/Filters.jsx';

import { setLocation_action } from '../actions/listing'

/*----------------------- Listings Component ---------------------------*/
class Listings extends Component {
    constructor(props){
        super(props);
        this.state = {
                        searchTerm: '',
                        filters: [],
                        networkFilters: [],
                        location: props.location || '<all>',
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
            return (listing.name.toLowerCase().indexOf(searchTerm) !== -1) || (listing.description.toLowerCase().indexOf(searchTerm) !== -1)
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

    handleLocationChange(location){
        this.setState({
            location: location
        })
        if (location === '<all>') {
            this.props.setLocation(null);
        } else {
            this.props.setLocation(location);
        }
    }

    filterByLocation(arr){
        if (this.state.location === '<all>') {
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
        //filtering listings based on network and location -- should go off props.listings (complete list) or state.filteredListings (list filtered by generalFilter?)
        let filteredListings = this.state.filteredListings;
        // this.state.networkFilters.forEach( networkFilter => {
        //     filteredListings = this.filterByNetwork(filteredListings, networkFilter)
        // });
        filteredListings = this.filterByLocation(filteredListings);
        //filter by network logic is handled in Main component; some draft logic is stored here in comments


        return (
            <div>
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
                            <ListingsList className="md-cell" listings={this.filterByCategory(this.props.selectedCategory, filteredListings)} category={this.props.selectedCategory} />
                        </div>) : (
                        <div className="md-grid">
                            <ListingsList className="md-cell" listings={this.filterByCategory('for sale', filteredListings)} category="for sale" />
                            <ListingsList className="md-cell" listings={this.filterByCategory('housing', filteredListings)} category="housing" />
                            <ListingsList className="md-cell" listings={this.filterByCategory('community', filteredListings)} category="community" />
                        </div>
                    )
                    }
                </div>
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
const mapStateToProps = ({user, listing, network}) => ({
        listings: listing.listings,
        user: user,
        network: network,
        location: listing.location
    });

const mapDispatchToProps = dispatch => {
    return {
        setLocation: location => dispatch(setLocation_action(location))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Listings);