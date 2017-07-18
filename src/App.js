import React, {Component} from 'react';
import 'whatwg-fetch';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            data: '',
            firstName: '',
            surname: '',
            description: '',
        }

    }

    componentDidMount() {
        this.getData();

    };

    getData() {
        fetch("http://localhost:8080/api/employees")
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                this.setState({data: json});
            });
    }


    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
        e.preventDefault();

    }

    handleClick(e) {
        if (this.state.firstName.length < 1 || this.state.surname.length < 1 || this.state.description.length < 1) {
            alert('You must fill all forms to submit')
        } else {
            fetch('http://localhost:8080/api/newemployee', {
                method: 'POST',
                body: JSON.stringify({
                    firstName: this.state.firstName,
                    surname: this.state.surname,
                    description: this.state.description,
                })
            });
        }
        e.preventDefault();
        this.getData();
        this.setDefaultState();


    }

    setDefaultState() {
        this.setState({
            firstName: "",
            surname: "",
            description: ""

        })
    }

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
                    <Form
                        firstName={this.state.firstName}
                        surname={this.state.surname}
                        description={this.state.description}
                        onClick={(e) => this.handleClick(e)}
                        onChange={(e) => this.handleChange(e)}

                    />
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
        let data = this.props.data._embedded;
        let dataRows = [];

        for (let i = 0; i < data.employees.length; i++) {
            dataRows.push(
                <tr className="DataRow" key={i}>
                    <td>{data.employees[i].firstName}</td>
                    <td>{data.employees[i].surname}</td>
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
                <form className="submit" onSubmit={(e) => this.props.onClick(e)}>
                    <input type="text"
                           id="firstName"
                           placeholder="First name"
                           onChange={(e) => this.props.onChange(e)}
                           value={this.props.firstName}/>

                    <input type="text"
                           id="surname"
                           placeholder="Surname"
                           onChange={(e) => this.props.onChange(e)}
                           value={this.props.surname}/>

                    <input type="text"
                           id="description"
                           placeholder="Description"
                           onChange={(e) => this.props.onChange(e)}
                           value={this.props.description}/>

                    <input type="submit"
                           value="Submit"/>

                </form>
            </div>
        )
    }


}


export default App;
