import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export default class DynamicTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        /* Créer le HEADER du tableau */
        const headerRow = this.props.header.length <= 0 ?
            <TableHeaderColumn>
                Rien a afficher
            </TableHeaderColumn>:
            (this.props.header.map((item) =>
                Object.values(item).map((key, value, item) =>
                    <TableHeaderColumn>
                        {item[value].toUpperCase()}
                    </TableHeaderColumn>
                )
            )
        );

        /* Créer le tableau dynamiquement selon le nombre d'enregistrements. */
        const tableRow = this.props.listRow.length <= 0 ?
            <TableRow>
                <TableRowColumn>
                    Aucuns enregistrements
                </TableRowColumn>
            </TableRow> :
            (this.props.listRow.map((item) =>
            <TableRow>
                {Object.values(item).map((key, value, item) =>
                    <TableRowColumn>
                        {item[value]}
                    </TableRowColumn>)}
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