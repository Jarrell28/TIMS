import React from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

//Modal that display selected item on Loaner Page
const ViewLoanerItem = (props) => {

    //When checking out item, it gets current user, attaches their id to this request
    //and sets the request status to pending
    const onCheckout = () => {
        const token = sessionStorage.usertoken;
        const decoded = jwt_decode(token);

        let obj = {
            status: "Pending",
            userRequestId: decoded.id,
            LoanerId: props.activeItem.id
        };

        //After submitting request, redirects to profile page
        axios.post("/api/requests", obj).then(response => {
            window.location.href = "/profile";
        })

    }

    return (
        <div className="item">
            <div className="d-flex justify-content-between">
                <h2 className="selected">You've Selected</h2>
                <span onClick={props.toggleViewItem} className="exit" style={{ cursor: "pointer" }}>X</span>
            </div>
            <p style={{ textAlign: "center" }}><img src={"images/" + props.activeItem.image} alt="image" style={{ width: "200px" }} /></p>
            <p className="inStock">IN-STOCK</p>

            <p className="spacerDiv"></p>

            <p className="subHeader">ITEM NAME</p>
            <h3 className="header">{props.activeItem.brand + " " + props.activeItem.model}</h3>

            <p className="subHeader">AVAILABLE</p>
            <h3 className="header">{props.count}</h3>

            <p className="subHeader">SERIAL NUMBER</p>
            <h3 className="header">{props.activeItem.serialNumber}</h3>

            <button className="checkoutBtn" onClick={onCheckout}>CHECKOUT ITEM</button>
        </div>
    )
}

export default ViewLoanerItem;