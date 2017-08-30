import React from 'react';
import ListingsContainer from '../containers/ListingsContainer.jsx';
import {communitySubcategories} from '../subcategories'

/*------------------- CommunityListingsList component ----------------------*/
export default function CommunityListingsList() {
    return (
        <ListingsContainer selectedCategory="community" subcategories={communitySubcategories} />
    )
}