import React, { Component } from 'react';
import axios from 'axios';
import { Transition, animated } from 'react-spring/renderprops';

import InventoryTable from '../components/InventoryTable';
import NewItem from '../components/NewItem';
import CarouselHeadlines from '../components/CarouselHeadlines';
import SearchBar from '../components/SearchBar';
import SlickSlider from '../components/SlickSlider';

import '../css/dataGrid.css';

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

        let formData = new FormData();
        const elements = e.target.elements;

        for (let i = 0; i < elements.length; i++) {
            if (elements[i].name) {
                // newObj[elements[i].name] = elements[i].value
                formData.append(elements[i].name, elements[i].value)
            }
        }

        formData.set("eImage", e.target.eImage.files[0]);

        axios.post("http://localhost:3001/api/equipment", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            const newData = response.data;
            this.setState({ rowData: [...this.state.rowData, newData] });
        })
    }

    buttonRenderer = params => {
        let button = document.createElement('button');
        var text = 'View';
        // one star for each medal
        button.setAttribute("data-id", params.value);
        button.innerHTML = text;
        button.addEventListener('click', this.getEquipmentById);

        return button;
    }

    getEquipmentById = e => {
        const id = e.target.getAttribute('data-id');

        axios.get("http://localhost:3001/api/equipment/" + id).then(response => {
            console.log(response.data);
        })
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="shadowy">

                    <SlickSlider rowData={this.state.rowData} />
                    <CarouselHeadlines />
                </div>
                <div className="table-bg-container">
                    <SearchBar />

                    <button onClick={this.toggleNewItem} className="add-button">Add New Equipment</button>
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