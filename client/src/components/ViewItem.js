import React from 'react';
import "../css/checkout.css";

const ViewItem = (props) => {
    return (
        <div className="item">


            <div className="d-flex justify-content-between">
                <h2 className="selected">You've Selected</h2>
                <span onClick={props.toggleViewItem} className="exit">X</span>
            </div>
            <p style={{ textAlign: "center" }}>
                <img src={"images/" + props.activeItem.image} alt="image" style={{ width: "350px" }} />
            </p>

            <p className="inStock">IN-STOCK</p>

            <p className="spacerDiv"></p>

            <p className="subHeader">CATEGORY</p>
            <h3 className="header">{props.activeItem.Category.name}</h3>

            <p className="subHeader">ITEM NAME</p>
            <h3 className="header">{props.activeItem.brand + " " + props.activeItem.model}</h3>

            <p className="subHeader">AVAILABLE</p>
            <h3 className="header">{props.count}</h3>

            <p className="subHeader">SERIAL NUMBER</p>
            <h3 className="header">{props.activeItem.serialNumber}</h3>

            <button className="checkoutBtn">CHECKOUT ITEM</button>
        </div>
    )
}

export default ViewItem;