import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import CheckBox from "@material-ui/core/es/internal/svg-icons/CheckBox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";
import Status from "./Status";

export default class ProblemTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStatus: 0,
            listRow: props.listRow
        };
        this.changeSelectedStatus = this.changeSelectedStatus.bind(this);
        this.sortTable = this.sortTable.bind(this);
    }

    changeSelectedStatus(childData){
        this.setState({selectedStatus: childData});
    }

    sortTable(item){
        alert(item.toString());
    }

    render() {
        /* Créer le HEADER du tableau */
        const headerRow = this.props.header.length <= 0 ?
            <TableHeaderColumn>
                Rien a afficher
            </TableHeaderColumn>:
            (this.props.header.map((item) =>
                    Object.values(item).map((key, value, item) =>
                        <TableCell
                        key={item[value]}
                        >
                            <Tooltip
                                title="Trier"
                                placement={'bottom'}
                                enterDelay={300}
                            >
                                <TableSortLabel
                                onClick={(item) => this.sortTable(item)}
                                >
                                    <b>{item[value].toUpperCase()}</b>
                                </TableSortLabel>
                            </Tooltip>
                        </TableCell>
                    )
                )
            );

        /* Créer le tableau dynamiquement selon le nombre d'enregistrements. */
        const tableRow = this.state.listRow.length <= 0 ?
            <TableRow>
                <TableRowColumn>
                    Aucuns enregistrements
                </TableRowColumn>
            </TableRow> :
            (this.props.listRow.map((item) =>
                <TableRow>
                    <TableRowColumn>{item.id}</TableRowColumn>
                    <TableRowColumn>{item.type}</TableRowColumn>
                    <TableRowColumn>{item.commentaire}</TableRowColumn>
                    <TableCell><Status  status={item.statut}/></TableCell>
                </TableRow>
            ));

        return (
            <div className="RightFlex">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {headerRow}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tableRow}
                    </TableBody>
                </Table>
            </div>
        )
    }
}