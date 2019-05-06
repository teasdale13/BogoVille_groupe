import React from 'react';
import LogInFormPopup from "../component/LogInFormPopup";
import BadAssMonkeyImage from "../component/BadAssMonkeyImage";

export default class Accueil extends React.Component{
    render() {
        return (
            <div className="App">
                <div className="SimpleCenteredDiv">
                    <BadAssMonkeyImage />
                    <LogInFormPopup/>
                </div>
            </div>
        )
    }
}