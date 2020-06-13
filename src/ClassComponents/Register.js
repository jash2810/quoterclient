import React, { Component, Fragment } from 'react'
import Axios from 'axios'
import config from 'react-global-configuration'
import {Redirect} from 'react-router-dom'

// import '../App.css'
import GeneralFormTitle from '../ReusableComponents/GeneralFormTitle'
import GeneralFormInput from '../ReusableComponents/GeneralFormInput'
import GeneralFormDate from '../ReusableComponents/GeneralFormDate'
import GeneralFormTextarea from '../ReusableComponents/GeneralFormTextarea'
import GeneralFormSelect from '../ReusableComponents/GeneralFormSelect'
import GeneralFormNumber from '../ReusableComponents/GeneralFormNumber'
import GeneralFormEmail from '../ReusableComponents/GeneralFormEmail'
import GeneralFormPassword from '../ReusableComponents/GeneralFormPassword'
import GeneralFormButton from '../ReusableComponents/GeneralFormSubmit'
import GeneralComponentMsg from '../ReusableComponents/GeneralComponentMsg'

class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            states: null,
            state: null, //selected
            cities: null,
            city: null,
            name: '', dob: null, gender: '', bio: '', phone: '', email: '', username: '', password: '',
            numberError: null, emailError: null, nameError: null, dobError: null, genderError: null, bioError: null, usernameError: null, passwordError: null,
            componentError: null, componentSuccess: null,
            redirectToLogin: false
        }
    }
    
    componentDidMount() {
        Axios.get(config.get('server')+'/general/localities/states')
            .then(res => {
                this.setState({states: res.data.states, state: res.data.states[0]})
                Axios.get(config.get('server')+'/general/localities/'+res.data.states[0])
                    .then(res1 => {
                        this.setState({cities: res1.data.cities, city: res1.data.cities[0]})
                    })
                    .catch(err1 => console.log(err1))
            })
            .catch(err => console.log(err))
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    onChangeState = (e) => {
        var state = e.target.value
        Axios.get(config.get('server')+'/general/localities/'+state)
            .then(res => {
                this.setState({cities: res.data.cities, city: res.data.cities[0], state: state})
            })
    }
    onChangeNumber = (e) => {
        var phone = e.target.value
        if (!isNaN(phone)) {
            if (phone.length <= 10) {
                this.setState({phone: phone, numberError: null})                
            } else {
                this.setState({numberError: 'Phone number should be less than 10 digits'})
            }
        } else {
            this.setState({numberError: 'Enter only digits'})
        }
    }
    onChangeUsername = (e) => {
        var username = e.target.value
        var usernametemp = username
        var lastchar = username[username.length - 1]
        if (lastchar === " ") {
            usernametemp = username.substring(0, username.length - 1) + "_"
            this.setState({username: usernametemp})
        } else {
            this.setState({username: username})
        }
        var data = {username: usernametemp}
        Axios.post(config.get('server')+'/auth/checkUsername', data)
            .then(res => {
                if (res.data.status) {
                    this.setState({usernameError: null})
                } else {
                    this.setState({usernameError: 'this username is already taken'})
                }
            })
            .catch(err => console.log(err))
    }
    onChangeEmail = (e) => {
        var email = e.target.value
        this.setState({email: email})
    }
    onChangePassword = (e) => {
        var password = e.target.value
        this.setState({password: password})
        if (password.length >= 4 && password.length <=20) {
            this.setState({passwordError: null})
            
            var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

            if(format.test(password)){
                this.setState({passwordError: null})
                var format1 = /[0-9?]+/;

                if (format1.test(password)) {
                    this.setState({passwordError: null})
                } else {
                    this.setState({passwordError: 'must have atleast one number'})                
                }
            } else {
                this.setState({passwordError: 'must have atleast one special character'})
            }
        } else {
            this.setState({passwordError: 'length of password must be in between 4 and 20 characters'})
        }
    }
    register = () => {
        
        var r = this.validateForm()
        

        if (r) {
            this.setState({componentError: null})
            var data = {
                name: this.state.name,
                dob: this.state.dob,
                gender: this.state.gender,
                bio: this.state.bio,
                state: this.state.state,
                city: this.state.city,
                phone: this.state.phone,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            }
            Axios.post(config.get('server')+'/auth/register', data)
                .then(res => {
                    if (res.data.success) {
                        this.setState({componentSuccess: res.data.msg, redirectToLogin: true})
                    }
                })
        } else {
            this.setState({componentError: 'enter data properly!'})
        }
    }
    validateForm = () => {
        var registerFlag = true
        if (this.state.name !== "") {
            this.setState({nameError: null})
            if (this.state.name.length >= 2) {
                this.setState({nameError: null})    
                var format = /[0-9?]+/

                if (!format.test(this.state.name)) {
                    this.setState({nameError: null})
                } else {
                    this.setState({nameError: 'numbers are not allowed in name'})
                    registerFlag = false
                }

            } else {
                this.setState({nameError: 'your name should be more than one character'})
                registerFlag = false
            }
        } else {
            this.setState({nameError: 'You must enter your name here'})
            registerFlag = false
        }

        if (this.state.dob !== null) {
            this.setState({dobError: null})
        } else {
            this.setState({dobError: 'enter your birthdate'})
            registerFlag = false
        }

        if (this.state.gender !== '') {
            this.setState({genderError: null})
        } else {
            this.setState({genderError: 'enter your gender'})
            registerFlag = false
        }

        if (this.state.bio.length >= 100) {
            var len = this.state.bio.length
            this.setState({bioError: 'bio must be less than 100 characters long. it is '+len+' characters right now.'})
            registerFlag = false
        } else {
            this.setState({bioError: null})
        }

        if (this.state.email !== '') {
            var format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            this.setState({emailError: null})
            if (format.test(this.state.email)) {
                this.setState({emailError: null})
            } else {
                this.setState({emailError: 'email format is wrong'})
                registerFlag = false    
            }
        } else {
            this.setState({emailError: 'you must enter email'})
            registerFlag = false
        }

        if (this.state.username !== '') {
            if (this.state.usernameError !== null) {
                registerFlag = false
            }
        } else {
            this.setState({usernameError: 'enter your username'})
            registerFlag = false
        }

        if (this.state.password !== '') {
            if (this.state.passwordError !== null) {
                registerFlag = false
            }
        } else {
            this.setState({passwordError: 'enter your password'})
            registerFlag = false
        }

        return registerFlag
    }

    render() {
        return (
             <Fragment>
                <div className="container">

                    {this.state.componentError ? (<GeneralComponentMsg msg={this.state.componentError} fail={this.state.componentError ? (true) : (false)} />) : (null)}
                    {this.state.componentSuccess ? (<GeneralComponentMsg msg={this.state.componentSuccess} success={this.state.componentSuccess ? (true) : (false)} />) : (null)}

                    <GeneralFormTitle title="Create Account" />                        

                    <div className="row">
                        <GeneralFormInput col="6" smallcol="12" lable="Name: " name="name" placeholder="enter name here" onChange={this.onChange} value={this.state.name} error={this.state.nameError} />
                        <GeneralFormDate  col="3" smallcol="6" lable="Date of Birth: " name="dob" onChange={this.onChange} value={this.state.dob} error={this.state.dobError} />
                        <GeneralFormSelect col="3" smallcol="6" lable="gender" name="gender" disabledText="Gender" options={['male', 'female', 'other']} onChange={this.onChange} error={this.state.genderError} />
                        <GeneralFormTextarea col="6" lable="bio: " name="bio" onChange={this.onChange} value={this.state.bio} error={this.state.bioError} />
                        {this.state.states ? (<GeneralFormSelect col="3" smallcol="6" lable="State" name="state" options={this.state.states} onChange={this.onChangeState} />) : (null)}
                        {this.state.states && this.state.cities ? (<GeneralFormSelect col="3" smallcol="6" lable="City" name="city" options={this.state.cities} />) : (null)}
                    </div>

                    <div className="row">
                        <GeneralFormNumber col="6" smallcol="12" lable="Phone: " name="phone" placeholder="contact number" onChange={this.onChangeNumber} value={this.state.phone} error={this.state.numberError} />
                        <GeneralFormEmail col="6" smallcol="12" lable="Email: " name="email" placeholder="email id" onChange={this.onChangeEmail} value={this.state.email} error={this.state.emailError} />
                    </div>

                    <div className="row">
                        <GeneralFormInput col="6" smallcol="12" lable="Username: " name="username" placeholder="enter name here" onChange={this.onChangeUsername} value={this.state.username} error={this.state.usernameError} />                           
                        <GeneralFormPassword col="6" smallcol="12" lable="Password: " name="password" placeholder="enter password" onChange={this.onChangePassword} value={this.state.password} error={this.state.passwordError} />
                    </div>

                    <div className="row">
                        <GeneralFormButton col="3" smallcol="12" text="Create Account" onClick={this.register} />
                    </div>
                </div>
                {this.state.redirectToLogin ? (<Redirect to="/login" />) : (null)}
             </Fragment>
        );
    }
}

export default Register