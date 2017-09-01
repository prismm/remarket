import React from 'react';
import ListingsContainer from '../containers/ListingsContainer.jsx';
import {forSaleSubcategories} from '../subcategories.js'

/*------------------- ForSaleListingsList component ----------------------*/
export default function ForSaleListingsList(props) {
    return (
        <ListingsContainer selectedCategory="for sale" subcategories={forSaleSubcategories} subcategory={props.route.subcategory} />
    )
}