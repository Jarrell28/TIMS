import React from 'react';

import img from '../images/docking-station_HP-Thunderbolt-Dock-G2.png';
import img2 from '../images/tower-hp-eliteDesk-800.png';
import img3 from '../images/laptop_HP-Zbook-15-G5.png';
import img4 from '../images/battery_DELL-J60J5-Li-ion.png';
import img5 from '../images/battery_HP-LHP266-Li-ion.png';
import img6 from '../images/hard-drive_WD-blue-500-GB-hard-disk.png';

import '../css/carousel.css';


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
                {/* <img
                    src='[image/path/please_change]'
                    alt='title or description'
                    style={{ display: 'block', width: '100%' }}
                /> */}
            </div>
            <img src={img} alt='title or description' data-action="" />
            <img src={img2} alt='title or description' data-action="" />
            <img src={img3} alt='title or description' />
            <img src={img4} alt='title or description' />
            <img src={img5} alt='title or description' />
            <img src={img6} alt='title or description' />
        </Coverflow>

    )
};

export default Carousel;