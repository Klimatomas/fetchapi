import React, {Component} from 'react';
import 'whatwg-fetch';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            data: "",
            value: 1,
        }

    }

    componentDidMount() {
        fetch("http://localhost:8080/api/employees")
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                this.setState({data: json});
            });
    };

    render() {
        let rows = [];
        if (this.state.data) {
            for (let i = 0; i < this.state.data._embedded.employees.length; i++) {
                rows.push(this.renderRow)
            }
            return (
                <div className="ApiApplication">
                    <Table
                        data={this.state.data}
                    />
                    <Form/>
                </div>
            )
        } else {

            return (
                <div>LOADING</div>
            )
        }
    }


}
class Table extends Component {
    static renderHeader() {
        return (
            <tr className="Header">
                <td>Name</td>
                <td>Surname</td>
                <td>Description</td>
            </tr>
        );

    }

    renderRow() {
        console.log(this.props.data._embedded.employees[0].firstName);
        let data = this.props.data._embedded;
        let dataRows = [];

        for (let i = 0; i < data.employees.length; i++) {
            dataRows.push(
                <tr className="DataRow" id={i}>
                    <td>{data.employees[i].firstName}</td>
                    <td>{data.employees[i].lastName}</td>
                    <td>{data.employees[i].description}</td>
                </tr>
            )
        }
        return (dataRows)
    }

    render() {
        let header = Table.renderHeader();
        let data = this.renderRow();
        return (
            <tbody className="table">
            {header}
            {data}
            </tbody>
        )
    }

}
class Form extends Component {
    render() {
        return (
            <div>
                <form type="submit">
                    <input type ="text" />
                    <input type ="text" />
                    <input type ="text" />
                    <button>Hi Ho</button>
                </form>
            </div>
        )
    }


}

export default App;
