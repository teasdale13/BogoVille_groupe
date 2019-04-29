import React from 'react';
import logo from './logo.svg';
import './App.css';

export default class KillerApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            test: props.path
        }
    }

    componentWillMount() {
        //this.onCharge();
    }

    onCharge(){
        const axios = require('axios');
        let data = "";
        axios.get('/' + this.state.test.toString())
            .then(function (response) {
                console.log(response.data);
                data = response.data.toString();
                this.setState({test: data});
            }.bind(this))
            .catch(function (error) {
                // handle error
                console.log(error);
            }).then(function () {
            // always executed

        })
    }

    changeText(model){
        const axios = require('axios');
        let data = "";
        axios.get('/'+ model.toString())
            .then(function (response) {
                console.log(response.data);
                data = response.data.toString();
                this.setState({test: data});
            }.bind(this))
            .catch(function (error) {
                // handle error
                console.log(error);
            }).then(function () {
            // always executed

        })
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>{/*
                    <button onClick={() => this.changeText("probleme")}>Probleme</button>
                    <button onClick={() => this.changeText("evenement")}>Evenement</button>*/}
                    <p>{this.state.test}</p>
                </header>
            </div>
        );
    }
}
