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
      id: null,
      name: "",
      email: "",
      role: "",
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
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role
    });

    //If the user is a technician, shows only his requests
    if (decoded.role === "technician") {
      axios.get("/api/requests/user/" + decoded.id).then(response => this.loopRequestData(response));
    }
    //If the user is a administrator, shows all requests
    else if (decoded.role === "administrator") {
      axios.get("/api/requests/").then(response => this.loopRequestData(response));
      this.setState({
        columnDefs: [...this.state.columnDefs,
        { headerName: "", field: "Approve", sortable: true, filter: true, editable: true, cellRenderer: this.buttonApprove },
        { headerName: "", field: "Deny", sortable: true, filter: true, editable: true, cellRenderer: this.buttonDeny }
        ]
      })
    }

    this.props.checkPage();

  }

  //Loops the requests from DB and updates rowData state
  loopRequestData = response => {
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
      } else {
        item.userApproved = item.userApprove.name;
      }

      if (item.Loaner) {
        item.loaner = item.Loaner.brand + " " + item.Loaner.model;
      } else {
        item.loaner = "N/A";
      }

      //Attaches Id to the button if the user is administrator
      if (this.state.role === "administrator") {
        //Adds button value only if status is still pending
        if (item.status === "Pending") {
          item.Approve = item.id;
          item.Deny = item.id;
        }

      }
    })

    this.setState({ rowData: response.data });
  }

  //Creates Approve button in the table
  buttonApprove = params => {
    //Shows Approve button only if item status is still pending
    if (params.value) {
      let button = document.createElement('button');
      var text = 'Approve';
      //Sets data-id attribute to be id of item
      button.setAttribute("data-id", params.value);
      button.classList.add("view-button");
      button.innerHTML = text;
      button.addEventListener('click', this.approveRequest);
      return button;
    }

  }

  //Creates Deny button in the table
  buttonDeny = params => {
    //Shows deny button only if item status is still pending
    if (params.value) {
      let button = document.createElement('button');
      var text = 'Deny';
      //Sets data-id attribute to be id of item
      button.setAttribute("data-id", params.value);
      button.classList.add("view-button");
      button.innerHTML = text;
      button.addEventListener('click', this.denyRequest);
      return button;
    }
  }

  //approval functionality for updating DB
  approveRequest = e => {
    let id = e.target.dataset.id
    const date = new Date(Date.now());
    let dateFormatted = date.toDateString();

    axios({
      url: "/api/requests/" + id,
      method: "PUT",
      data: { status: "Approved", userApproveId: this.state.id, approvedDate: dateFormatted }
    }).then(() => {
      API.getData("requests").then(response => {
        this.loopRequestData(response)
      })
    });
  }

  //deny functionality for updating DB
  denyRequest = e => {
    let id = e.target.dataset.id
    const date = new Date(Date.now());
    let dateFormatted = date.toDateString();

    axios({
      url: "/api/requests/" + id,
      method: "PUT",
      data: { status: "Deny", userApproveId: this.state.id, approvedDate: dateFormatted }
    }).then(() => {
      API.getData("requests").then(response => {
        this.loopRequestData(response);
      })
    });
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

              {this.state.role === "guest" ?
                <p>Guest has view only capabilities</p>
                :
                <div><p className="h2 my-3">
                  Email: {this.state.email ? this.state.email : "jterrell@test.com"}
                </p>
                  <p className="h2 my-3">
                    Role: {this.state.role ? this.state.role : "Technician"}
                  </p>
                </div>

              }

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
