import React from 'react';
import dell from '../images/laptop_DELL-latitude-7480.jpg';
var Coverflow = require('react-coverflow');

const Carousel = () => {
    return (
        <Coverflow
            width={960}
            height={480}
            displayQuantityOfSide={2}
            navigation={false}
            enableHeading={false}
        >
            <div

                role="menuitem"
                tabIndex="0"
            >
                <img
                    src='[image/path/please_change]'
                    alt='title or description'
                    style={{ display: 'block', width: '100%' }}
                />
            </div>
            <img src={dell} alt='title or description' data-action="http://andyyou.github.io/react-coverflow/" />
            <img src={dell} alt='title or description' data-action="http://andyyou.github.io/react-coverflow/" />
        </Coverflow>

    )
};

export default Carousel;