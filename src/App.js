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
        if (this.state.data) {
            return (
                <tbody>
                <div className="header">
                    <tr>
                        <td>FIRST NAME</td>
                        <td>LAST NAME</td>
                        <td>COJAVIM</td>
                    </tr>
                </div>
                <Rows/>
                </tbody>
            )
        } else {

            return (
                <div>LOADING</div>
            )
        }
    }
}
function Rows() {
    let room = [];

    let data = {
            "employees": [
                {
                    "firstName": "Lukas",
                    "secondName": "Prijmeni",
                    "treti": "the third"
                },
                {
                    "firstName": "Jine",
                    "secondName": "Druhe jmeno",
                    "treti": "the third"

                },
                {
                    "firstName": "John",
                    "secondName": "Doe",
                    "treti": "the third"

                }
            ]
        }
    ;
    let x = data.employees
    for (let i = 0; i < data.employees.length; i++) {
        room.push(
            <tr>
                <td>{x[i].firstName}</td>
                <td>{x[i].secondName}</td>
                <td>{x[i].treti}</td>
            </tr>)

    }
    console.log(room);

    return (
        <div className="data">{room}</div>
    )
}


export default App;
