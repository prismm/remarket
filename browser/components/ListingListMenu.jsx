import React from 'react';
import {IconMenu, MenuItem } from 'react-toolbox/lib/menu'; 
import { browserHistory } from 'react-router';

const Menu = ({category, menuSubcategories}) => {
    const catUrl = category === 'for sale' ? 'for-sale' : category;
    return (
        <IconMenu icon="more_vert" position="topRight" className="listing-list-menu" menuRipple>
            <MenuItem key="all" value="all" caption="all" onClick={() => browserHistory.push(`/${catUrl}`)} />
            {menuSubcategories && menuSubcategories.length ?
                menuSubcategories.map(
                    subcategory => (<MenuItem
                                        key={subcategory.value}
                                        value={subcategory.value}
                                        caption={subcategory.label}
                                        onClick={() => browserHistory.push(`/${catUrl}/${subcategory.value}`)}
                                    />)
                                )
                :
                null
            }
        </IconMenu>
    )
};


export default Menu;
