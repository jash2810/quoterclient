import React, { Component, Fragment } from 'react';
import GeneralFormTitle from '../ReusableComponents/GeneralFormTitle';
import GeneralComponentMsg from '../ReusableComponents/GeneralComponentMsg';
import GeneralFormInput from '../ReusableComponents/GeneralFormInput';
import GeneralFormPassword from '../ReusableComponents/GeneralFormPassword';
import GeneralFormButton from '../ReusableComponents/GeneralFormSubmit';
import Axios from 'axios';
import config from 'react-global-configuration'
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: null, usernameError: null,
            password: null, passwordError: null,
            componentError: null, componentSuccess: null,
            redirectSuccess: false
        }
    }
    onChangeUsername = (e) => {
        var username = e.target.value

        this.setState({username: username})
    }
    onChangePassword = (e) => {
        var password = e.target.value

        this.setState({password: password})
    }
    login = () => {
        var r = this.validateForm()

        if (r) {
            var data = {username: this.state.username, password: this.state.password}
            Axios.post(config.get('server')+'/auth/login', data)
                .then(res => {
                    if (res.data.success) {
                        localStorage.setItem('user', res.data.token)
                        this.setState({redirectSuccess: true})
                    } else {
                        this.setState({componentError: res.data.msg})
                    }
                })
                .catch(err => console.log(err))
        } else {
            
        }
    }
    validateForm = () => {
        var loginFlag = true

        if (this.state.username === null) {
            this.setState({usernameError: 'enter username'})
            loginFlag = false
        } else {
            this.setState({usernameError: null})
        }

        if (this.state.password === null) {
            this.setState({passwordError: 'enter password'})
            loginFlag = false
        } else {
            this.setState({passwordError: null})
        }

        return loginFlag
    }

    render() {
        return(
            <Fragment>
                
                <div className="container">
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            {this.state.componentError ? (<GeneralComponentMsg msg={this.state.componentError} fail={this.state.componentError ? (true) : (false)} />) : (null)}
                            {this.state.componentSuccess ? (<GeneralComponentMsg msg={this.state.componentSuccess} success={this.state.componentSuccess ? (true) : (false)} />) : (null)}

                            <GeneralFormTitle title="Login" />                        

                            <div className="row">
                                <GeneralFormInput col="12" smallcol="12" lable="Username: " name="username" placeholder="enter name here" onChange={this.onChangeUsername} value={this.state.username} error={this.state.usernameError} />                           
                            </div>
                            <div className="row">
                                <GeneralFormPassword col="12" smallcol="12" lable="Password: " name="password" placeholder="enter password" onChange={this.onChangePassword} value={this.state.password} error={this.state.passwordError} />
                            </div>

                            <div className="row">
                                <GeneralFormButton col="12" smallcol="12" text="Login" onClick={this.login} />
                            </div>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
                {this.state.redirectSuccess ? (<Redirect to={"/user/"+this.state.username} />) : (null)}
            </Fragment>
        )
    }
}

export default Login