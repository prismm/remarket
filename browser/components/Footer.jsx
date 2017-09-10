/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router';

/*----------------------- Footer Component ---------------------------*/
export default function Footer () {
    return (
        <div className="md-grid">
            <div className="md-cell footer-nav">
                <span><Link className="footer-nav-link" to="/">About</Link></span>
                /
                <span><Link className="footer-nav-link" to="/">Contact</Link></span>
            </div>
        </div>
    )
}
