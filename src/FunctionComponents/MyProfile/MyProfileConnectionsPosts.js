import React, {Fragment} from 'react';

const MyProfileConnectionsPosts = ({posts, following, followers, endorsements}) => {
    return(
        <Fragment>
            <div className="col-md-2 col-3 my-profile-stats">
                <h1 className="my-profile-stats-number">{posts}</h1>
                <span className="my-profile-stats-tag">Posts</span>
            </div>
            <div className="col-md-2 col-3 my-profile-stats">
                <h1 className="my-profile-stats-number">{following}</h1>
                <span className="my-profile-stats-tag">Following</span>    
            </div>
            <div className="col-md-2 col-3 my-profile-stats">
                <h1 className="my-profile-stats-number">{followers}</h1>
                <span className="my-profile-stats-tag">Followers</span>
            </div>
            <div className="col-md-2 col-3 my-profile-stats">
                <h1 className="my-profile-stats-number">{endorsements}</h1>
                <span className="my-profile-stats-tag">Endorsements</span>
            </div>
        </Fragment>
    )
}

export default MyProfileConnectionsPosts