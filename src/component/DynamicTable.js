import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TextField from "material-ui/TextField";
import {TableCell} from "@material-ui/core";
import EditIcon from "material-ui/svg-icons/image/edit";
import CheckIcon from "material-ui/svg-icons/navigation/check";
import TrashIcon from "material-ui/svg-icons/action/delete";

export default class DynamicTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listRow: [],
            edit: false,
            rowClick: null,
            row: [],
            update: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateRowClick = this.updateRowClick.bind(this);
        this.confirmUpdatedRow = this.confirmUpdatedRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }

    /**
     * Lorsque le component est monté, un requête est effectuée au Backend
     * pour aller chercher les enregistrements de la base de données
     * avec le model passé en props par le parent.
     */
    componentDidMount() {
        const axios = require('axios');
        axios.get('http://localhost:80/'  + this.props.model)
            .then(function(response) {
                this.setState({listRow: response.data});
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });

    }

    /**
     * Fonction native de REACT. Utilisée pour mettre à jour le tableau avec les données du REST API.
     * @param nextProps
     * @param nextContext
     */
    componentWillReceiveProps(nextProps, nextContext) {
        const axios = require('axios');
        axios.get('http://localhost:80/'  + this.props.model)
            .then(function(response) {
                this.setState({listRow: response.data});
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    /**
     * Fonction qui est appelée lorsque l'utilisateur appuie sur le petit crayon pour
     * faire des changements sur un enregistrement.
     *
     * @param row l'enregistrement qui va être modifiée.
     */
    updateRowClick(row) {
        let keys =  Object.keys(row).map((value) => value);
        this.setState({row: keys});
        this.setState({rowClick: row});
        this.setState({edit: !this.state.edit});
    }

    /**
     * Fonction qui est appelée lorsque l'utilisateur clique sur le petit crochet
     * après avoir completé les modifications de l'enregistrement.
     *
     * @param row l'enregistrement modifiée
     */
    confirmUpdatedRow(row){
        if (row === this.state.rowClick) {
            this.setState({rowClick: null});
            this.setState({edit: !this.state.edit});
            // appel à la fonction du parent pour modifier l'enregistrement.
            this.props.getDataFromChildPut(row);

        }
    }

    /**
     * Fonction qui applique les changements au fur et à mesure que l'utilisateur
     * effctue la modification.
     *
     * @param event l'évènement déclanché lorsque l'utilisateur modifie l'enregistrement.
     * @param index clé (key) afin d'appliquer les changements de texte à la bonne clé de l'objet.
     */
    handleChange(event, index) {
        const data = this.state.rowClick;
        data[index] = event.target.value;
        this.setState({rowClick: data});
    };

    /**
     * Fonction qui demande la confirmation de la suppression et si TRUE, fait un appel pour supprimer
     * l'enregistrement et par la suite refait un appel GET pour mettre a jour la liste.
     *
     * @param row l'enregistrement a supprimer.
     */
    deleteRow(row){
        let keys =  Object.keys(row).map((value) => value);
        let response = window.confirm("Voulez-vous vraiment supprimé?");
        if (response){
            const axios = require('axios');
            axios({
                method: 'delete',
                url: 'http://localhost:80/' + this.props.model + '/' + row[keys[0]].toString()
            }).then(() => {
                axios.get('http://localhost:80/' + this.props.model)
                    .then(function (response) {
                        this.setState({listRow: response.data});
                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);
                    })
            });
        }
    }

    render() {
        /* Créer le HEADER du tableau */
        const headerRow = this.props.header.length <= 0 ?
            <TableHeaderColumn>
                Rien a afficher
            </TableHeaderColumn> :
            (this.props.header.map((item) =>
                    Object.values(item).map((key, value, item) =>
                        <TableHeaderColumn>
                            {item[value].toUpperCase()}
                        </TableHeaderColumn>
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
            (this.state.listRow.map((items, index) =>
                <TableRow>
                    {Object.values(items).map((key, value, itemP) =>
                        <TableRowColumn>{
                            /* Vérifié si le state est vrai et que l'enregistrement qui est sélectionnée est le meme que
                            * l'enregistrement présent et que ce n'est pas le ID le TextView est remplacé par un TextField
                            * pour effectuer une modification. */
                            this.state.edit ? items === this.state.rowClick ? itemP[value] === itemP[0]? itemP[value] :
                                    <TextField
                                        name={itemP[value]}
                                        onChange={(event) => this.handleChange(event, this.state.row[value])}
                                        value={itemP[value]}
                                    /> :
                                itemP[value] : itemP[value]}
                        </TableRowColumn>)}
                    <TableCell
                    >{/* Vérifié si le state est vrai et que l'enregistrement qui est sélectionnée est le meme que
                       * l'enregistrement présent. L'icon crochet et visible si vrai, sinon c'est l'icon "crayon" qui
                       * est visible si la condition est fausse. */}
                        {this.state.edit && this.state.rowClick === items ?
                        <CheckIcon
                            onClick={() => this.confirmUpdatedRow(items)}
                        />
                        :
                        <EditIcon
                            onClick={() => this.updateRowClick(items)}
                        />}

                        <TrashIcon
                            onClick={() => this.deleteRow(items)}
                        />
                    </TableCell>
                </TableRow>
            ));

        return (
            <div className="RightFlex">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {headerRow}
                            <TableCell/>
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