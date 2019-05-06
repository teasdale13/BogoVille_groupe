import React from 'react';
import Cdrawer from "../component/Cdrawer";
import Header from "../component/Header";
import NavBar from "../component/NavBar";
import DynamicTable from "../component/DynamicTable";
import Footer from "../component/Footer";
import FormStatut from "../component/FormStatut";


export default class GestionStatut extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            header: [{id: "ID",description: "Description"}],
            listRow: []
        };
        this.drawerButton = this.drawerButton.bind(this);
        this.parentGetDataFromChild = this.parentGetDataFromChild.bind(this);
        this.getDataFromChildPut = this.getDataFromChildPut.bind(this);
    }

    /**
     * Fonction passée en props à l'enfant (FormType) pour recevoir
     * les données que l'utilisateur à entré. Fait un appel POST
     * au backend qui fait appel au REST API.
     *
     * @param data les données de l'utilisateur en format tableau.
     */
    parentGetDataFromChild(data){
        console.log(data);
        const axios = require('axios');
        axios.post('http://localhost:80/statut', {
            description: data.toString()
        })
            .then(function (response) {
                this.setState({update: false});
                console.log(response);
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    /**
     * Fonction passée en props à l'enfant (DynamicTable) pour passer
     * l'enregistrement qui doit être modifiée dans la base de données.
     *
     * @param data l'enregistrement modifiée.
     */
    getDataFromChildPut(data){
        const axios = require('axios');
        console.log(data.idStatut.toString() + " " + data.description.toString());
        axios({
            method: 'put',
            url: 'http://localhost:80/statut/' + data.idStatut.toString(),
            data: {
                description : data.description.toString()
            }
        }).then((resp) => {
            console.log(resp.data);
        });
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
                        <FormStatut  parentGetDataFromChild={this.parentGetDataFromChild} />
                    </div>
                    <DynamicTable getDataFromChildPut={this.getDataFromChildPut} header={this.state.header} model={"statut"}/>
                </div>
                <Footer/>
            </div>
        );
    }
}