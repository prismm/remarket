import React  from 'react';
import Moment from 'react-moment';

/*----------------------- TimeLeft Component ---------------------------*/

export function TimeLeft({time}) {
    const now = new Date();
    const coming = new Date(time);
    return <div><small className="time-left"> <Moment to={coming}>{now}</Moment></small></div>
}


/*----------------------- ExpiresIn Component ---------------------------*/

export function ExpiresIn({time, expiry}) {
    const now = new Date();
    const coming = new Date(time);
    return (
        <div>
            { expiry === 'expired' ? <h3 className="expired">This listing has expired.</h3>
                :
                <small className="time-left">Expires <Moment to={coming}>{now}</Moment>, {expiry}</small>}
        </div>
        )
}