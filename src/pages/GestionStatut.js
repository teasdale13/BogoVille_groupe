import React from 'react';
import Cdrawer from "../component/Cdrawer";
import Header from "../component/Header";
import NavBar from "../component/NavBar";
import DynamicTable from "../component/DynamicTable";
import Footer from "../component/Footer";


export default class GestionStatut extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            header: [{id: "ID",description: "Description"}],
            listRow: []
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
                <Header title={"Gestion des statuts"} />
                <NavBar drawerButton={this.drawerButton}/>
                <div className="Horizontal">
                    <div className="LeftFlex">
                        <p>??</p>
                    </div>
                    <DynamicTable header={this.state.header} model={"statut"}/>
                </div>
                <Footer/>
            </div>
        );
    }
}