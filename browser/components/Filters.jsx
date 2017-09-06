import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'react-md/lib/TextFields';
import Toolbar from 'react-md/lib/Toolbars';
import Dropdown from 'react-toolbox/lib/dropdown';
import {locationsForFilter} from '../locations'

/*------------------- Filters component ----------------------*/
export default function Filters(props){
    return (
        <div>
        <Toolbar
          themed
          className="toolbar md-grid"
        >
        <div className="md-cell--3 listing-container-location-dropdown">
        <Dropdown
            auto
            allowBlank={true}
            label="location (city)"
            className="location-dropdown create-listing-location-dropdown"
            onChange={props.handleLocationChange}
            source={locationsForFilter}
            value={props.location}
        />
        </div>
        <div className="md-cell--9">
        <TextField
            onChange={props.handleChange}
            id="filter"
            label="looking for..."
            name="filter"
            className="md-cell-6"
            value={props.searchTerm}
        />
        </div>
        </Toolbar>
        <hr />
        </div>
    )
}

Filters.propTypes = {
    generalFilter: PropTypes.func.isRequired,
    filterByCategory: PropTypes.func.isRequired,
    filterByLocation: PropTypes.func.isRequired,
    handleLocationChange: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};