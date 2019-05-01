import React from "react";
import Cdrawer from '../component/Cdrawer';
import Header from "../component/Header";
import NavBar from "../component/NavBar";
import DynamicTable from "../component/DynamicTable";
import Footer from "../component/Footer";

export default class GestionType extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            header: [{id: "ID", nom: "Nom" , description: "Description"}],
            listRow: [
                {id: 1, nom: "Nid de poule" , description: "Genre de trou dans la rue yo"},
                {id: 2, nom: "Borne fontaine" , description: "Je sais pas c quoi mais criss ca coule"},
                {id: 3, nom: "Arbre dans rue" , description: "Ca peux tu etre plus precis?"},
                {id: 4, nom: "Yolaine" , description: "Yolaine a pas encore corriger calisse"},
                {id: 5, nom: "Hold up a une banque" , description: "POW POW ca fait du bruit et ca fait peur"},
            ]
        };
        this.drawerButton = this.drawerButton.bind(this);
    }

    /**
     * Fonction qui change le state du Drawer.
     * la fonction est aussi passé à l'enfant pour lui permettre de changer le state
     */
    drawerButton(){
        this.setState({open: !this.state.open});
    }

    render(){
        return(
            <div className="App">
                <Cdrawer drawer={this.state.open} drawerButton={this.drawerButton} />
                <Header title={"Gestion des types"} />
                <NavBar drawerButton={this.drawerButton}/>
                <div className="Horizontal">
                    <div className="LeftFlex">
                        <p>??</p>
                    </div>
                    <DynamicTable header={this.state.header} listRow={this.state.listRow}/>
                </div>
                <Footer/>
            </div>
        );
    }
}
