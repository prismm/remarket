import React from 'react';
import { Link } from 'react-router';

/*------------------- ForgotPassword component ----------------------*/
export default function ForgotPassword() {
    return (
        <div className="forgot-password-page">
            <p>To go back to the login page, <Link to="/login">click here</Link>.</p>
        </div>
    )
}