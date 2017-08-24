import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import Media from 'react-md/lib/Media';
import Button from 'react-md/lib/Buttons';

const ExpandableMediaCard = ({key, file}) => {
  const { name, uploadResult } = file;
  return (
    <Card key= {key} className="md-cell uploaded-background-card">
        <Media className="uploaded-pic">
          <img className="uploaded-pic-img" src={uploadResult} alt={name} />
        </Media>
      <Button icon data-name={name} className="close-btn close-img-button">close</Button>
    </Card>
)};

export default ExpandableMediaCard;