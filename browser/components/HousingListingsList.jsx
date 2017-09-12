import React from 'react';

import ListingsContainer from '../containers/ListingsContainer.jsx';

import {housingSubcategories} from '../subcategories'

/*------------------- HousingListingsList component ----------------------*/
export default function HousingListingsList(props) {
    return (
        <ListingsContainer selectedCategory="housing" subcategories={housingSubcategories} subcategory={props.route.subcategory} />
    )
}