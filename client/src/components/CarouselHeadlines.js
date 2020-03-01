import React from 'react';

// css styling ---> Carousel.css


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
                    <h1 className="headlines">Item Unavailable</h1>

                    <div className="sub-headline">No Category</div>
                    <div className="sub-headline-in-stock">{props.count} AVAILABLE</div>
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