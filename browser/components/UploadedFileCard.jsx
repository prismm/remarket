import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import Media, { MediaOverlay } from 'react-md/lib/Media';
import Avatar from 'react-md/lib/Avatars';
import Button from 'react-md/lib/Buttons';


const ExpandableMediaCard = ({key, file}) => (
  <Card key= {key} style={{ maxWidth: 300 }} className="md-paper md-paper--1 md-card md-background--card md-cell uploaded">
    <Media>
      <img src={file} role="presentation" />
      <MediaOverlay>
        <CardTitle className="file-title" title={file.name} />
      </MediaOverlay>
      <button data-name={file} type="button" className="md-inline-block md-btn md-btn--icon md-pointer--hover close-btn">
          <div className="md-ink-container" />
          <i className="md-icon material-icons">close</i>
    </button>
    </Media>
  </Card>
);

export default ExpandableMediaCard;