import React from 'react';
import axios from 'axios';
import App from "../App";
export default class PostNotification extends React.Component {
    state = {
        Nom:'',
        Date:'',
        Region:''
    }

    handleChange = event => {
        this.setState({ Nom: event.target.value });
        this.setState({ Date: event.target.value });
        this.setState({ Region: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const notification = {
            Nom: this.state.Nom,
            Date: this.state.Date,
            Region: this.state.Region

        };

        axios.post(`http://bogoville.xyz/rest/notification`, { notification})
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        return (
            <div className="App">

                <div className="Header">
                    <header>
                        <h1>Bienvenue à Bogoville!</h1>

                    </header>
                </div>
                <div className="NavBar">
                    <h1>Gestion de notifications </h1>

                </div>
                <div className="Horizontal">


                    <div className="bodynotif">

                        <div className="notific">
                            <form onSubmit={this.handleSubmit}>
                                <h2>Ajouter une notification  </h2>
                                <label className="formNotif">
                                    Nom:
                                    <input style={{margin:"10px auto"}} type="text" name="name" />
                                </label>

                                <label> <br/>
                                    Date:
                                    <input style={{margin:"10px auto"}} type="text" name="date" />
                                </label><br/>
                                <label>
                                    Région:
                                    <input style={{margin:"10px auto"}} type="text" name="region" />
                                </label><br/>
                                <div>
                                    <input style={{margin:"10px auto"}} type="submit" value="Ajouter" />

                                </div>
                            </form>
                            <input style={{margin:"10px auto"}} type="submit" value="Supprimer/Modifier" />


                        </div>


                    </div>

                </div>


                <div className="Footer">
                    <footer>
                        <p>FOOTER</p>
                    </footer>
                </div>
            </div>
        )
    }
}