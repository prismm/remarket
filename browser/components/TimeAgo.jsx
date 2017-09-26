import React  from 'react';
import Moment from 'react-moment';

/*----------------------- TimeAgo Component ---------------------------*/

export default function TimeAgo({time}) {
    return <div className="time-ago"> <Moment fromNow>{time}</Moment></div>
}

