import React, { Component } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import axios from 'axios';

const InventoryTable = (props) => {

    const onCellValueChanged = (event) => {
        console.log(event);
        axios({
            url: "http://localhost:3001/api/equipment/" + event.data.id,
            method: "PUT",
            data: event.data
        }).then(data => console.log(data));
    }

    const onGridReady = (gridApi) => {
        console.log(gridApi);
        gridApi.api.sizeColumnsToFit();
    }

    return (
        <div
            className="ag-theme-balham"
            style={{
                // background: 'black',
                width: '100%',
                height: "400px"

            }}
        >
            <AgGridReact
                columnDefs={props.columnDefs}
                rowData={props.rowData}
                getRowNodeId={data => data.id}
                onCellValueChanged={onCellValueChanged}
                rowHeight="75"
                domLayout="normal"
                onGridReady={onGridReady}
                rowSelection='single'
                buttonRenderer={props.buttonRenderer}

            >
            </AgGridReact>
        </div >
    )
}
// domLayout="autoHeight"

export default InventoryTable;