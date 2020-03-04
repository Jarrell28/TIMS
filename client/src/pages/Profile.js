import React, { Component } from "react";
import Image from "../images/peter.png";
import MainNav from "../components/MainNav";
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router-dom'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      errors: {}
    };
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    if (token) {
      const decoded = jwt_decode(token);
      this.setState({
        name: decoded.name,
        email: decoded.email,
        role: decoded.role
      });

    }
  }

  render() {
    if (localStorage.usertoken) {

      return (
        <div className="container-fluid">
          <MainNav
            onContextClick={this.props.onContextClick}
            mainNav={this.props.mainNav}
            productContext={this.props.productContext}
          />
          <div className="container mt-4">
            <div className="profile-card text-center">
              <img src={Image} alt="profile" width="250" height="250" />
              <h1 className="mt-4">
                Name: {this.state.name ? this.state.name : "James"}
              </h1>
              <p className="h2 my-3">
                Email: {this.state.email ? this.state.email : "jterrell@test.com"}
              </p>
              <p className="h2 my-3">
                Role: {this.state.role ? this.state.role : "Technician"}
              </p>

            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to='/login' />

    }
  }
}
export default Profile;
