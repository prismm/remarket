/* eslint-disable camelcase */
import React, { Component } from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Breadcrumbs from './Breadcrumbs.jsx';
import { clearCurrentListing_dispatch } from '../actions/listing';

/*------------------- ListingDetail component ----------------------*/
class ListingDetail extends Component {
    constructor(props){
        super(props);
    }

    componentWillUnmount(){
        this.props.clearCurrentListing();
    }

    render(){
        return (
            this.props.currentListing && (
            <div className="md-grid listing-detail-container">
            <Breadcrumbs currentListing={this.props.currentListing} />
            <div className="md-cell md-cell--10 currentListing md-grid">
                <div className="listing-images md-cell md-cell--5">
                <img className="item-img" src={ this.props.currentListing.imageUrl }/>
                </div>
                <div className="md-cell md-cell--1" />
                <div className="listing-body md-cell md-cell--5">
                <div className='item-descr'>
                    <h3 className="selectedItemName">{this.props.currentListing.name}</h3>
                    <h3 className="selectedItemName">{this.props.currentListing.category}</h3>
                    <p className="selectedItemDescr">{this.props.currentListing.description}</p>
                </div>
                {this.props.currentListing.askingPrice ?
                    <div className="price">
                        <h2>FLOOR PRICE: {this.props.currentListing.floorPrice}</h2>
                        <h2>ASKING PRICE: {this.props.currentListing.askingPrice}</h2>
                    </div>
                    :
                    null
                }
                </div>
            </div>
            </div>)
        )
    }
}

ListingDetail.propTypes = {
  currentListing: PropTypes.object,
  clearCurrentListing: PropTypes.func.isRequired
};

/*------------------- ListingDetail Container ----------------------*/
const mapStateToProps = ({user, listing, network}) => ({
        currentListing: listing.currentListing,
        user: user,
        network: network
    });

const mapDispatchToProps = dispatch => {
    return {
        clearCurrentListing: () => {
            dispatch(clearCurrentListing_dispatch())
        }
    }
}

const ListingDetailContainer = connect(mapStateToProps, mapDispatchToProps)(ListingDetail);

export default ListingDetailContainer;

