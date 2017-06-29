import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button'; 
import DeleteDialog from './DeleteDialog.jsx'

//LISTING FUNCTIONS
/*-------- EditListingButton component ---------*/

//should redirect to editListing form;
export function EditListingButton({currentListing, editListing}) {
    return (
        <div className="my-listing-button-container">
            <Button
                raised
                secondary
                label="Edit Listing"
                className="my-listing-button"
                onClick={() => editListing(currentListing)}
            />
        </div>
    )
}

EditListingButton.propTypes = {
  currentListing: PropTypes.object.isRequired,
  editListing: PropTypes.func.isRequired
};

/*-------- DeleteListingButton component ---------*/

//should alert -- are you sure you want to delete this listing? if you might restore it in the future, archive it instead. (archive listing button) / (continue with delete => db soft delete)
export function DeleteListingButton({archiveListing, currentListing, deleteListing}) {
    return (
        <DeleteDialog deleteListing={deleteListing} archiveListing={archiveListing} currentListing={currentListing} />
    )
}
DeleteListingButton.propTypes = {
  currentListing: PropTypes.object.isRequired,
  deleteListing: PropTypes.func.isRequired,
  archiveListing: PropTypes.func.isRequired
};

/*-------- RenewListingButton component ---------*/

//should launch date-picker to edit expiration date of listing;
export function RenewListingButton({currentListing, renewListing}) {
    return (
        <div className="my-listing-button-container">
            <Button
                raised
                secondary
                label="Renew Listing"
                className="my-listing-button"
                onClick={() => renewListing(currentListing)}
            />
        </div>
    )
}

RenewListingButton.propTypes = {
  currentListing: PropTypes.object.isRequired,
  renewListing: PropTypes.func.isRequired
};

/*-------- ContinueDeleteListingButton component ---------*/

//
export function ContinueDeleteListingButton({currentListing, continueDeleteListing}) {
    return (
        <div className="my-listing-button-container">
            <Button
                raised
                secondary
                label="Continue with Delete Listing"
                className="my-listing-button"
                onClick={() => continueDeleteListing(currentListing)}
            />
        </div>
    )
}
ContinueDeleteListingButton.propTypes = {
  currentListing: PropTypes.object.isRequired,
  continueDeleteListing: PropTypes.func.isRequired
};

/*-------- ArchiveListingButton component ---------*/

//sets db listing.status = archived;
export function ArchiveListingButton({currentListing, archiveListing}) {
    return (
        <div className="my-listing-button-container">
            <Button
                raised
                secondary
                label="Continue with Delete Listing"
                className="my-listing-button"
                onClick={() => archiveListing(currentListing)}
            />
        </div>
    )
}
ArchiveListingButton.propTypes = {
  currentListing: PropTypes.object.isRequired,
  archiveListing: PropTypes.func.isRequired
};

//USER FUNCTIONS
/*-------- UpdateNameButton component ---------*/

//sets db user.name = input;
export function UpdateNameButton({currentUser, updateName}) {
    return (
        <div className="user-button-container">
            <Button
                raised
                secondary
                label="update NAME"
                className="user-button"
                onClick={() => updateName(currentUser)}
            />
        </div>
    )
}
UpdateNameButton.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateName: PropTypes.func.isRequired
};

/*-------- UpdateUsernameButton component ---------*/

//sets db user.username = input;
export function UpdateUsernameButton({currentUser, updateUsername}) {
    return (
        <div className="user-button-container">
            <Button
                raised
                secondary
                label="update USERNAME"
                className="user-button"
                onClick={() => updateUsername(currentUser)}
            />
        </div>
    )
}
UpdateUsernameButton.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateUsername: PropTypes.func.isRequired
};

/*-------- UpdateBioButton component ---------*/

//sets db user.bio = input;
export function UpdateBioButton({currentUser, updateBio}) {
    return (
        <div className="user-button-container">
            <Button
                raised
                secondary
                label="update BIO"
                className="user-button"
                onClick={() => updateBio(currentUser)}
            />
        </div>
    )
}
UpdateBioButton.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateBio: PropTypes.func.isRequired
};

/*-------- UpdateEmailButton component ---------*/

//sets db user.email = input;
export function UpdateEmailButton({currentUser, updateEmail}) {
    return (
        <div className="user-button-container">
            <Button
                raised
                secondary
                label="update EMAIL"
                className="user-button"
                onClick={() => updateEmail(currentUser)}
            />
        </div>
    )
}
UpdateEmailButton.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateEmail: PropTypes.func.isRequired
};

/*-------- UpdatePassword component ---------*/

//sets db user.password = input;
export function UpdatePasswordButton({currentUser, updatePassword}) {
    return (
        <div className="user-button-container">
            <Button
                raised
                secondary
                label="update PASSWORD"
                className="user-button"
                onClick={() => updatePassword(currentUser)}
            />
        </div>
    )
}
UpdatePasswordButton.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updatePassword: PropTypes.func.isRequired
};