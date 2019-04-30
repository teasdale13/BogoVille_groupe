import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import Cdrawer from './Cdrawer';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';


export default class GestionProbleme extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            // Listes factices qui simule les requêtes au service REST
            status: [{id:1 , description: "status"},{id:2 , description: "status2"},{id:3 , description: "status3"},
                {id:4 , description: "status4"},{id:5 , description: "status5"},{id:6 , description: "status6"}],

            types: [{id:1 , description: "type1"},{id:2 , description: "type2"},{id:3 , description: "type3"},
                {id:4 , description: "type4"},{id:5 , description: "type5"},{id:6 , description: "type6"}] ,

            listRow: [{id: 1, type: 2, commentaire: "petite patate", statut: 1},
                {id: 2, type: 1, commentaire: "petite patate2", statut: 2},
                {id: 3, type: 5, commentaire: "petite patate3", statut: 2},
                {id: 4, type: 3, commentaire: "petite patate4", statut: 3},
                {id: 5, type: 6, commentaire: "petite patate5", statut: 3}],

            rows: [
                { id: 'id', numeric: true, disablePadding: false, label: 'ID' },
                { id: 'type', numeric: true, disablePadding: true, label: 'Type' },
                { id: 'commentaire', numeric: false, disablePadding: false, label: 'Commentaire' },
                { id: 'statut', numeric: true, disablePadding: true, label: 'Statut' }

            ],
        };
        this.drawerButton = this.drawerButton.bind(this);
        this.renderIndex = this.renderIndex.bind(this);
    }

    /**
     * Fonction qui change le state du Drawer.
     * la fonction est aussi passé à l'enfant pour lui permettre de changer le state
     */
    drawerButton(){
        this.setState({open: !this.state.open});
    }

    /**
     * Fonction qui remplace le ID (int) par la description qui lui est associé.
     *
     * @param id (FK)
     * @param model selon le model passé, la liste est différente.
     * @returns {*} la description associée au ID
     */
    renderIndex(id,model){
        let list = model === 'types'? this.state.types: this.state.status;
        for (let i = 0; i < list.length; i++){
            if (list[i].id === id){
                return list[i].description;
            }
        }
    }




    render(){
        // Créer un header dynamique.
        const tableHeader = this.state.rows.map(header =>
            <TableHeaderColumn>
                {header.label}
            </TableHeaderColumn>
        );
        // créer un tableau dynamique selon le nombres d'enregistrements.
        const tableRow = (this.state.listRow.map((problem) =>
            <TableRow>
                <TableRowColumn>{problem.id}</TableRowColumn>
                <TableRowColumn>{this.renderIndex(problem.type, 'types')}</TableRowColumn>
                <TableRowColumn>{problem.commentaire}</TableRowColumn>
                <TableRowColumn>{this.renderIndex(problem.statut, 'status')}</TableRowColumn>
            </TableRow>

        ));

        return(
            <div className="App">
                <Cdrawer drawer={this.state.open} drawerButton={this.drawerButton} />
                <div className="Header">
                    <header>
                        <h1>Gestion des problèmes</h1>
                        <h2>Select your player</h2>
                    </header>
                </div>
                <div className="NavBar">
                    <RaisedButton
                        label="Options Ultra Cool"
                        onClick={this.drawerButton}
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
                                    {tableHeader}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tableRow}
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