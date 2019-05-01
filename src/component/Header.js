import React from 'react';



export default class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="Header">
                <header>
                    <h1>{this.props.title}</h1>
                </header>
            </div>
        )
    }
}