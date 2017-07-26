import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import injectTooltip from 'react-md/lib/Tooltips';


export const NetworkAvatar = injectTooltip(({ tooltip, network }) => (
        <div className="inline-rel-container">
            <Avatar
                className="avatar"
                src={`/imgs/${network}.png`}
                role="presentation"
            />
            {tooltip}
        </div>
    )
);


export const NYU = injectTooltip(({ tooltip }) => (
        <div className="inline-rel-container">
            <Avatar
                className="avatar"
                src={'/imgs/nyu.png'}
                role="presentation"
            />
            {tooltip}
        </div>
    )
);

export const Yale = injectTooltip(({ tooltip }) => (
        <div className="inline-rel-container">
            <Avatar
                className="avatar"
                src={'/imgs/yale.png'}
                role="presentation"
            />
            {tooltip}
        </div>
    )
);

export const Harvard = injectTooltip(({ tooltip }) => (
        <div className="inline-rel-container">
            <Avatar
                className="avatar"
                src={'/imgs/harvard.png'}
                role="presentation"
            />
            {tooltip}
        </div>
    )
);

export const Columbia = injectTooltip(({ tooltip }) => (
        <div className="inline-rel-container">
            <Avatar
                className="avatar"
                src={'/imgs/columbia.png'}
                role="presentation"
            />
            {tooltip}
        </div>
    )
);

export const MIT = injectTooltip(({ tooltip }) => (
        <div className="inline-rel-container">
            <Avatar
                className="avatar"
                src={'/imgs/mit.png'}
                role="presentation"
            />
            {tooltip}
        </div>
    )
);

export const UPenn = injectTooltip(({ tooltip }) => (
        <div className="inline-rel-container">
            <Avatar
                className="avatar"
                src={'/imgs/upenn.gif'}
                role="presentation"
            />
            {tooltip}
        </div>
    )
);

export const Princeton = injectTooltip(({ tooltip }) => (
        <div className="inline-rel-container">
            <Avatar
                className="avatar"
                src={'/imgs/princeton.png'}
                role="presentation"
            />
            {tooltip}
        </div>
    )
);

export const AllAvatars = () => {
    return (
        <div>
            <NYU tooltipLabel="NYU" tooltipPosition="top" />
            <Harvard tooltipLabel="Harvard" tooltipPosition="top" />
            <Yale tooltipLabel="Yale" tooltipPosition="top" />
            <Columbia tooltipLabel="Columbia" tooltipPosition="top" />
            <Princeton tooltipLabel="Princeton" tooltipPosition="top" />
            <MIT tooltipLabel="MIT" tooltipPosition="top" />
            <UPenn tooltipLabel="UPenn" tooltipPosition="top" />
        </div>
    )
}