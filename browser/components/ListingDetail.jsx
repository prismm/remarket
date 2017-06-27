import React from 'react';
import PropTypes from 'prop-types';

/*------------------- ListingDetail component ----------------------*/
export default function ListingDetail({currentListing}){
    return (
        currentListing && (
        <div className="currentListing">
            <img className="item-img" src={ currentListing.imageUrl }/>
            <div className='item-descr'>
                <h2 className="selectedItemName">CATEGORY: {currentListing.category}</h2>
                <h2 className="selectedItemName">NAME: {currentListing.name}</h2>
                <p className="selectedItemDescr">DESCRIPTION: {currentListing.description}</p>
            </div>
            {currentListing.askingPrice ?
                <div className="price">
                    <h2>FLOOR PRICE: {currentListing.floorPrice}</h2>
                    <h2>ASKING PRICE: {currentListing.askingPrice}</h2>
                </div>
                :
                null
            }
        </div>)
    )
}

ListingDetail.propTypes = {
  currentListing: PropTypes.object.isRequired
};