import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import orderBy from "lodash/orderBy";

import Form from "./Form";
import Table from "./Table";
import Cdrawer from "../../component/Cdrawer";
import Header from "../../component/Header";
import NavBar from "../../component/NavBar";

injectTapEventPlugin();

const invertDirection = {
    asc: "desc",
    desc: "asc"
};

class App extends Component {
    state = {
        data: [
            {
                Id: "Tann",
                Nom: "Gounin",
                Date: "tgounin0",
                Region: "tgounin0@wordpress.com"

            },
            {
                Id:"Elana",
                Nom: "Ricioppo",
                Date: "ericioppo1",
                Region: "ericioppo1@timesonline.co.uk",

            },
            {
                Id: "Bentlee",
                Nom: "Decourt",
                Date: "bdecourt2",
                Region: "bdecourt2@about.me"

            },
            {
                id: "Hyacintha",
                Nom: "Choudhury",
                Date: "hchoudhury3",
                region: "hchoudhury3@va.gov"

            }

        ],
        editIdx: -1,
        columnToSort: "",
        sortDirection: "desc"
    };

    handleRemove = i => {
        this.setState(state => ({
            data: state.data.filter((row, j) => j !== i)
        }));
    };

    startEditing = i => {
        this.setState({ editIdx: i });
    };

    stopEditing = () => {
        this.setState({ editIdx: -1 });
    };

    handleChange = (e, name, i) => {
        const { value } = e.target;
        this.setState(state => ({
            data: state.data.map(
                (row, j) => (j === i ? { ...row, [name]: value } : row)
            )
        }));
    };

    handleSort = columnName => {
        this.setState(state => ({
            columnToSort: columnName,
            sortDirection:
                state.columnToSort === columnName
                    ? invertDirection[state.sortDirection]
                    : "asc"
        }));
    };

    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    <Cdrawer drawer={this.state.open} drawerButton={this.drawerButton}/>
                    <Header  title={"Gestion des notifications"}  />
                    <NavBar drawerButton={this.drawerButton}/>
                    <Form
                        onSubmit={submission =>
                            this.setState({
                                data: [...this.state.data, submission]
                            })
                        }
                    />
                    <Table
                        handleSort={this.handleSort}
                        handleRemove={this.handleRemove}
                        startEditing={this.startEditing}
                        editIdx={this.state.editIdx}
                        stopEditing={this.stopEditing}
                        handleChange={this.handleChange}
                        columnToSort={this.state.columnToSort}
                        sortDirection={this.state.sortDirection}
                        data={orderBy(
                            this.state.data,
                            this.state.columnToSort,
                            this.state.sortDirection
                        )}
                        header={[
                            {
                                name: "ID",
                                prop: "Id"
                            },
                            {
                                name: "NOM",
                                prop: "Nom"
                            },
                            {
                                name: "DATE",
                                prop: "Date"
                            },
                            {
                                name: "REGION",
                                prop: "Region"
                            }
                        ]}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
