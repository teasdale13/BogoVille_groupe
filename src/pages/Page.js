import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import Cdrawer from './Cdrawer'

export default class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        return(
        <div className="App">
            <Drawer open={this.state.open} className="Drawer">

            </Drawer>
            <div className="Header">
                <header>
                    <h1>Bienvenue à Bogoville!</h1>
                    <h2>Select your player</h2>
                </header>
            </div>
            <div className="NavBar">
                <RaisedButton
                    label="Options Ultra Cool"
                    onClick={this.handleToggle}
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