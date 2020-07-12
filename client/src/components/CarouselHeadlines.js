import React from 'react';

//Shows item name, category and quantity for Equipment page and Loaner Page
const CarouselHeadlines = (props) => {

    if (props.category === "Equipment") {
        if (props.activeItem) {
            return (
                <div>
                    <h1 className="headlines">{props.activeItem ? props.activeItem.brand + " " + props.activeItem.model : "Item Unavailable"}</h1>

                    <div className="sub-headline">{props.activeItem.Category ? props.activeItem.Category.name : "No Category"}</div>
                    <div className="sub-headline-in-stock">{props.count} AVAILABLE</div>
                </div>

            )
        } else {
            return (
                <div>
                    <h1 className="headlines">No Items in this category</h1>
                </div>
            )
        }

    } else if (props.category === "Loaners") {
        return (
            <div>
                <h1 className="headlines">{props.activeItem ? props.activeItem.brand + " " + props.activeItem.model : "Item Unavailable"}</h1>

                <div className="sub-headline">Laptops</div>
                <div className="sub-headline-in-stock">{props.count} AVAILABLE</div>
            </div>
        )
    }
}

export default CarouselHeadlines;