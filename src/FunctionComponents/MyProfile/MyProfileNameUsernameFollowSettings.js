import React, { Fragment } from 'react';
import {FiSettings} from 'react-icons/fi'

const MyProfileNameUsernameFollowSettings = ({username, name, myprofile, connection}) => {
    return (
        <Fragment>
            {/* <div className="row"> */}
                <div className="border"><h1 className="my-profile-username">{username}</h1></div>
                <div className="border"><h6>{name}</h6></div>
                <div className="col-md-12 col-12 border"><button className="my-profile-connection-button my-profile-connection-button-good">follow</button> <FiSettings className="my-profile-settings-icon"></FiSettings></div>
            {/* </div> */}
        </Fragment>
    )
}

export default MyProfileNameUsernameFollowSettings