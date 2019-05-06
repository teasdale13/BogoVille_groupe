import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";
import Status from "./Status";

export default class ProblemTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSortHeader: '',
            listRow: [],
            asc: 'asc',
            type: []
        };
        this.changeSelectedStatus = this.changeSelectedStatus.bind(this);
        this.sortTable = this.sortTable.bind(this);
        this.renderIndex = this.renderIndex.bind(this);
    }


    /**
     * Fonction native de REACT. Lorsque le composant est "monté", elle fait une requête
     * pour avoir tous les problèmes et types pour pouvoir les affichers correctements.
     */
    componentDidMount() {
        const axios = require('axios');
        axios.get('http://localhost:80/probleme')
            .then(function (response) {
                this.setState({listRow: response.data});
                axios.get("http://localhost:80/type")
                    .then(function (response) {
                        this.setState({type: response.data});
                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);
                    });
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    /**
     * Fonction qui remplace la FK (type) par la description qui lui est associé.
     *
     * @returns {*} un tableau avec tous les FK remplacées par leur significations.
     * @param idtype
     */
    renderIndex(idtype) {
        for (let i = 0; i < this.state.type.length; i++) {
            if (idtype === this.state.type[i].idType) {
                return this.state.type[i].nom;
            }
        }
    }


    /**
     * Fonction passée en props à l'enfant (Status) qui renvoie la nouvelle valeur du statut
     * et fait un update à la base de données avec les informations nécessaire.
     *
     * @param childData nouveau statut envoyé par l'enfant.
     * @param index de l'enregistrement qui doit être modifié.
     */
    changeSelectedStatus(childData, index) {
        const axios = require('axios');
        let array = this.state.listRow;
        array[index].id_statut = childData;
        axios({
            method: 'put',
            url: 'http://localhost:80/probleme/'+ array[index].idProbleme.toString(),
            data: {
                id_statut: JSON.parse(childData)
            }
        }).then((resp) => {
            if (resp.status === 200){
                this.setState({listRow: array});
            }

        });
    }

    /**
     * Fonction qui tri les enregistrements selon la clé qui a été sélectionnée.
     *
     * @param key la clé qui correspond à la colonne qui doit être triée.
     */
    sortTable(key) {
        this.setState({selectedSortHeader: key});
        let isAsc = this.state.asc === 'asc';
        let newState;
        switch (key) {
            case "Type":
                newState = isAsc ? this.state.listRow.sort((a, b) => (a.id_type === b.id_type) ? 0 : (a.id_type > b.id_type) ? -1 : 1) :
                    this.state.listRow.sort((a, b) => (a.id_type === b.id_type) ? 0 : (a.id_type > b.id_type) ? 1 : -1);
                break;
            case "ID":
                newState = isAsc ? this.state.listRow.sort((a, b) => (a.idProbleme > b.idProbleme) ? -1 : 1) :
                    this.state.listRow.sort((a, b) => (a.idProbleme > b.idProbleme) ? 1 : -1);
                break;
            case "Statut":
                newState = isAsc ? this.state.listRow.sort((a, b) => (a.id_statut > b.id_statut) ? -1 : 1) :
                    this.state.listRow.sort((a, b) => (a.id_statut > b.id_statut) ? 1 : -1);
                break;
            default:
                return;
        }
        this.setState({listRow: newState});
        this.setState({asc: isAsc ? 'desc' : 'asc'});

    }

    render() {
        /* Créer le HEADER du tableau */
        const headerRow = this.props.header.length <= 0 ?
            <TableHeaderColumn>
                Rien a afficher
            </TableHeaderColumn> :
            (this.props.header.map((item) =>
                    Object.values(item).map((key, value, item) =>
                        <TableCell
                            key={item[value]}
                        >
                            {/*petite bulle qui apparait lorsque la souris est 'hover' un item du header.*/}
                            <Tooltip
                                title={item[value] === "Commentaire" ? "" : "Trier"}
                                placement={'bottom'}
                                enterDelay={300}
                            >
                                <TableSortLabel
                                    // permet d'afficher la petite flêche lorsque click sur les items du header.}
                                    active={this.state.selectedSortHeader === 'Commentaire' ? null :
                                        this.state.selectedSortHeader === item[value]}
                                    // permer de faire changer la direction de la flêche.
                                    direction={this.state.asc}
                                    onClick={() => this.sortTable(item[value])}
                                >
                                    {/* affiche le titre de la colonne en gras si on clic sauf la partie commentaire */}
                                    {this.state.selectedSortHeader !== 'Commentaire' ?
                                        this.state.selectedSortHeader === item[value] ?
                                            <b>{item[value].toUpperCase()}</b> :
                                            item[value].toUpperCase() : item[value].toUpperCase()}
                                </TableSortLabel>
                            </Tooltip>
                        </TableCell>
                    )
                )
            );

        /* Créer le tableau dynamiquement selon le nombre d'enregistrements. */
        const tableRow = this.state.listRow.length <= 0 ?
            <TableRow>
                <TableRowColumn>
                    Aucuns enregistrements
                </TableRowColumn>
            </TableRow> :
            (this.state.listRow.map((item, index) =>
                <TableRow className={"tableRowHover"}>
                    <TableRowColumn>{item.idProbleme}</TableRowColumn>
                    <TableRowColumn>{this.renderIndex(item.id_type)}</TableRowColumn>
                    <TableRowColumn>{item.commentaire}</TableRowColumn>
                    <TableCell><Status changeSelectedStatus={this.changeSelectedStatus} index={index}
                                       status={item.id_statut}/></TableCell>
                </TableRow>
            ));

        return (
            <div className="RightFlex">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {headerRow}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableRow}
                    </TableBody>
                </Table>
            </div>
        )
    }
}