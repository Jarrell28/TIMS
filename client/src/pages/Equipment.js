import React, { Component } from 'react';
import axios from 'axios';
import { Transition, animated } from 'react-spring/renderprops';

import InventoryTable from '../components/InventoryTable';
import NewItem from '../components/NewItem';

class Equipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [{
                headerName: "Brand", field: "brand", sortable: true, filter: true, editable: true,
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
            }, {
                headerName: "Delete", field: "delete", sortable: true, filter: true, editable: true, cellRenderer: this.buttonRenderer
            }],
            rowData: [],

            inputNames: [
                {
                    displayName: "Brand",
                    dbName: "brand"
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
                    dbName: "CategoryId"
                }
            ],
            toggleNewItem: false
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/api/equipment").then(response => {
            response.data.forEach(item => {
                if (item.Category) {
                    item.category = item.Category.name
                }
                item.delete = item.id;
                // item.delete = <button data-id={item.id}>X</button>;
            })
            this.setState({ rowData: response.data })
        });
    }

    toggleNewItem = () => this.setState({ toggleNewItem: !this.state.toggleNewItem });

    handleFormSubmit = (e) => {
        e.preventDefault();
        const newObj = {};
        const elements = e.target.elements;

        for (let i = 0; i < elements.length; i++) {
            if (elements[i].name) {
                newObj[elements[i].name] = elements[i].value
            }
        }

        axios.post("http://localhost:3001/api/equipment", newObj).then(response => {
            const newData = response.data;
            this.setState({ rowData: [...this.state.rowData, newData] });
        })
    }

    buttonRenderer = params => {
        let button = document.createElement('button');
        var text = '';
        // one star for each medal
        for (var i = 0; i < params.value; i++) {
            text += '#';
        }
        button.innerHTML = text;

        return button;
    }

    render() {
        return (
            <div className="container-fluid equipment-container">
                <div className="container">
                    <button onClick={this.toggleNewItem}>Add New Item</button>
                    <InventoryTable rowData={this.state.rowData} columnDefs={this.state.columnDefs} buttonRenderer={this.buttonRenderer} />
                    <Transition
                        native
                        items={this.state.toggleNewItem}
                        from={{ opacity: 0, marginTop: -500 }}
                        enter={{ opacity: 1, marginTop: 20 }}
                        leave={{ opacity: 0, marginTop: -500 }}
                        config={{ duration: 300 }}
                    >
                        {show => show && (props => (
                            <div className="newItem">
                                <animated.div style={props}>
                                    <NewItem inputNames={this.state.inputNames} handleFormSubmit={this.handleFormSubmit}>
                                        <div className="d-flex justify-content-between">
                                            <h2>Add New Equipment</h2>
                                            <span onClick={this.toggleNewItem}>Close</span>
                                        </div>
                                    </NewItem>
                                </animated.div>
                            </div>
                        ))}
                    </Transition>

                </div>
            </div>
        )
    }
}

export default Equipment;