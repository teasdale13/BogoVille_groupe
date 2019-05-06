import React from "react";
import Cdrawer from '../component/Cdrawer'
import Header from "../component/Header";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";

import DynamicTable from "../component/DynamicTable";

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        /*  */
        this.state = {
            open: false,
            header: [],
            listRow: [],
            value: "",
            value2: ""
        };
        this.drawerButton = this.drawerButton.bind(this);
    }

    /**
     * Fonction qui change le state du Drawer.
     * la fonction est aussi passé à l'enfant pour lui permettre de changer le state
     */
    drawerButton() {
        console.log("drawerButton function");
        this.setState({open: !this.state.open});
    }




    render() {

        return (
            <div className="App">
                <Cdrawer drawer={this.state.open} drawerButton={this.drawerButton}/>
                <Header title={"Bienvenue à Bogoville!"}/>
                <NavBar drawerButton={this.drawerButton}></NavBar>
                <div className="Horizontal">
                    <div className="LeftFlex">
                        <p>??</p>
                    </div>
                    <DynamicTable header={this.state.header} listRow={this.state.listRow} />
                </div>
                <Footer/>
            </div>
        );
    }
}
