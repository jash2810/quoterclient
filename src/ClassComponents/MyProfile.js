import React, { Component, Fragment } from 'react';
import jwt_decode from 'jwt-decode'


import MyProfileDetails from './MyProfileComponents/MyProfileDetails';
import Footer from './Footer';

class MyProfile extends Component {
    constructor(props){
        super(props)

        this.state = {
            usernameFromURL: this.props.match.params.username,
            usernameFromToken: jwt_decode(localStorage.getItem('user')).username, idFromToken: jwt_decode(localStorage.getItem('user'))._id,
            myprofile: false, //if this is user's own profile then turn it true
        }
    }

    componentDidMount() {

        this.checkIsThisUsersOwnProfile()

    }

    checkIsThisUsersOwnProfile = () => {
        if (this.state.usernameFromURL === this.state.usernameFromToken) {
            this.setState({myprofile: true})
        }
    }

    render() {
        console.log(this.state);
        
        return (
             <Fragment>
                 
                <div className="container">

                    <MyProfileDetails myprofile={this.state.myprofile} userid={this.state.idFromToken} />

                    
                </div>
                <Footer activePage={"profile"} />
             </Fragment>
        );
    }
}

export default MyProfile