import React from 'react'
import { Redirect } from 'react-router-dom'
class Redirectatron extends React.Component {
    state = {
        redirect: false
    }
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/Page' />
        }
    }
    render () {
        return (
            <div>
                {this.renderRedirect()}
            </div>
        )
    }
}
export default Redirectatron;