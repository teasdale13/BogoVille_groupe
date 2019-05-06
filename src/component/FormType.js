import React from 'react';


export default class FormType extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nom: '',
            description: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event){
        let inputName = event.target.name;
        if (inputName === 'nom') {
            console.log(event.target.value);
            this.setState({nom: event.target.value});
        }else {
            console.log(event.target.value);
            this.setState({description: event.target.value});
        }


    }

    handleSubmit(){
        let data = [this.state.nom ,this.state.description];
        this.props.parentGetDataFromChild(data);
    }

    render(){
        return(
            <div>
                <form>
                    <div>
                        Nom: <input onChange={(event) => this.handleChange(event)} type="text" name="nom" value={this.state.nom}/>
                    </div>
                    <div>
                        Description: <input onChange={(event) => this.handleChange(event)} type="text" name="description" value={this.state.description}/>
                    </div>

                </form>
                <div>
                    <button onClick={this.handleSubmit}>Ajouter</button>
                </div>
            </div>
        )
    }
}