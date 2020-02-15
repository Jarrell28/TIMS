import React from 'react';

const NewItem = (props) => {
    /* <label for={input.dbName}>{input.displayName}</label> */

    const renderInputs = props.inputNames.map(input => {
        return <input type="text" name={input.dbName} id={input.dbName} placeholder={"Enter " + input.displayName} />
    })

    return (
        <div>
            <form >
                {renderInputs}
                <input type="submit" value="Add Item" />
            </form>
        </div>
    )
}

export default NewItem;