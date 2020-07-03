import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Register from '../ClassComponents/Register'
import Login from '../ClassComponents/Login';
import MyProfile from '../ClassComponents/MyProfile';
import Search from '../ClassComponents/Search';

const MyRoutes = () => {
    return(
        <React.Fragment>
            <Switch>
                <Route path="/register" exact component={Register} />   
                <Route path="/login" exact component={Login} />
                <Route path="/user/:username" exact component={MyProfile} />   
                <Route path="/search" exact component={Search} />   
            </Switch>
        </React.Fragment>
    )
}

export default MyRoutes