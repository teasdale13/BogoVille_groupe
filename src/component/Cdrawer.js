import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import MenuItem from "material-ui/MenuItem";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener/index';
import Drawer from "material-ui/Drawer";

export default class Cdrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.toggleButton = this.toggleButton.bind(this);
        this.clickAway = this.clickAway.bind(this);
    }

    /**
     * Fonction qui prend la fonction passée en parametre par le parent
     * pour faire changer le State du Drawer.
     */
    toggleButton() {
        // Méthode passée par le parent
        this.props.drawerButton(this.setState({open: this.state.isOpen}));
    }

    /**
     * Fonction qui capte les clics hors du Drawer et s'il est ouvert il le ferme.
     */
    clickAway() {
        if (this.props.drawer) {
            this.setState({isOpen: !this.state.isOpen});
            this.toggleButton();
        }
    }

    render() {
        return (
            // Permet de capter les clics en dehors du drawer pour le fermer.
            <ClickAwayListener onClickAway={this.clickAway}>
                <div>
                    <Drawer open={this.props.drawer} className="Drawer">
                        <div className="Link">
                            <Link to="/" style={{textDecoration: 'none'}}><MenuItem>Menu</MenuItem></Link>
                            <Link to="/GestionType" style={{textDecoration: 'none'}}><MenuItem>Gestion des
                                types</MenuItem></Link>
                            <Link to="/GestionProbleme" style={{textDecoration: 'none'}}><MenuItem>Gestion des
                                Problèmes</MenuItem></Link>
                            <RaisedButton label="Fermer" onClick={this.toggleButton}/>
                        </div>
                    </Drawer>
                </div>
            </ClickAwayListener>
        )
    }
}



