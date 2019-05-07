import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AlertDialog from "./AlertDialog";

//TODO Limiter les types d'input à ce qu'on veut. Info sur les input types pas dispo sur la doc de material UI
export default class LogInFormPopup extends React.Component {

    constructor(props){
        super(props);
        this.alertDialog = React.createRef();
    }

    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleConnect = () => {
        let email = document.getElementById("textFieldEmail").value;
        let password = document.getElementById("textFieldPassword").value;
        const axios = require('axios');

        axios.post('http://localhost/usager/validate/' + email + "/val", {email: email, password: password})
            .then(function (response){
            console.log(response.data);
            if(response.data['state'] === "CONNECTED"){
                window.location("/Page")
            } else {
                this.alertDialog.current.handleOpening();
            }
        }.bind(this));
    };

    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Se connecter
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Connexion à Bogoville</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Pour vous créer un compte BogoVille, remplissez les champs suivant.
                        </DialogContentText>
                        <div /*style={this.styles.flexColumn}*/>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="textFieldEmail"
                                label="Courriel"
                                type="email"
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="textFieldPassword"
                                label="Mot de passe"
                                type="password"
                                fullWidth
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={this.handleConnect} color="primary">
                            Se connecter
                        </Button>
                    </DialogActions>
                </Dialog>
                <AlertDialog ref={this.alertDialog}/>
            </div>
        );
    }

}
