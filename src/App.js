import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import './Styles/main.css'

import MyRoutes from './RoutesComponents/MyRoutes'
import BrandTitle from './ReusableComponents/BrandTitle';

class App extends Component { 
  render() {
    return(
      <Router>    
        <BrandTitle title="Quoter" />      
        <MyRoutes />
      </Router>
    )
  }
}
 
export default App;