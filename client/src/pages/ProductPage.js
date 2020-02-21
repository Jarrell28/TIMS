import React, { Component } from 'react';

import CarouselHeadlines from './components/CarouselHeadlines';
import AddButton from './components/AddButton';


class ProductPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div className="product-page" >
                    <CarouselHeadlines />
                    {/* Image of product */}
                    {/* details of product from database */}
                    {/* button to checkout product */}
                    <AddButton />
                </div>
            </Router>
        )
    }
}

export default ProductPage;