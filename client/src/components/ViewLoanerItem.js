import React from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

//Modal that display selected item on Loaner Page
const ViewLoanerItem = (props) => {

    //When checking out item, it gets current user, attaches their id to this request
    //and sets the request status to pending
    const onCheckout = (e) => {
        e.preventDefault();
        //Gets value of customer Id
        const customerId = e.target.elements.customerId.value;
        const date = new Date(Date.now());
        let dateFormatted = date.toDateString();
        let LoanerId = props.activeItem.id;

        const token = sessionStorage.usertoken;
        const decoded = jwt_decode(token);

        let updateObj = {
            customerId: customerId,
            checkedOut: true,
            checkoutDate: dateFormatted,
            techId: decoded.id
        }

        let requestObj = {
            status: "Pending",
            userRequestId: decoded.id,
            LoanerId: LoanerId
        };

        axios({
            url: "/api/loaners/" + LoanerId,
            method: "PUT",
            data: updateObj
        }).then(() => {
            //After submitting request, redirects to profile page
            axios.post("/api/requests", requestObj).then(response => {
                window.location.href = "/profile";
            })
        }
        );



    }

    return (
        <div className="item">
            <div className="d-flex justify-content-between">
                <h2 className="selected">You've Selected</h2>
                <span onClick={props.toggleViewItem} className="exit" style={{ cursor: "pointer" }}>X</span>
            </div>
            <p style={{ textAlign: "center" }}><img src={"images/" + props.activeItem.image} alt="image" style={{ width: "200px" }} /></p>
            {/* <p className="inStock">IN-STOCK</p> */}

            {/* <p className="spacerDiv"></p> */}

            <p className="subHeader">ITEM NAME</p>
            <h3 className="header">{props.activeItem.brand + " " + props.activeItem.model}</h3>

            <p className="subHeader">AVAILABLE</p>
            <h3 className="header">{props.count}</h3>

            <p className="subHeader">Serial Number</p>
            <h3 className="header">{props.activeItem.serialNumber}</h3>

            <p className="subHeader">Checked Out</p>
            <h3 className="header">{props.activeItem.checkedOut ? "True" : "False"}</h3>

            {props.activeItem.checkedOut &&
                <div>
                    <p className="subHeader">Checked Out By</p>
                    <h3 className="header">{props.activeItem.tech.name}</h3>
                </div>
            }

            <form onSubmit={onCheckout}>
                <p className="subHeader">Customer ID</p>
                <input type="text" placeholder={props.activeItem.checkedOut ? props.activeItem.customerId : "Customer ID"} name="customerId" required="required" id="customerId" />
                <button type="submit" className="checkoutBtn" disabled={props.activeItem.checkedOut ? true : false}>CHECKOUT ITEM</button>
            </form>
        </div>
    )
}

export default ViewLoanerItem;