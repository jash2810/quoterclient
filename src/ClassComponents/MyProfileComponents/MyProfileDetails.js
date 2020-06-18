import React, { Component, Fragment } from 'react';
import profileIcon from '../../icons/profile.png'
import Axios from 'axios';
import config from 'react-global-configuration'
import MyProfileNameUsernameFollowSettings from '../../FunctionComponents/MyProfile/MyProfileNameUsernameFollowSettings';
import MyProfileConnectionsPosts from '../../FunctionComponents/MyProfile/MyProfileConnectionsPosts';
import MyProfileBio from '../../FunctionComponents/MyProfile/MyProfileBio';
import MyProfileImg from '../../FunctionComponents/MyProfile/MyProfileImg';
class MyProfileDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userid: this.props.userid,
            profile: null
        }
    }

    componentDidMount() {
        var data = {
            userId: this.state.userid
        }
        Axios.post(config.get('server')+'/user/myprofile/', data)
            .then(res => {
                if (res.data.success) {                    
                    
                    this.setState({profile: res.data.profile})
                } else {

                }
            })
    }

    render() {
        return (
             <Fragment>
                 <div className="row border">
                        <div className="col-md-5 col-4 border">
                            <MyProfileImg />
                        </div>
                        <div className="col-md-7 col-8 my-profile-username-section border">
                            <div className="border">
                                {this.state.profile ? (<MyProfileNameUsernameFollowSettings username={this.state.profile.cred.username} name={this.state.profile.details.name} connection={"follow"} myprofile={this.props.myprofile} />) : (null)}
                            </div>                            
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">                            
                            <MyProfileConnectionsPosts posts={23} following={32} followers={12} endorsements={10}/>                            
                        </div>
                    </div>

                    <div className="row border">
                        <div className="col-md-12">
                            {this.state.profile ? (<MyProfileBio bio={this.state.profile.details.bio} />) : (null)}
                        </div>
                    </div>

             </Fragment>
        );
    }
}

export default MyProfileDetails