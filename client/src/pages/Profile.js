import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router-dom'
import axios from "axios";

import MainNav from "../components/MainNav";
import InventoryTable from '../components/InventoryTable';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      columnDefs: [{
        headerName: "Status", field: "status", sortable: true, filter: true, editable: false,
      }, {
        headerName: "Date Approved", field: "approvedDate", sortable: true, filter: true, editable: false
      }, {
        headerName: "Requested By", field: "userRequested", sortable: true, filter: true, editable: false
      }, {
        headerName: "Approved By", field: "userApproved", sortable: true, filter: true, editable: false
      }, {
        headerName: "Equipment", field: "equipment", sortable: true, filter: true, editable: false
      }],
      rowData: [],
    };
  }

  componentDidMount() {
    const token = sessionStorage.usertoken;

    const decoded = jwt_decode(token);
    this.setState({
      name: decoded.name,
      email: decoded.email,
      role: decoded.role
    });

    axios.get("/api/requests/user/" + decoded.id).then(response => {
      response.data.forEach(item => {
        if (!item.approvedDate) {
          item.approvedDate = "N/A";
        }

        if (item.Equipment) {
          item.equipment = item.Equipment.brand + " " + item.Equipment.model;
        }

        if (item.userRequest) {
          item.userRequested = item.userRequest.name
        }

        if (!item.userApprove) {
          item.userApproved = "N/A";
        }
      })

      this.setState({ rowData: response.data });
    })

  }

  render() {
    if (sessionStorage.usertoken) {

      return (
        <div className="container-fluid">
          <MainNav
            onContextClick={this.props.onContextClick}
            mainNav={this.props.mainNav}
            productContext={this.props.productContext}
          />
          <div className="container mt-4">
            <div className="profile-card text-center">
              <img src="../../images/profile-pic.png" alt="profile" width="250" height="250" />
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

          <div className="table-bg-container mt-5 pt-5">
            <h2 className="mb-4 text-center">Equipment Requested</h2>
            <InventoryTable rowData={this.state.rowData} columnDefs={this.state.columnDefs} />
          </div>
        </div>
      );
    } else {
      return <Redirect to='/login' />

    }
  }
}
export default Profile;
