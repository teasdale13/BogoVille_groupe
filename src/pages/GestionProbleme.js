import React from "react";
import Cdrawer from '../component/Cdrawer';
import Header from "../component/Header";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import ProblemTable from "../component/ProblemTable";

export default class GestionProbleme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            listRow: [],
            header: [{id: "ID", type: "Type", commentaire: "Commentaire", statut: "Statut"}]

        };
        this.drawerButton = this.drawerButton.bind(this);
    }

    /**
     * Fonction qui change le state du Drawer.
     * la fonction est aussi passé à l'enfant pour lui permettre de changer le state
     */
    drawerButton() {
        this.setState({open: !this.state.open});
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
                    <ProblemTable header={this.state.header}/>
                </div>
                <Footer/>
            </div>
        );
    }
}