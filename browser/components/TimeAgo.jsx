import React  from 'react';
import Moment from 'react-moment';

export default function TimeAgo({time}) {
    return <p className="time-ago" > <Moment fromNow>{time}</Moment></p>
}

