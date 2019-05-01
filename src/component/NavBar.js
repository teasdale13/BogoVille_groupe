import React from 'react';
import menu from "../menu.svg";


export default class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }

    render(){
        return(
            <div className="NavBar">
                <img alt={"Menu"} src={menu} onClick={() => this.props.drawerButton(this.setState({open: !this.state.open}))} className={"menuButton"}/>
            </div>
        )
    }

}