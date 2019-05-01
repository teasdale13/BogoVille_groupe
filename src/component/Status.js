import React from 'react';
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableCell from "@material-ui/core/TableCell";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";



export default class Status extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            anchorEl: null,
            status: [{id: 1, description: "status"}, {id: 2, description: "status2"}, {id: 3, description: "status3"},
                {id: 4, description: "status4"}, {id: 5, description: "status5"}, {id: 6, description: "status6"}],
            selected: props.status,
        };
        this.supportClick = this.supportClick.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    supportClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = (index) => {
        this.setState({ anchorEl: null });
        console.log(index);
        this.setState({selected: index});
    };


    render(){
        const { anchorEl } = this.state;
        const status = (this.state.status.map((item) =>
            <MenuItem key={item.id} onClick={() => this.handleClose(item.id)}>{item.description}</MenuItem>));
        return(
            <div>
                <TableSortLabel>
                    <p style={{fontSize: 13}}
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.supportClick}
                    >
                        {this.state.status[this.state.selected - 1].description}
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