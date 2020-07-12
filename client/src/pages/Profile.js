import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Redirect } from 'react-router-dom';
import axios from "axios";

import MainNav from "../components/MainNav";
import InventoryTable from '../components/InventoryTable';
import API from '../utils/API';


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
      }
        , {
        headerName: "Loaner", field: "loaner", sortable: true, filter: true, editable: false
      }],
      rowData: [],
      requestData: []
    };
  }

  componentDidMount() {
    //checks for currently logged in user information and updates state
    const token = sessionStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      name: decoded.name,
      email: decoded.email,
      role: decoded.role
    });

    //Grabs the equipment request made by current logged in user and updates rowData state for table
    axios.get("/api/requests/user/" + decoded.id).then(response => {
      response.data.forEach(item => {
        if (!item.approvedDate) {
          item.approvedDate = "N/A";
        }

        if (item.Equipment) {
          item.equipment = item.Equipment.brand + " " + item.Equipment.model;
        } else {
          item.equipment = "N/A";
        }

        if (item.userRequest) {
          item.userRequested = item.userRequest.name
        }

        if (!item.userApprove) {
          item.userApproved = "N/A";
        }

        if (item.Loaner) {
          item.loaner = item.Loaner.brand + " " + item.Loaner.model;
        } else {
          item.loaner = "N/A";
        }
      })

      this.setState({ rowData: response.data });
    })

    //Checks if user is admin
    //if so updates requestData array to display all requests made by user and allows them to edit rows
    if (decoded.role === "administrator") {
      API.getData("requests").then((response) => {
        response.data.forEach(item => {
          if (!item.approvedDate) {
            item.approvedDate = "N/A";
          }

          if (item.Equipment) {
            item.equipment = item.Equipment.brand + " " + item.Equipment.model;
          } else {
            item.equipment = "N/A";
          }

          if (item.userRequest) {
            item.userRequested = item.userRequest.name
          }

          if (!item.userApprove) {
            item.userApproved = "N/A";
          }

          if (item.Loaner) {
            item.loaner = item.Loaner.brand + " " + item.Loaner.model;
          } else {
            item.loaner = "N/A";
          }
        })

        this.setState({
          requestData: response.data, columnDefs: [{
            headerName: "Status", field: "status", sortable: true, filter: true, editable: true,
          }, {
            headerName: "Date Approved", field: "approvedDate", sortable: true, filter: true, editable: true
          }, {
            headerName: "Requested By", field: "userRequested", sortable: true, filter: true, editable: true
          }, {
            headerName: "Approved By", field: "userApproved", sortable: true, filter: true, editable: true
          }, {
            headerName: "Equipment", field: "equipment", sortable: true, filter: true, editable: true
          }, {
            headerName: "Loaner", field: "loaner", sortable: true, filter: true, editable: true
          }, {
            headerName: "", field: "view", sortable: true, filter: true, editable: false, cellRenderer: this.buttonRenderer
          }],
        });
      })
    }

    //checks current page and updates active nav
    this.props.checkPage();
  }

  buttonRenderer = params => {
    let button = document.createElement('button');
    var text = 'Approve';
    // one star for each medal
    button.setAttribute("data-id", params.value);
    button.classList.add("view-button");
    button.innerHTML = text;
    button.addEventListener('click', this.onButtonClicked);

    return button;
  }

  render() {
    //Checks if user is logged in else redirects to login page
    if (sessionStorage.usertoken) {
      return (
        <div className="container-fluid">
          <MainNav
            onContextClick={this.props.onContextClick}
            mainNav={this.props.mainNav}
            productContext={this.props.productContext}
            checkPage={this.props.checkPage}
            activePage={this.props.activePage}
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
            <h2 className="mb-4 text-center">Your Equipment Requested</h2>
            <InventoryTable rowData={this.state.rowData} columnDefs={this.state.columnDefs} />
          </div>

          {this.state.requestData.length ? (
            <div className="table-bg-container pt-5">
              <h2 className="mb-4 text-center">All Equipment Requested</h2>
              <InventoryTable rowData={this.state.requestData} columnDefs={this.state.columnDefs} />
            </div>
          ) : ""}
        </div>
      );
    } else {
      return <Redirect to='/login' />
    }
  }
}
export default Profile;
