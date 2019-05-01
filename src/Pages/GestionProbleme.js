import React from "react";
import Cdrawer from '../component/Cdrawer';
import Header from "../component/Header";
import NavBar from "../component/NavBar";
import DynamicTable from "../component/DynamicTable";
import Footer from "../component/Footer";
import ProblemTable from "../component/ProblemTable";

export default class GestionProbleme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            // Listes factices qui simule les requêtes au service REST


            types: [{id: 1, description: "type1"}, {id: 2, description: "type2"}, {id: 3, description: "type3"},
                {id: 4, description: "type4"}, {id: 5, description: "type5"}, {id: 6, description: "type6"}],

            listRow: [{id: 1, type: 2, commentaire: "petite patate", statut: 1},
                {id: 2, type: 1, commentaire: "petite patate2", statut: 2},
                {id: 3, type: 5, commentaire: "petite patate3", statut: 2},
                {id: 4, type: 3, commentaire: "petite patate4", statut: 3},
                {id: 5, type: 6, commentaire: "petite patate5", statut: 3}],

            header: [{id: "ID", type: "Type", commentaire: "Commentaire", statut: "Statut"}]

        };
        this.drawerButton = this.drawerButton.bind(this);
        this.renderIndex = this.renderIndex.bind(this);
    }


    /**
     * Fonction qui change le state du Drawer.
     * la fonction est aussi passé à l'enfant pour lui permettre de changer le state
     */
    drawerButton() {
        console.log("drawer Button");
        this.setState({open: !this.state.open});
    }

    /**
     * Fonction qui remplace la FK (int) par la description qui lui est associé.
     *
     * @param initialArray
     * @returns {*} un tableau avec tous les FK remplacées par leur significations.
     */
    renderIndex(initialArray) {
        let array = [...initialArray];
        for (let x = 0; x < array.length; x++) {
            if (array[x].type) {
                for (let i = 0; i < this.state.types.length; i++) {
                    if (array[x].type === this.state.types[i].id) {
                        array[x].type = this.state.types[i].description;
                    }
                }
            }/*
            if (array[x].statut) {
                for (let i = 0; i < this.state.status.length; i++) {
                    if (array[x].statut === this.state.status[i].id) {
                        array[x].statut = this.state.status[i].description;
                    }
                }
            }*/
        }
        return array;
    }

    render() {
        return (
            <div className="App">
                <Cdrawer drawer={this.state.open} drawerButton={this.drawerButton}/>
                <Header title={"Gestion des problèmes"}/>
                <NavBar drawerButton={this.drawerButton}/>
                <div className="Horizontal">
                    <div className="LeftFlex">
                        <p>??</p>
                    </div>
                    <ProblemTable header={this.state.header} listRow={this.renderIndex(this.state.listRow)}/>
                </div>
                <Footer/>
            </div>
        );
    }
}