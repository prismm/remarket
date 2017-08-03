import React  from 'react';
import Moment from 'react-moment';

export function TimeLeft({time}) {
    const now = new Date();
    const coming = new Date(time);
    return <p><small className="time-left"> <Moment to={coming}>{now}</Moment></small></p>
}

export function ExpiresIn({time, expiry}) {
    const now = new Date();
    const coming = new Date(time);
    return <p><small className="time-left">Expires <Moment to={coming}>{now}</Moment>, {expiry}</small></p>
}