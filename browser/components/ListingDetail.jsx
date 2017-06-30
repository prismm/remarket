import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

/*------------------- ListingDetail component ----------------------*/
export default function ListingDetail({currentListing}){
    return (
        currentListing && (
        <div className="md-grid listing-detail-container">
        <div className="listing-detail-breadcrumbs md-cell md-cell--12">
            <Link to="/">breadcrumbs</Link> > here > here > here
        </div>
        <div className="md-cell md-cell--10 currentListing md-grid">
            <div className="listing-images md-cell md-cell--5">
            <img className="item-img" src={ currentListing.imageUrl }/>
            </div>
            <div className="md-cell md-cell--1" />
            <div className="listing-body md-cell md-cell--5">
            <div className='item-descr'>
                <h3 className="selectedItemName">{currentListing.name}</h3>
                <h3 className="selectedItemName">{currentListing.category}</h3>
                <p className="selectedItemDescr">{currentListing.description}</p>
            </div>
            {currentListing.askingPrice ?
                <div className="price">
                    <h2>FLOOR PRICE: {currentListing.floorPrice}</h2>
                    <h2>ASKING PRICE: {currentListing.askingPrice}</h2>
                </div>
                :
                null
            }
            </div>
        </div>
        </div>)
    )
}

ListingDetail.propTypes = {
  currentListing: PropTypes.object.isRequired
};