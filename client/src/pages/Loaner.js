import React, { Component } from 'react';
import axios from 'axios';
import { Transition, animated } from 'react-spring/renderprops';

import InventoryTable from '../components/InventoryTable';
import NewItem from '../components/NewItem';
import SlickSlider from '../components/SlickSlider';
import CarouselHeadlines from '../components/CarouselHeadlines';
import SearchBar from '../components/SearchBar';
import ViewLoanerItem from '../components/ViewLoanerItem';


export default class Loaner extends Component {

    constructor(props) {
        super(props)
        this.state = {
            columnDefs: [{
                headerName: "Brand", field: "brand", sortable: true, filter: true, editable: true,
            }, {
                headerName: "Model", field: "model", sortable: true, filter: true, editable: true
            }, {
                headerName: "Serial Number", field: "serialNumber", sortable: true, filter: true, editable: true
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
            }, {
                headerName: "", field: "view", sortable: true, filter: true, editable: true, cellRenderer: this.buttonRenderer
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
            ],
            toggleNewItem: false,
            toggleViewItem: false,
            activeItem: {},
            count: 0,
        }
    }

    componentDidMount() {
        let active = {};

        axios.get("http://localhost:3001/api/loaners").then(response => {
            response.data.forEach(item => {

                if (item.techId) {
                    item.techName = item.tech.name
                }
                item.view = item.id;

            })
            active = response.data[0];
            this.setState({ rowData: response.data, activeItem: response.data[0] })
        }).then(() => {
            if (active) {
                axios.get("http://localhost:3001/api/loaners/count/" + active.model).then(response => {
                    this.setState({ count: response.data })
                })
            }
        })
    }

    toggleNewItem = () => this.setState({ toggleNewItem: !this.state.toggleNewItem });
    toggleViewItem = () => this.setState({ toggleViewItem: !this.state.toggleViewItem });

    handleFormSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        const elements = e.target.elements;

        for (let i = 0; i < elements.length; i++) {
            if (elements[i].name) {
                formData.append(elements[i].name, elements[i].value)
                console.log(elements[i].name)
            }
        }

        formData.set("eImage", e.target.eImage.files[0]);


        axios.post("http://localhost:3001/api/loaners", formData, {
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
        button.classList.add("view-button");
        button.innerHTML = text;
        button.addEventListener('click', this.onButtonClicked);

        return button;
    }

    getLoanerById = (e, method) => {
        let id;
        let active = {}

        if (method === "rowClick") {
            //e.data.id comes from when the row is clicked, used in onRowClicked function
            id = e.data.id
        } else if (method === "slideClick") {
            // gets the loaner id when slider is clicked
            id = e.target.parentElement.dataset.index;
        } else if (method === "buttonClick") {
            //e.target is from when the view button is clicked on the table grid
            id = e.target.getAttribute('data-id')
        }

        axios.get("http://localhost:3001/api/loaners/" + id).then(response => {
            this.setState({ activeItem: response.data });
            active = response.data;
        }).then(() => {
            axios.get("http://localhost:3001/api/loaners/count/" + active.model).then(response => {
                this.setState({ count: response.data })
            })
        })
    }

    onRowClicked = e => {
        const rowIndex = e.rowIndex;
        this.getLoanerById(e, "rowClick");
        this.setState({ currentSlide: rowIndex })
    }

    onSlideClicked = e => {
        const slideIndex = e.target.offsetParent.dataset.index;
        this.getLoanerById(e, "slideClick")
        this.setState({ currentSlide: slideIndex })
    }

    onButtonClicked = e => {
        this.getLoanerById(e, "buttonClick");
        this.toggleViewItem();
    }


    render() {
        return (
            <div className="container-fluid" >
                <div className="shadowy text-center">
                    <SlickSlider rowData={this.state.rowData} currentSlide={this.state.currentSlide} onSlideClicked={this.onSlideClicked} />
                    <CarouselHeadlines activeItem={this.state.activeItem} count={this.state.count} category="Loaners" />
                </div>
                <div className="table-bg-container">
                    <SearchBar />
                    <div className="container mt-4">
                        <button onClick={this.toggleNewItem} className="add-button">Add New Loaner</button>

                    </div>
                    <InventoryTable rowData={this.state.rowData} columnDefs={this.state.columnDefs} buttonRenderer={this.buttonRenderer} onRowClicked={this.onRowClicked} />

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
                                    <NewItem inputNames={this.state.inputNames} handleFormSubmit={this.handleFormSubmit} toggleNewItem={this.toggleNewItem}>

                                        <div className="form-group">
                                            <label htmlFor="eImage" className="d-block">Image</label>
                                            <input type="file" name="eImage" id="eImage"></input>
                                        </div>
                                    </NewItem>
                                </animated.div>
                            </div>
                        ))}
                    </Transition>

                    <Transition
                        native
                        items={this.state.toggleViewItem}
                        from={{ opacity: 0, marginTop: -500 }}
                        enter={{ opacity: 1, marginTop: 20 }}
                        leave={{ opacity: 0, marginTop: -500 }}
                        config={{ duration: 300 }}
                    >
                        {show => show && (props => (
                            <div className="viewItem">
                                <animated.div style={props}>
                                    <ViewLoanerItem activeItem={this.state.activeItem} toggleViewItem={this.toggleViewItem} count={this.state.count}>

                                    </ViewLoanerItem>
                                </animated.div>
                            </div>
                        ))}
                    </Transition>

                </div>
            </div>
        )
    }
}