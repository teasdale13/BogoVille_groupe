import React from 'react';
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";


export default class Status extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            status: [],
            selected: null,
            index: props.index,
        };
        this.parentFunction = props.changeSelectedStatus;
        this.supportClick = this.supportClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getStatus = this.getStatus.bind(this);

    }

    componentDidMount() {
        const axios = require("axios");
        axios.get("http://localhost:80/statut")
            .then(function (response) {
                this.setState({status: response.data});
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    getStatus(idStatus) {
        for (let x = 0; x < this.state.status.length; x++) {
            console.log();
            if (this.state.status[x].idStatut === idStatus) {
                return this.state.status[x].description;
            }
        }
    }

    supportClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = (index) => {
        console.log(index);
        if (index > 0) {
            this.setState({selected: index});
            this.parentFunction(this.state.status[index - 1].idStatut, this.state.index);
        }
        this.setState({anchorEl: null});
    };


    render() {
        const {anchorEl} = this.state;
        const status = (this.state.status.map((item) =>
            <MenuItem onClick={() => this.handleClose(item.idStatut)}>{item.description}</MenuItem>));

        return (
            <div>
                <TableSortLabel>
                    <p style={{fontSize: 13}}
                       aria-owns={anchorEl ? 'simple-menu' : undefined}
                       aria-haspopup="true"
                       onClick={this.supportClick}
                    >
                        {this.getStatus(this.props.status)}
                    </p>

                </TableSortLabel>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {status}
                </Menu>
            </div>

        )
    }

}