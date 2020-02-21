import React from 'react';

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
        <form onSubmit={props.handleFormSubmit}>
            {props.children}
            {renderInputs}
            <input className="btn btn-danger" type="submit" value="Add Item" />
        </form>
    )
}

export default NewItem;