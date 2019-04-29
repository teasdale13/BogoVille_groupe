import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MenuItem from "./Page";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';

function Cdrawer(){



    return (
            <div className="Link">
                <Link to="/" style={{textDecoration: 'none'}}><MenuItem>Menu</MenuItem></Link>
                <Link to="/BootStrap" style={{textDecoration: 'none'}}><MenuItem>BootStrap</MenuItem></Link>
                <Link to="/GestionType" style={{textDecoration: 'none'}}><MenuItem>Gestion des types</MenuItem></Link>
                <RaisedButton label="Fermer" onClick={this.handleToggle}/>
            </div>)
        }

export default Cdrawer;

