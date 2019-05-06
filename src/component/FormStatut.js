import React from 'react';


export default class FormStatut extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            description: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event){
        this.setState({description: event.target.value});
    }

    handleSubmit(){
        this.props.parentGetDataFromChild(this.state.description);
    }

    render(){
        return(
            <div>
                <form>
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