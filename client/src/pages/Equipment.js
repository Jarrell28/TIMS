import React, { Component } from 'react';
import InventoryTable from '../components/InventoryTable';

import MainNav from '../components/Nav';
import Carousel from '../components/Carousel';
import CarouselHeadlines from '../components/CarouselHeadlines';

import axios from 'axios';

class Equipment extends Component {
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
            rowDate: [],

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
        console.log("componenet mounted")
        axios.get("http://localhost:3001/api/equipment").then(response => {
            console.log(response.data)
            //response.data.forEach(item => {
            // item.category = item.Category.name
            //})
            this.setState({ rowData: response.data })
        });
    }

    render() {
        return (
            <div>
                <MainNav />
                <CarouselHeadlines />
                <Carousel />
                <div className="container">
                    <InventoryTable rowData={this.state.rowData} columnDefs={this.state.columnDefs} />
                </div>
            </div>
        )
    }
}

export default Equipment;