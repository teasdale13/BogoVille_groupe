import React from "react";
import Page from "./pages/Page";
import GestionType from "./pages/GestionType";
import {BrowserRouter as Router, Route} from "react-router-dom";
import GestionProbleme from "./pages/GestionProbleme";
import Accueil from "./pages/Accueil";

function Nav() {
    return (

        <Router>
                <Route exact path="/" component={Accueil} />

                <Route path="/Page" component={Page} />

            <Route path="/GestionType" component={GestionType}/>

            <Route path="/GestionProbleme" component={GestionProbleme}/>

            <Route path="/GestionStatut" component={GestionStatut}/>

        </Router>
    );
}

export default Nav;

