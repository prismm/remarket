import React from 'react';

import Card from 'react-md/lib/Cards/Card';
import Media from 'react-md/lib/Media';
import Button from 'react-md/lib/Buttons';

/*----------------------- UploadedFileCard Component ---------------------------*/

const UploadedFileCard = ({key, photo}) => {
  const { name, link } = photo;
  return (
    <Card key= {key} className="md-cell uploaded-background-card">
        <Media className="uploaded-pic" key= {key} >
          <img className="uploaded-pic-img" key= {key} src={link} alt={name} />
        </Media>
      <Button icon data-name={name} key={name} data-link={link} className="close-btn close-img-button">close</Button>
    </Card>
)};

export default UploadedFileCard;