import React from 'react';
import "../css/main.css";
import "../css/newItem.css";

// This is the ADD NEW PRODUCT Module Component
const NewItem = (props) => {

    const renderInputs = props.inputNames.map(input => {
        return (
            <div className="form-group" key={input.dbName + "-id"}>
                <label htmlFor={input.dbName} className={"newItemLabel"}>{input.displayName}</label>
                {/* boxes here */}
                <input className="form-control" type="text" name={input.dbName} id={input.dbName} placeholder={"Enter " + input.displayName} />
            </div>
        )
    })

    return (

        <form onSubmit={props.handleFormSubmit} encType="multipart/form-data" style={{ overflow: "auto" }}>
            <div className="bg">
                <div className="d-flex justify-content-between">

                    <div className="header">Add New Equipment</div>
                    <span onClick={props.toggleNewItem}>Close</span>
                </div>


                {renderInputs}
                {props.children}

                {/* This button is inside module pop up */}
                <input className="add-button" type="submit" value="Add Item" />
            </div>
        </form>

    )
}

export default NewItem;