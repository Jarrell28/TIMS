import React, { Component } from 'react';
import axios from 'axios';
import { Transition, animated } from 'react-spring/renderprops';
import { Redirect } from 'react-router-dom';

import API from '../utils/API';
import InventoryTable from '../components/InventoryTable';
import NewItem from '../components/NewItem';
import CarouselHeadlines from '../components/CarouselHeadlines';
import SearchBar from '../components/SearchBar';
import SlickSlider from '../components/SlickSlider';
import ViewItem from '../components/ViewItem';
import MainNav from '../components/MainNav';

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
                headerName: "Category", field: "category", sortable: true, filter: true, editable: true
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
                {
                    displayName: "Expense Number",
                    dbName: "expenseNumber"
                }
            ],
            toggleNewItem: false,
            toggleViewItem: false,
            categories: [],
            activeItem: {},
            count: 0,
            currentSlide: 0
        }
    }

    componentDidMount() {

        let active = {};
        API.getData("equipment").then(response => {
            response.data.forEach(item => {
                if (item.Category) {
                    item.category = item.Category.name
                }
                item.view = item.id;
                // item.delete = <button data-id={item.id}>X</button>;
            })
            active = response.data[0];
            this.setState({ rowData: response.data, activeItem: response.data[0] })
        }).then(() => {
            if (active) {
                API.getDataCount("equipment", active).then(response => {
                    this.setState({ count: response.data })
                })
            }

        })

        API.getData("categories").then(response => {
            this.setState({ categories: response.data })
        });
    }

    componentDidUpdate(prevProps, prevState) {
        //This runs everytime the component updates
        if (prevProps.productContext !== this.props.productContext) {
            //compare prevProps vs newProps with if statement like in example
            console.log('product context state has changed.')

            let active = {};

            //if state changes, create an axios get request to backend route
            axios.get("/api/equipment/category/" + this.props.productContext).then(response => {
                response.data.forEach(item => {
                    if (item.Category) {
                        item.category = item.Category.name
                    }
                    item.view = item.id;
                    // item.delete = <button data-id={item.id}>X</button>;
                })

                this.setState({ rowData: response.data, activeItem: response.data[0] })
                //update rowData state based off of response
            }).then(() => {
                API.getDataCount("equipment", active).then(response => {
                    this.setState({ count: response.data })
                })
            });
        }

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
            }
        }

        formData.set("eImage", e.target.eImage.files[0]);

        axios.post("/api/equipment", formData, {
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

    getEquipmentById = (e, method) => {
        let id;
        if (method === "rowClick") {
            //e.data.id comes from when the row is clicked, used in onRowClicked function
            id = e.data.id
        } else if (method === "slideClick") {
            // gets the equipment id when slider is clicked
            id = e.target.parentElement.dataset.index;
        } else if (method === "buttonClick") {
            //e.target is from when the view button is clicked on the table grid
            id = e.target.getAttribute('data-id')
        }

        let active = {}

        API.getDataById("equipment", id).then(response => {
            this.setState({ activeItem: response.data });
            active = response.data;
        }).then(() => {
            API.getDataCount("equipment", active).then(response => {
                this.setState({ count: response.data })
            })
        })


    }

    onRowClicked = e => {
        const rowIndex = e.rowIndex;
        this.getEquipmentById(e, "rowClick");
        this.setState({ currentSlide: rowIndex })
    }

    onSlideClicked = e => {
        const slideIndex = e.target.offsetParent.dataset.index;
        this.getEquipmentById(e, "slideClick")
        this.setState({ currentSlide: slideIndex })
    }

    onButtonClicked = e => {
        this.getEquipmentById(e, "buttonClick");
        this.toggleViewItem();
    }


    render() {

        const renderCategories = this.state.categories.length ? this.state.categories.map(category => <option key={category.id} value={parseInt(category.id)}>{category.name}</option>) : "";

        if (sessionStorage.usertoken) {

            return (
                <div className="container-fluid">

                    <MainNav onContextClick={this.props.onContextClick}
                        mainNav={this.props.mainNav}
                        productContext={this.props.productContext} />

                    <div className="shadowy text-center">
                        <SlickSlider rowData={this.state.rowData} currentSlide={this.state.currentSlide} onSlideClicked={this.onSlideClicked} />
                        <CarouselHeadlines activeItem={this.state.activeItem} count={this.state.count} category="Equipment" />
                    </div>
                    <div className="table-bg-container">
                        <SearchBar />
                        <div className="container">
                            <button onClick={this.toggleNewItem} className="add-button">Add New Equipment</button>

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
                                                <label htmlFor="categorySelect" className="newItemLabel">Category</label>
                                                <select name="CategoryId" className="form-control" id="categorySelect">
                                                    {renderCategories}
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="eImage" className="d-block newItemLabel">Image</label>
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
                                        <ViewItem activeItem={this.state.activeItem} toggleViewItem={this.toggleViewItem} count={this.state.count}>

                                        </ViewItem>
                                    </animated.div>
                                </div>
                            ))}
                        </Transition>

                    </div>
                </div>
            )
        } else {
            return <Redirect to='/login' />
        }
    }
}



export default Equipment;