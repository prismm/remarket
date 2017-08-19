import React from 'react';
import PropTypes from 'prop-types';

/*------------------- Loader component ----------------------*/
export default function Loader({loadingText}) {
    return (
        <div className="vertical-centered-box">
        <section>
            <div className="loader-1">
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
            </div>
            <div className="loader-text">{loadingText}</div>
        </section>
        </div>
    )
}

Loader.propTypes = {
    loadingText: PropTypes.string
};
