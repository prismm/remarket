import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button'; 
import DeleteDialog from './DeleteDialog.jsx'

//BUTTONS FOR LISTING FUNCTIONS
/*-------- EditListingButton component ---------*/

//should redirect to editListing form;
export function EditListingButton({currentListing, editListing}) {
    return (
        <div className="my-listing-button-container">
            <Button
                raised
                secondary
                label="Edit"
                className="my-listing-button"
                onClick={() => editListing(currentListing.id, currentListing)}
            />
        </div>
    )
}

EditListingButton.propTypes = {
  currentListing: PropTypes.object.isRequired,
  editListing: PropTypes.func.isRequired
};

/*-------- DeleteListingButton component ---------*/

// alerts -- are you sure you want to delete this listing? if you might restore it in the future, archive it instead. (archive listing button) / (continue with delete => db soft delete)
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

/*-------- ArchiveListingButton component ---------*/

//sets db listing.status = archived;
export function ArchiveListingButton({currentListing, archiveListing}) {
    return (
        <div className="my-listing-button-container">
            <Button
                raised
                secondary
                label="Archive Listing"
                className="my-listing-button"
                onClick={() => archiveListing(currentListing.id)}
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
export function UpdateNameButton({currentUser, updateName, newName}) {
    return (
        <div className="user-button-container">
            <Button
                raised
                secondary
                label="update"
                className="user-button"
                onClick={() => updateName(currentUser.id, newName)}
            />
        </div>
    )
}
UpdateNameButton.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateName: PropTypes.func.isRequired,
  newName: PropTypes.string.isRequired
};

/*-------- UpdateUsernameButton component ---------*/

//sets db user.username = input;
export function UpdateUsernameButton({currentUser, updateUsername, newUsername}) {
    return (
        <div className="user-button-container">
            <Button
                raised
                secondary
                label="update"
                className="user-button"
                onClick={() => updateUsername(currentUser.id, newUsername)}
            />
        </div>
    )
}
UpdateUsernameButton.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateUsername: PropTypes.func.isRequired,
  newUsername: PropTypes.string.isRequired
};

/*-------- UpdateBioButton component ---------*/

//sets db user.bio = input;
export function UpdateBioButton({currentUser, updateBio, newBio}) {
    return (
        <div className="user-button-container">
            <Button
                raised
                secondary
                label="update"
                className="user-button"
                onClick={() => updateBio(currentUser.id, newBio)}
            />
        </div>
    )
}
UpdateBioButton.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateBio: PropTypes.func.isRequired,
  newBio: PropTypes.string.isRequired
};

/*-------- UpdateEmailButton component ---------*/

//sets db user.email = input;
export function UpdateEmailButton({currentUser, updateEmail, newEmail}) {
    return (
        <div className="user-button-container">
            <Button
                raised
                secondary
                label="update"
                className="user-button"
                onClick={() => updateEmail(currentUser.id, newEmail)}
            />
        </div>
    )
}
UpdateEmailButton.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updateEmail: PropTypes.func.isRequired,
  newEmail: PropTypes.string.isRequired
};

/*-------- UpdatePassword component ---------*/

//sets db user.password = input;
export function UpdatePasswordButton({currentUser, updatePassword, newPassword}) {
    return (
        <div className="user-button-container">
            <Button
                raised
                secondary
                label="update"
                className="user-button"
                onClick={() => updatePassword(currentUser.id, newPassword)}
            />
        </div>
    )
}
UpdatePasswordButton.propTypes = {
  currentUser: PropTypes.object.isRequired,
  updatePassword: PropTypes.func.isRequired,
  newPassword: PropTypes.string
};