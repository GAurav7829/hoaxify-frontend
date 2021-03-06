import React from 'react';
import defaultPicture from '../assets/Profile.png';

const ProfileImageWithDefault = (props) => {
    let imageSource = defaultPicture;
    if (props.image) {
        imageSource = `/images/profile/${props.image}`;
    }
    return (
        <img {...props} src={props.src || imageSource}
            alt={props.alt}
            onError={event => {
                event.target.src = defaultPicture;
            }} />
    )
}

export default ProfileImageWithDefault;