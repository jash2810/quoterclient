import React, {Fragment} from 'react';

const MyProfileConnectionsPosts = ({posts, following, followers, endorsements}) => {
    return(
        <Fragment>
            <p>{posts} posts | {following} following | {followers} followers | {endorsements} endorsements</p>
        </Fragment>
    )
}

export default MyProfileConnectionsPosts