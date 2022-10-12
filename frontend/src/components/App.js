import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import UserSelection from "./UserSelection";
import SimpleBuild from "./SimpleBuild";
import AdvancedBuild from "./AdvancedBuild";

// places this code in the index.html where 'App' div is
function App(props) {
    // sending html code to the page
    // brackets means javascript code within return statement
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route path="/simple-build" element={<SimpleBuild />} />
                    <Route path="/advanced-build" element={<AdvancedBuild />} />
                    <Route path="/selection/:buildCode" element={<UserSelection />} />
                </Routes>
            </Router>
        </div>
    );
}
export default App;

const appDiv = document.getElementById("app");
// <component_name /> is used to create new components
render(<App />, appDiv);