import React from 'react';
import "../css/main.css";

// This is the CHECKOUT PRODUCT Module Component
const CheckoutEquip = (props) => {

    const renderInputs = props.inputNames.map(input => {
        return (
            <div className="form-group" key={input.dbName + "-id"}>
                <label htmlFor={input.dbName}>{input.displayName}</label>
                <input className="form-control" type="text" name={input.dbName} id={input.dbName} placeholder={"Enter " + input.displayName} />
            </div>
        )
    })

    return (
        <form onSubmit={props.handleFormSubmit} encType="multipart/form-data" style={{ overflow: "auto" }}>
            <div className="d-flex justify-content-between">
                <h2>Checkout Equipment</h2>
                <span onClick={props.toggleCheckoutEquip}>Close</span>
            </div>
            {renderInputs}
            {props.children}
            {/* This button is inside module pop up */}
            <input className="add-button" type="submit" value="Checkout Item" />
        </form>
    )
}

export default CheckoutEquip;