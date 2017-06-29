import React, { PureComponent } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';
import PropTypes from 'prop-types';

export default class DeleteDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialogandArchive = this.closeDialogandArchive.bind(this);
    this.closeDialogandDelete = this.closeDialogandDelete.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  openDialog() {
    this.setState({ visible: true });
  }

  closeDialog(){
    this.setState({ visible: false });
  }
  closeDialogandArchive(){
    this.setState({ visible: false });
    this.props.archiveListing(this.props.currentListing);
  }

  closeDialogandDelete(){
    this.setState({ visible: false });
    this.props.deleteListing(this.props.currentListing);
  }

  render() {
    const { visible } = this.state;
    return (
      <div className="my-listing-button-container">
        <Button raised secondary onClick={this.openDialog} label="Delete Listing" className="my-listing-button" />
        <Dialog
          id="speedBoost"
          visible={visible}
          title="Are you sure?"
          onHide={this.closeDialog}
          aria-labelledby="speedBoostDescription"
          className="dialog-delete"
          modal
          actions={[{
            onClick: this.closeDialogandArchive,
            primary: true,
            label: 'Archive it!',
          }, {
            onClick: this.closeDialogandDelete,
            primary: true,
            label: 'Continue with delete',
          }, {
            onClick: this.closeDialog,
            primary: true,
            label: 'x'
          }]}
        >
          <p id="speedBoostDescription" className="md-color--secondary-text">
            Are you sure you want to delete this listing? if you might restore it in the future, consider archiving it instead.
          </p>
        </Dialog>
      </div>
    );
  }
}

DeleteDialog.propTypes = {
  currentListing: PropTypes.object.isRequired,
  deleteListing: PropTypes.func.isRequired,
  archiveListing: PropTypes.func.isRequired
};