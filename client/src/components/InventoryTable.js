import React, { useRef, useEffect } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import axios from 'axios';

//Component that display data in table
const InventoryTable = (props) => {
    const didMountRef = useRef(false);
    const gridRef = useRef();

    //React hook for when component updates
    //Functionality to match selected table row to update which row is active
    useEffect(() => {
        if (didMountRef.current) {
            gridRef.current.api.forEachNode((node, i) => {
                if (node.rowIndex === props.currentSlide) {
                    node.setSelected(true, true);
                    //Create ref to be able to scroll to list when selecting slider?
                    // var currentRow = document.querySelector(`[row-index='${node.rowIndex}']`);
                    // currentRow.scrollIntoView();
                    // console.log(currentRow);

                }
            })
        } else didMountRef.current = true
    })

    //Updates data in DB when editing text in cell
    const onCellValueChanged = (event) => {
        // console.log("ID", event.data.id);
        axios({
            url: "/api/equipment/" + event.data.id,
            method: "PUT",
            data: event.data
        }).then(data => console.log(data));
    }

    //On initial grid load, highlights the active row
    const onGridReady = (gridApi) => {
        // gridApi.api.sizeColumnsToFit();
        gridApi.api.forEachNode((node, i) => {
            if (node.rowIndex === props.currentSlide) {
                node.setSelected(true, true);
            }
        })
    }

    const onFirstDataRendered = params => {
        params.api.sizeColumnsToFit();
    };

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
                ref={gridRef}
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
                onFirstDataRendered={onFirstDataRendered}
            >
            </AgGridReact>
        </div >
    )
}

export default InventoryTable;