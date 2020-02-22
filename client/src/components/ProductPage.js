import React, { Component } from 'react';

import CarouselHeadlines from './components/CarouselHeadlines';
import AddButton from './components/AddButton';


class ProductPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid">
                    <button onClick={this.toggleNewItem} className="add-button">Add New Equipment</button>
                   
                    <Transition
                        native
                        items={this.state.toggleNewItem}
                        from={{ opacity: 0, marginTop: -500 }}
                        enter={{ opacity: 1, marginTop: 20 }}
                        leave={{ opacity: 0, marginTop: -500 }}
                        config={{ duration: 300 }}
                    >
                        {show => show && (props => (
                            <div className="newItem">
                                <animated.div style={props}>
                                    <NewItem inputNames={this.state.inputNames} handleFormSubmit={this.handleFormSubmit}>
                                        <div className="d-flex justify-content-between">
                                            <h2>Add New Equipment</h2>
                                            <span onClick={this.toggleNewItem}>Close</span>
                                        </div>
                                    </NewItem>
                                </animated.div>
                            </div>
                        ))}
                    </Transition>

                </div>
            </div>
        )
    }
}

export default ProductPage;