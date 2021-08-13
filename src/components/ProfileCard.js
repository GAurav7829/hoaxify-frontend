import React from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import Input from './Input';
import ButtonWithProgress from './ButtonWithProgress';

const ProfileCard = (props) => {
    const { displayName, username, image } = props.user;

    const showEditButton = props.isEditable && !props.isEditMode;

    return (
        <div className="card">
            <div className="card-header text-center">
                <ProfileImageWithDefault
                    className="rounded-circle shadow"
                    alt="profile"
                    width="200"
                    height="200"
                    image={image}
                />
            </div>
            <div className="card-body text-center">
                {!props.isEditMode && <h4>{`${displayName}@${username}`}</h4>}
                {props.isEditMode && <div className="mb-2">
                    <Input value={displayName}
                        label={`Change Display Name for ${username}`}
                        onChange={props.onChangeDisplayName}
                    />
                </div>}
                {showEditButton && <button className="btn btn-outline-success" onClick={props.onClickEdit}>
                    <i class="fas fa-user-edit"></i>Edit
                </button>}
                {props.isEditMode && (<div>
                    <ButtonWithProgress
                        className="btn btn-primary"
                        onClick={props.onClickSave}
                        text={<span><i class="fas fa-save mr-2"></i>Save</span>}
                        pendingApiCall={props.pendingUpdateCall}
                        disabled={props.pendingUpdateCall}
                    />
                    <button
                        className="btn btn-outline-secondary ml-2"
                        onClick={props.onClickCancel}
                        disabled={props.pendingUpdateCall}
                    >
                        <i class="fas fa-window-close mr-2"></i>Cancel
                    </button>
                </div>)}
            </div>
        </div>
    )
}

export default ProfileCard;