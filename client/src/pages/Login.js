import React, { Component } from 'react';
import axios from 'axios';
import '../css/login.css';


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
            .post('/api/users/login', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                console.log(response);
                if (response.data.success) {
                    sessionStorage.setItem('usertoken', response.data.token);
                    // console.log(this.props);
                    this.props.history.push(`/profile`)
                } else {
                    alert(response.data.error);
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    guestLogin = () => {
        this.setState({ email: "guest@guest.com", password: "guest" });
    }



    render() {
        return (

            <div className="login-bg">

                <div className="login-container">
                    <p style={{ textAlign: "center" }}><img src="../../images/light-blue-logo-06.svg" style={{ width: "50%", marginBottom: "10%", }} /></p>
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

                        <button id="guest-login" onClick={this.guestLogin}>Guest Login</button>
                    </form>



                </div>
            </div>

            /*  <div class='container' id='logback'>
                  <div className="container" id="log">
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
              </div>*/

        )
    }
}
export default Login;