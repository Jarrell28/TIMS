import React from 'react';


const ViewItem = (props) => {
    return (
        <div className="item">


            <div className="d-flex justify-content-between">
                <h2>You've Selected</h2>
                <span onClick={props.toggleViewItem}>Close</span>
            </div>
            <img src={"images/" + props.activeItem.image} alt="image" className="d-block" style={{ width: "200px" }} />
            <strong>IN-STOCK</strong>

            <p>CATEGORY</p>
            <h3>{props.activeItem.Category.name}</h3>

            <p>ITEM NAME</p>
            <h3>{props.activeItem.brand + " " + props.activeItem.model}</h3>

            <p>AVAILABLE</p>
            <h3>{props.count}</h3>

            <p>SERIAL NUMBER</p>
            <h3>{props.activeItem.serialNumber}</h3>

            <button>CHECKOUT ITEM</button>
        </div>
    )
}

export default ViewItem;