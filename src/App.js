import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export class App extends React.Component {
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
        <Router>
            <div className="App">
                <p>{this.state.test}</p>
                <ul>
                    <li>
                        <Link to="/evenement/2">Evenement</Link>
                    </li>
                    <li>
                        <Link to="/probleme/4">Probleme</Link>
                    </li>
                </ul>

                /* :model représente evenement et problème des tag <Link> et :id 2 et 4 */
                <Route path="/:model/:id" component={this.Child}/>

            </div>
        </Router>

    );
  }
}

export default App;
