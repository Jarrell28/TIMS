import React from 'react';


class SubmitButton extends React.component {

    render() {
        return (
            <div className="SubmitButton">

                <button
                    className='btn'
                    disabled={this.this.props.disabled}
                    onclick={() => this.props.onlcick()}

                >
                    {this.props.text}

                </button>

            </div>
        );
    }
}

export default SubmitButton;