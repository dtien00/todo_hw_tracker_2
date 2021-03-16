// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="navbar">
                <div id="title-div">
                    Todo Tracker
                </div>
            </div>
        );
    }
}

export default Navbar;