import React, { Component } from 'react';
import axios from 'axios';
import { Transition, animated } from 'react-spring/renderprops';
import { Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

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
            //Defining columns to be showed in table
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
                headerName: "", field: "view", sortable: true, filter: true, editable: false, cellRenderer: this.buttonRenderer
            }],
            //rowData will later be populated with data from the DB and displayed in table
            rowData: [],

            //Input names used by NewItem component when creating a new Item
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
            //Used to toggle new item modal
            toggleNewItem: false,
            //Used to toggle view item modal
            toggleViewItem: false,
            //Gets all categories
            categories: [],
            //Currently selected item
            activeItem: {},
            //Gets quantity of specific item
            count: 0,
            //Gets current slide in Slider Carousel
            currentSlide: 0
        }
    }

    componentDidMount() {
        //active Item
        let active = {};

        //Fetches data from equipment table
        API.getData("equipment").then(response => {
            response.data.forEach(item => {
                //If item has category attaches category name to result
                if (item.Category) {
                    item.category = item.Category.name
                }
                //Gets Id to be used by view button in table
                item.view = item.id;
                // item.delete = <button data-id={item.id}>X</button>;
            })
            //Sets active as first result from response
            active = response.data[0];
            //Updates rowData and activeItem
            this.setState({ rowData: response.data, activeItem: response.data[0] })
        }).then(() => {
            //if there is an active item gets total quantity of that model from DB
            if (active) {
                API.getDataCount("equipment", active).then(response => {
                    this.setState({ count: response.data })
                })
            }

        })

        //Fetches categories from DB and updates categories variable
        API.getData("categories").then(response => {
            this.setState({ categories: response.data })
        });

        //Checks if currently logged in user is a technician
        if (sessionStorage.usertoken) {
            const token = sessionStorage.usertoken;
            const decodedToken = jwt_decode(token);

            //If they are, it prevents them from editing the table data by setting editable boolean to false
            if (decodedToken.role === "technician") {
                this.setState({
                    columnDefs: [{
                        headerName: "Brand", field: "brand", sortable: true, filter: true, editable: false,
                    }, {
                        headerName: "Model", field: "model", sortable: true, filter: true, editable: false
                    }, {
                        headerName: "Serial Number", field: "serialNumber", sortable: true, filter: true, editable: false
                    }, {
                        headerName: "Expense Number", field: "expenseNumber", sortable: true, filter: true, editable: false
                    }, {
                        headerName: "Category", field: "category", sortable: true, filter: true, editable: false
                    }, {
                        headerName: "", field: "view", sortable: true, filter: true, editable: false, cellRenderer: this.buttonRenderer
                    }],
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        //This runs everytime the component updates
        //If the category has been changed
        if (prevProps.productContext !== this.props.productContext) {
            //compare prevProps vs newProps with if statement like in example

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

    //Toggles for modals for new item and viewing item
    toggleNewItem = () => this.setState({ toggleNewItem: !this.state.toggleNewItem });
    toggleViewItem = () => this.setState({ toggleViewItem: !this.state.toggleViewItem });

    //Handling form when creating new item
    handleFormSubmit = (e) => {
        e.preventDefault();

        //Creates new form object
        let formData = new FormData();
        //gets all input elements
        const elements = e.target.elements;
        //loops elements array and adds name and values to form object
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].name) {
                formData.append(elements[i].name, elements[i].value)
            }
        }
        //Sets image to form object
        formData.set("eImage", e.target.eImage.files[0]);

        //Sends data to backend to be created in DB
        axios.post("/api/equipment", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            //Updates rowData object
            const newData = response.data;
            this.setState({ rowData: [...this.state.rowData, newData] });
        })
    }

    //Creates view button in the table
    buttonRenderer = params => {
        let button = document.createElement('button');
        var text = 'View';
        //Sets data-id attribute to be id of item
        button.setAttribute("data-id", params.value);
        button.classList.add("view-button");
        button.innerHTML = text;
        button.addEventListener('click', this.onButtonClicked);
        return button;
    }

    //Gets Equipment by id when selecting view button, table row, or slide item
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
        //Fetches for data by id and updates state
        API.getDataById("equipment", id).then(response => {
            this.setState({ activeItem: response.data });
            active = response.data;
        }).then(() => {
            API.getDataCount("equipment", active).then(response => {
                this.setState({ count: response.data })
            })
        })


    }

    //When clicking row item in table, fetches item by id
    onRowClicked = e => {
        const rowIndex = e.rowIndex;
        this.getEquipmentById(e, "rowClick");
        this.setState({ currentSlide: rowIndex })
    }

    //When clicking slide, fetches item by id
    onSlideClicked = e => {
        const slideIndex = parseInt(e.target.offsetParent.dataset.index);
        this.getEquipmentById(e, "slideClick")
        this.setState({ currentSlide: slideIndex })
    }

    //When clicking view button, fetches item by id
    onButtonClicked = e => {
        this.getEquipmentById(e, "buttonClick");
        this.toggleViewItem();
    }


    render() {
        //Used to render list of categories in select element when creating new item
        const renderCategories = this.state.categories.length ? this.state.categories.map(category => <option key={category.id} value={parseInt(category.id)}>{category.name}</option>) : "";

        //Checks if there is a user logged in, if not redirects to login page
        if (sessionStorage.usertoken) {

            return (
                <div className="container-fluid">

                    <MainNav onContextClick={this.props.onContextClick}
                        mainNav={this.props.mainNav}
                        productContext={this.props.productContext}
                        checkPage={this.props.checkPage}
                        activePage={this.props.activePage}
                    />

                    <div className="shadowy text-center">
                        <SlickSlider rowData={this.state.rowData} currentSlide={this.state.currentSlide} onSlideClicked={this.onSlideClicked} />
                        <CarouselHeadlines activeItem={this.state.activeItem} count={this.state.count} category="Equipment" />
                    </div>
                    <div className="table-bg-container">
                        {/* <SearchBar /> */}
                        <div className="container">
                            <button onClick={this.toggleNewItem} className="add-button">Add New Equipment</button>

                        </div>
                        <InventoryTable rowData={this.state.rowData} columnDefs={this.state.columnDefs} buttonRenderer={this.buttonRenderer} onRowClicked={this.onRowClicked} currentSlide={this.state.currentSlide} />
                        {/* Modal for new item form */}
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

                        {/* Modal for viewing item */}
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
            //If user isn't logged in, redirects to login
            return <Redirect to='/login' />
        }
    }
}



export default Equipment;