import React, { Fragment } from 'react';

const MyProfileBio = ({bio}) => {
    return(
        <Fragment>
            <p className="my-profile-bio">{bio}</p>        
        </Fragment>
    )
}

export default MyProfileBio