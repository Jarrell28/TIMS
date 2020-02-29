import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }
    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;
        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        axios
            .post('http://localhost:3001/api/users/login', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                console.log(response);
                localStorage.setItem('usertoken', response.data)
                this.props.history.push(`/`)
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        return (
            <div className="container">
                <h1>Login Page</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={this.handleInputChange} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
export default Login;