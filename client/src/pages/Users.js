import React, { Component } from 'react';
import axios from 'axios';

import MainNav from '../components/Nav'






export default class Loaner extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rowData: []

        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/api/users").then(response => {
            console.log(response.data)
            response.data.forEach(item => {
                // item.category = item.Category.name
            })
            this.setState({ rowData: response.data })
        });
    }


    render() {
        return (
            <div className="App" >
                {/* <MainNav />
                <CarouselHeadlines />
                <Carousel />

                <InventoryTable rowData={this.state.rowData} /> */}
            </div>
        )
    }
}