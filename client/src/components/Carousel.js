import React from 'react';

import img from '../images/docking-station_HP-Thunderbolt-Dock-G2.png';
import img2 from '../images/tower-hp-eliteDesk-800.png';
import img3 from '../images/laptop_HP-Zbook-15-G5.png';
import img4 from '../images/battery_DELL-J60J5-Li-ion.png';
import img5 from '../images/battery_HP-LHP266-Li-ion.png';
import img6 from '../images/hard-drive_WD-blue-500-GB-hard-disk.png';
import img7 from '../images/docking-station_Dell-Dock-WD-15.png';
import img8 from '../images/hard-drive_Samsung-860-EVO-500GB-SSD.png';

import '../css/carousel.css';
import '../css/main.css';

var Coverflow = require('react-coverflow');

const Carousel = () => {
    return (
        <Coverflow
            width={960}
            height={300}
            displayQuantityOfSide={2}
            navigation={false}
            enableHeading={false}
            active={1}
        >

            <img src={img} alt='title or description' data-action="" />
            <img src={img2} alt='title or description' data-action="" />
            <img src={img3}  className= "reflectBelow" alt='title or description' />
            <img src={img4} alt='title or description' />
            <img src={img5} alt='title or description' />
            <img src={img6} alt='title or description' />
            <img src={img7} alt='title or description' />
            <img src={img8} alt='title or description' />
        </Coverflow>

    )
};

export default Carousel;