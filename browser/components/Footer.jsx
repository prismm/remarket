/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router';

/*----------------------- Footer Component ---------------------------*/
export default function Footer () {
    return (
        <div className="md-grid">
            <div className="md-cell footer-nav">
                <span><Link className="footer-nav-link" to="/about">About & FAQs</Link></span>
                /
                <span><Link className="footer-nav-link" to="/contact">Contact</Link></span>
            </div>
        </div>
    )
}
