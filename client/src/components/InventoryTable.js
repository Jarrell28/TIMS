import React from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import axios from 'axios';

const InventoryTable = (props) => {

    const onCellValueChanged = (event) => {
        console.log("ID", event.data.id);
        axios({
            url: "/api/equipment/" + event.data.id,
            method: "PUT",
            data: event.data
        }).then(data => console.log(data));
    }

    const onGridReady = (gridApi) => {
        gridApi.api.sizeColumnsToFit();
    }

    return (
        <div
            className="ag-theme-balham container"
            style={{
                // background: 'black',
                width: '100%',
                height: "400px",
                background: 'transparent',
                paddingBottom: "40px"
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
                onRowClicked={props.onRowClicked}
            >
            </AgGridReact>
        </div >
    )
}
// domLayout="autoHeight"

export default InventoryTable;