import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class BootStrap extends React.Component{


    render(){
        return(
            <div className="App">
                <div>
                    <RaisedButton><Link to="/">Page</Link></RaisedButton>
                </div>
            </div>
        );
}
}