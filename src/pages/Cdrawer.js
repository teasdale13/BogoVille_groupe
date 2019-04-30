import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MenuItem from "material-ui/MenuItem";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from "material-ui/Drawer";

export default class Cdrawer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        };
        this.toggleButton = this.toggleButton.bind(this);
    }

    toggleButton(){
        // Méthode passée par le parent
        this.props.drawerButton(this.setState({open: this.state.isOpen}));
    }

    render(){
        return (
            <div>
                <Drawer open={this.props.drawer} className="Drawer">
                    <div className="Link">
                        <Link to="/" style={{textDecoration: 'none'}}><MenuItem>Menu</MenuItem></Link>
                        <Link to="/BootStrap" style={{textDecoration: 'none'}}><MenuItem>BootStrap</MenuItem></Link>
                        <Link to="/GestionType" style={{textDecoration: 'none'}}><MenuItem>Gestion des types</MenuItem></Link>
                        <Link to="/GestionProbleme" style={{textDecoration: 'none'}}><MenuItem>Gestion des Problèmes</MenuItem></Link>
                        <RaisedButton label="Fermer" onClick={this.toggleButton}/>
                    </div>
                </Drawer>
            </div>

        )
    }
    }



