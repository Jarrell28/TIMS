import React, { Component } from 'react';

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import MainNav from './components/Nav';
import Carousel from './components/Carousel';

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Make", field: "brand", sortable: true, filter: true, editable: true,
      }, {
        headerName: "Model", field: "model", sortable: true, filter: true, editable: true
      }, {
        headerName: "Serial Number", field: "serialNumber", sortable: true, filter: true, editable: true
      }, {
        headerName: "Expense Number", field: "expenseNumber", sortable: true, filter: true, editable: true
      }, {
        headerName: "Warranty Expiration", field: "warrantyExpiration", sortable: true, filter: true, editable: true
      }, {
        headerName: "Category", field: "category", sortable: true, filter: true, editable: true
      }],
      rowData: [{
        id: 1, brand: "Dell", model: "Celica",
      }, {
        id: 4, brand: "Ford", model: "Mondeo",
      }, {
        id: 8, brand: "Porsche", model: "Boxter",
      }]
    }
  }

  componentDidMount() {
    axios.get("http://localhost:3001/api/equipment").then(response => {
      console.log(response.data)
      response.data.forEach(item => {
        item.category = item.Category.name
      })
      this.setState({ rowData: response.data })
    });
  }

  onCellValueChanged = (event) => {
    console.log(event);
    axios({
      url: "http://localhost:3001/api/equipment/" + event.data.id,
      method: "PUT",
      data: event.data
    }).then(data => console.log(data));
  }

  render() {
    return (
      <div className="App" >
        <MainNav />
        <Carousel />

        <div
          className="ag-theme-balham"
          style={{
            height: "500px",
            maxHeight: '300px',
            width: '600px',
            marginLeft: "200px"
          }}
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            getRowNodeId={data => data.id}
            onCellValueChanged={this.onCellValueChanged}
          >
          </AgGridReact>
        </div>
      </div>
    )

  }
}

export default App;
