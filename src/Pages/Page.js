import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import Cdrawer from './Cdrawer'
import MenuItem from "material-ui/MenuItem";
import {Link} from "react-router-dom";

export default class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
        this.drawerButton = this.drawerButton.bind(this);
    }


    drawerButton(){
        console.log("drawerButton function");
        this.setState({open: !this.state.open});
    }


    render() {


        return(
        <div className="App">
                <Cdrawer drawer={this.state.open} drawerButton={this.drawerButton} />

            <div className="Header">
                <header>
                    <h1>Bienvenue à Bogoville!</h1>
                    <h2>Select your player</h2>
                </header>
            </div>
            <div className="NavBar">
                <RaisedButton
                    label="Options Ultra Cool"
                    onClick={this.drawerButton}
                    primary={true}
                />
            </div>
            <div className="Horizontal">

                <div className="LeftFlex">
                    <p>??</p>
                </div>

                <div className="RightFlex">

                </div>
            </div>

            <div className="Footer">
                <footer>
                    <p>FOOTER</p>
                </footer>
            </div>
            </div>
        );
    }
}

