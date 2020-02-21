import React, { Component } from 'react';
import axios from 'axios';

import MainNav from '../components/MainNav'
import CarouselHeadlines from '../components/CarouselHeadlines'
import Carousel from '../components/Carousel'
import InventoryTable from '../components/InventoryTable'


export default class Loaner extends Component {

    constructor(props) {
        super(props)
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
                headerName: "Customer ID", field: "customerId", sortable: true, filter: true, editable: true
            }, {
                headerName: "Checked Out", field: "checkedOut", sortable: true, filter: true, editable: true
            }, {
                headerName: "Date Out", field: "checkoutDate", sortable: true, filter: true, editable: true
            }, {
                headerName: "Date In", field: "checkoutIn", sortable: true, filter: true, editable: true
            }, {
                headerName: "Technician", field: "techName", sortable: true, filter: true, editable: true
            }],
            rowData: [],

            inputNames: [
                {
                    displayName: "Make",
                    dbName: "make"
                },
                {
                    displayName: "Model",
                    dbName: "model"
                },
                {
                    displayName: "Serial Number",
                    dbName: "serialNumber"
                },
                {
                    displayName: "Expense Number",
                    dbName: "expenseNumber"
                },
                {
                    displayName: "Warranty Expiration",
                    dbName: "warrantyExpiration"
                },
                {
                    displayName: "Category",
                    dbName: "category"
                }
            ]
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/api/loaners").then(response => {
            console.log(response.data)
            response.data.forEach(item => {
                item.techName = item.tech.name
            })
            this.setState({ rowData: response.data })
        });
    }


    render() {
        return (
            <div className="container" >
                <InventoryTable rowData={this.state.rowData} columnDefs={this.state.columnDefs} />
            </div>
        )
    }
}