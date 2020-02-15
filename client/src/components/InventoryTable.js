import React, { Component } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import NewItem from './NewItem';

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
                width: '100%'
            }}
        >
            <AgGridReact
                columnDefs={props.columnDefs}
                rowData={props.rowData}
                getRowNodeId={data => data.id}
                onCellValueChanged={onCellValueChanged}
                domLayout="autoHeight"
                onGridReady={onGridReady}
            >
            </AgGridReact>
        </div>
    )
}

export default InventoryTable;