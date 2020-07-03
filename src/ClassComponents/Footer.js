import React, { Component } from 'react';
import {FaSearch} from 'react-icons/fa'
import {MdPerson} from 'react-icons/md'
import { Redirect } from 'react-router-dom';
import jwt from 'jwt-decode'

var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}

class Footer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activePage: this.props.activePage,
            redirectToSearchPageTrigger: false,
            redirectToProfilePageTrigger: false
        }
    }

    redirectToSearchPage = () => {
        this.setState({redirectToSearchPageTrigger: true})
    }
    redirectToProfilePage = () => {
        this.setState({redirectToProfilePageTrigger: true})
    }
    render() {
        return (
            <div>
                <div style={phantom} />
                <div style={style}>
                    <div className="row">
                        <div className="col-md-3 col-3">
                            <FaSearch style={{fontSize: "16px"}} className={this.state.activePage === "search" ? ("footer-search-icon-active") : ("footer-search-icon")} onClick={this.redirectToSearchPage}></FaSearch>
                        </div>
                        <div className="col-md-3 col-3">
                            <MdPerson style={{fontSize: "20px"}} className={this.state.activePage === "profile" ? ("footer-profile-icon-active") : ("footer-profile-icon")} onClick={this.redirectToProfilePage}></MdPerson>
                        </div>
                    </div>
                </div>
                {this.state.redirectToSearchPageTrigger ? (<Redirect to="/search"/>) : (null)}
                {this.state.redirectToProfilePageTrigger ? (<Redirect to={"/user/"+jwt(localStorage.getItem('user')).username}/>) : (null)}
            </div>
        )
    }
}

export default Footer