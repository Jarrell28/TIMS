import React, { Component } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import axios from 'axios';

class InventoryTable extends Component {
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
            }]
        }
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
                    rowData={this.props.rowData}
                    getRowNodeId={data => data.id}
                    onCellValueChanged={this.onCellValueChanged}
                >
                </AgGridReact>
            </div>
        )

    }
}

export default InventoryTable;