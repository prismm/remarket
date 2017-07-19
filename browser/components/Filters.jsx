import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons';
import Toolbar from 'react-md/lib/Toolbars';
import LocationDropdown from './LocationDropdown.jsx'

/*------------------- Filters component ----------------------*/
export default function Filters(props){
    return (
        <div>
        <Toolbar
          themed
        >
        <LocationDropdown
            handleLocationChange={props.handleLocationChange}
            key="dropdown"
            location={props.location}
        />
        <TextField
            onChange={props.handleChange}
            id="filter"
            label="looking for..."
            name="filter"
            className="md-cell-6"
            value={props.searchTerm}
        />
        <Button
            onSubmit={props.handleSubmit}
            key="search"
            type="submit"
            icon
            >search
        </Button>
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