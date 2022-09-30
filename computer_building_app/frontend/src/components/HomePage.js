import React, { Component } from 'react';
import UserSelectionPage from "./UserSelectionPage";
import FinalizeBuildPage from "./FinalizeBuildPage";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";

export default class HomePage extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Router>
                <Routes>
                    <Route path='/' element={<p>This is the home page</p>} />
                    <Route path='/selection' element={<UserSelectionPage />} />
                    <Route path='/final' element={<FinalizeBuildPage />} />
                </Routes>
            </Router>);
    }
}