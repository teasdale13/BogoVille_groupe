import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import drawer from './Cdrawer';


import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export default class GestionType extends React.Component{

    constructor(props) {
        super(props);
        this.state = {open: false};
    }



    handleToggle = () => this.setState({open: !this.state.open});

    render(){


        return(
            <div className="App">
                <Drawer open={this.state.open} className="Drawer">

                </Drawer>
                <div className="Header">
                    <header>
                        <h1>Gestion des types</h1>
                        <h2>Select your player</h2>
                    </header>
                </div>
                <div className="NavBar">
                    <RaisedButton
                        label="Options Ultra Cool"
                        onClick={this.handleToggle}
                        primary={true}
                    />
                </div>
                <div className="Horizontal">

                    <div className="LeftFlex">
                        <p>??</p>
                    </div>

                    <div className="RightFlex">

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Nom</TableHeaderColumn>
                                    <TableHeaderColumn>Description</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableRowColumn>1</TableRowColumn>
                                    <TableRowColumn>Nid de poule</TableRowColumn>
                                    <TableRowColumn>Genre de trou dans la rue yo</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>2</TableRowColumn>
                                    <TableRowColumn>Borne fontaine</TableRowColumn>
                                    <TableRowColumn>Je sais pas c quoi mais criss ca coule</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>3</TableRowColumn>
                                    <TableRowColumn>Arbre dans rue</TableRowColumn>
                                    <TableRowColumn>Ca peux tu etre plus precis?</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>4</TableRowColumn>
                                    <TableRowColumn>Yolaine</TableRowColumn>
                                    <TableRowColumn>Yolaine a pas encore corriger calisse</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>5</TableRowColumn>
                                    <TableRowColumn>Hold up a une banque</TableRowColumn>
                                    <TableRowColumn>POW POW ca fait du bruit et ca fait peur</TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>

                    </div>
                </div>

                <div className="Footer">
                    <footer>
                        <p>FOOTER</p>
                    </footer>
                </div>
            </div>
        );
    }
}