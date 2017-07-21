import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import injectTooltip from 'react-md/lib/Tooltips';

export const NyuAvatar = injectTooltip(({ tooltip }) => (
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

export const YaleAvatar = injectTooltip(({ tooltip }) => (
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

export const HarvardAvatar = injectTooltip(({ tooltip }) => (
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

export const ColumbiaAvatar = injectTooltip(({ tooltip }) => (
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

export const MitAvatar = injectTooltip(({ tooltip }) => (
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

export const UPennAvatar = injectTooltip(({ tooltip }) => (
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

export const PrincetonAvatar = injectTooltip(({ tooltip }) => (
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
            <NyuAvatar tooltipLabel="NYU" tooltipPosition="top" />
            <HarvardAvatar tooltipLabel="Harvard" tooltipPosition="top" />
            <YaleAvatar tooltipLabel="Yale" tooltipPosition="top" />
            <ColumbiaAvatar tooltipLabel="Columbia" tooltipPosition="top" />
            <PrincetonAvatar tooltipLabel="Princeton" tooltipPosition="top" />
            <MitAvatar tooltipLabel="MIT" tooltipPosition="top" />
            <UPennAvatar tooltipLabel="UPenn" tooltipPosition="top" />
        </div>
    )
}