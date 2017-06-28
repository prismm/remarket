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
                        filteredListings: props.listings,
                        unfilteredListings: props.listings
                    }
        this.generalFilter = this.generalFilter.bind(this);
        this.filterByNetwork = this.filterByNetwork.bind(this);
        this.filterByLocation = this.filterByLocation.bind(this);  
        this.filterByCategory = this.filterByCategory.bind(this);
        this.handleChange = this.handleChange.bind(this); 
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
            // filteredListings: filteredListings
        })
    }

    filterByCategory(category){
        let categoryListings = this.state.filteredListings.filter(listing => (listing.category === category));
        return categoryListings;
    }

    filterByNetwork(network){
        let networkListings = network.getAllListings();
        this.setState({
            filters: []
        })
    }

    filterByLocation(location){
        let locationListings = this.props.listings.filter(listing => (listing.location === location))
        this.setState({
            filters: []
            // filteredListings: locationListings
        })
    }

    handleSubmit(){
        this.setState({
            filters: this.state.filters.concat([searchTerm]),
            searchTerm: ''
        })
    }

    handleChange(event){
        this.generalFilter(event);
    }

    render(){
        const filteredListings = generalFilter(filterByLocation(filterByNetwork(this.props.listings)));
        return (
            <div>
                <Filters handleSubmit={this.handleSubmit} handleChange={this.handleChange} searchTerm={this.state.searchTerm} generalFilter={this.generalFilter} filterByCategory={this.filterByCategory} filterByLocation={this.filterByLocation} filterByNetwork={this.filterByNetwork} />
                <div className="md-grid">
                    <ListingsList className="md-cell" listings={this.filterByCategory('for sale')} category="for sale" />
                    <ListingsList className="md-cell" listings={this.filterByCategory('housing')} category="housing" />
                    <ListingsList className="md-cell" listings={this.filterByCategory('community')} category="community" />
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