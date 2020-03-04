import React from 'react';


class SubmitButton extends React.Component {

    render() {
        return (
            <div className="SubmitButton">

                <button
                    className='btn'
                    disabled={this.props.disabled}
                    onClick={() => this.props.onlcick()}

                >
                    {this.props.text}

                </button>

            </div>
        );
    }
}

export default SubmitButton;