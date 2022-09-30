import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";

// places this code in the index.html where 'App' div is
export default class App extends Component {
    constructor(props){
        super(props);
    }
    // sending html code to the page
    // brackets means javascript code within return statement
    render(){
        return(
            <div>
                <HomePage />
            </div>
        );
    }
}

const appDiv = document.getElementById("app");
// <component_name /> is used to create new components
render(<App />, appDiv);