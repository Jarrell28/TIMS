import React from 'react';


class InputField extends React.Component {

    render() {
        return (
            <div className="InputField">

                <input
                    className='input'
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={(e) => this.props.onChange(e.target.value)}
                />

            </div>
        );
    }
}

export default InputField;