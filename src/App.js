import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import KillerApp from './KillerApp';


export class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            test: ""
        }
    }

    componentWillMount() {
       this.onCharge();
    }

    onCharge(){
      const axios = require('axios');
      let data = "";
      axios.get('/test')
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

    Child({ match }) {
        return (
            <div>
                <h1>MODEL: {match.params.model}</h1>
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
                        <Link to="/evenement">Evenement</Link>
                    </li>
                    <li>
                        <Link to="/probleme">Probleme</Link>
                    </li>
                </ul>

                <Route path="/:model" component={this.Child}/>

            </div>
        </Router>

    );
  }
}

export default App;
