import React from "react";
import Page from "./pages/Page";
import GestionType from "./pages/GestionType";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GestionProbleme from "./pages/GestionProbleme";
import notification from "./pages/GestionNotification/notification";




function Nav() {
    return (

        <Router>
                <Route exact path="/" component={Page} />
                <Route path="/GestionType" component={GestionType} />
                <Route path="/GestionProbleme" component={GestionProbleme} />
                <Route path="/GestionNotification/notification" component={notification} />

        </Router>
    );
}

export default Nav;

