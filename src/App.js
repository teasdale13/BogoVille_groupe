import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Nav from './Navigatron'



export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            test: "",
            model:""
        };
        this.Child = this.Child.bind(this);
    }

    /**
     * Requete http via Axios au BackEnd (index.php) du site internet
     * pour avoir l'information du Rest API
     */
    onCharge (model, id){
        const axios = require('axios');
        let data = "";
        axios.get('/' + model.toString() /* + "/" + id.toString()*/)
            .then(function (response) {
                console.log(response.data);
                data = response.data.toString();
                this.setState({test: data});
            }.bind(this))
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    Child({match}) {
        console.log(this);
        /* Vérification pour éviter les requêtes en boucle infinie */
        if (match.params.model !== this.state.model){
            this.onCharge(match.params.model, match.params.id );
            this.setState({model: match.params.model})
        }
        const test =
            <div>
                <h1>MODEL: {match.params.model}</h1>
                <h1>ID: {match.params.id}</h1>
                <h3>URL: {this.state.test}</h3>
            </div>;

        return (
            <div>
                {test}
            </div>
        );

    }

  render() {
    return (
        <MuiThemeProvider>
            <Nav />
        </MuiThemeProvider>

    );
  }
}

