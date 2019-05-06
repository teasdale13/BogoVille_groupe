import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export default class Form extends React.Component {
    state = {
        Id: "",
        Nom: "",
        Date: "",
        Region: ""

    };

    change = e => {
        // this.props.onChange({ [e.target.name]: e.target.value });
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    validate = () => {
        let isError = false;
        const errors = {
            idError: "",
            nomError: "",
            dateError: "",
            regionError: ""

        };

        this.setState({
            ...this.state,
            ...errors
        });

        return isError;
    };

    onSubmit = e => {
        e.preventDefault();
        const err = this.validate();
        if (!err) {
            this.props.onSubmit(this.state);
            // clear form
            this.setState({
                Id: "",
                idError: "",
                Nom: "",
                nomError: "",
                Date: "",
                dateError: "",
                Region: "",
                regionError: ""
            });
        }
    };

    render() {
        return (
            <form>
                <TextField
                    name="Id"
                    hintText="Id"
                    floatingLabelText="ID"
                    value={this.state.Id}
                    onChange={e => this.change(e)}
                    errorText={this.state.idError}
                    floatingLabelFixed
                />
                <br />
                <TextField
                    name="Nom"
                    hintText="Nom"
                    floatingLabelText="Nom"
                    value={this.state.Nom}
                    onChange={e => this.change(e)}
                    errorText={this.state.nomError}
                    floatingLabelFixed
                />
                <br />
                <TextField
                    name="Date"
                    hintText="Date"
                    floatingLabelText="Date"
                    value={this.state.Date}
                    onChange={e => this.change(e)}
                    errorText={this.state.dateError}
                    floatingLabelFixed
                />
                <br />

                <TextField
                    name="Region"
                    hintText="Region"
                    floatingLabelText="Region"
                    value={this.state.Region}
                    onChange={e => this.change(e)}
                    errorText={this.state.regionError}
                    floatingLabelFixed
                />

                <br />
                <RaisedButton label="Ajouter" onClick={e => this.onSubmit(e)} primary />
            </form>
        );
    }
}
