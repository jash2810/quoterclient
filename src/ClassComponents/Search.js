import React, { Component, Fragment } from 'react';
import Footer from './Footer';

class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
             <Fragment>
                 Search
                 <Footer activePage={"search"} />
             </Fragment>
        );
    }
}

export default Search