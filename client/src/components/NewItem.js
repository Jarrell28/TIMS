import React from 'react';
import "../css/main.css";

// This is the ADD NEW PRODUCT Module Component
const NewItem = (props) => {

    const renderInputs = props.inputNames.map(input => {
        return (
            <div className="form-group" key={input.dbName + "-id"}>
                <label htmlFor={input.dbName}>{input.displayName}</label>
                <input className="form-control" type="text" name={input.dbName} id={input.dbName} placeholder={"Enter " + input.displayName} />
            </div>
        )
    })

    return (
        <form onSubmit={props.handleFormSubmit} encType="multipart/form-data">
            {props.children}
            {renderInputs}
            {/* This button is inside module pop up */}
            <input type="file" name="eImage"></input>
            <input className="add-button" type="submit" value="Add Item" />
        </form>
    )
}

export default NewItem;