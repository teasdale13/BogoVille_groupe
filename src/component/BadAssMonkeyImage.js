import React from 'react';
import monkey from '../medias/images/BadassMonkey.jpg'

export default class BadAssMonkeyImage extends React.Component{
    render(){
        return(
            <img src={monkey} alt={"BadassMonkey"} />
        )
    }
}