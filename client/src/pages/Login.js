import React, { Component } from 'react';
import axios from 'axios';
import '../css/login.css';

import Logo from "../images/light-blue-logo-06.svg";



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

                <div className="login-bg">

                    <div className="login-container">
                    <p style= {{textAlign:"center"}}><img src = {Logo} style={{width: "50%", marginBottom: "10%", }} /></p>
                        <h1>Account Login</h1>

                        <form onSubmit={this.handleFormSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={this.handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" name="password" onChange={this.handleInputChange} />
                            </div>
                            <div className="submit-btn-container">
                                <button type="submit" className="login-submit-btn">Submit</button>
                            </div>
                        </form>

                    </div>
                </div>

        )
    }
}
export default Login;