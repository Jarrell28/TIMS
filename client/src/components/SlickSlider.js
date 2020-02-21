import React, { Component } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img from '../images/docking-station_HP-Thunderbolt-Dock-G2.png';
import img2 from '../images/tower-hp-eliteDesk-800.png';
import img3 from '../images/laptop_HP-Zbook-15-G5.png';
import img4 from '../images/battery_DELL-J60J5-Li-ion.png';
import img5 from '../images/battery_HP-LHP266-Li-ion.png';
import img6 from '../images/hard-drive_WD-blue-500-GB-hard-disk.png';
import img7 from '../images/docking-station_Dell-Dock-WD-15.png';
import img8 from '../images/hard-drive_Samsung-860-EVO-500GB-SSD.png';

export default class SlickSlider extends Component {
    render() {
        const settings = {
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 5,
            speed: 500,
            focusOnSelect: true,
            initialSlide: 3
        };
        return (
            <div className="slickslider">
                <Slider {...settings}>
                    <div>
                        <img src={img} alt='title or description' data-action="" style={{ maxWidth: "100%" }} />
                    </div>
                    <div>
                        <img src={img2} alt='title or description' data-action="" style={{ maxWidth: "100%" }} />
                    </div>
                    <div>
                        <img src={img3} alt='title or description' data-action="" style={{ maxWidth: "100%" }} />
                    </div>
                    <div>
                        <img src={img4} alt='title or description' data-action="" style={{ maxWidth: "100%" }} />
                    </div>
                    <div>
                        <img src={img5} alt='title or description' data-action="" style={{ maxWidth: "100%" }} />
                    </div>
                    <div>
                        <img src={img6} alt='title or description' data-action="" style={{ maxWidth: "100%" }} />
                    </div>
                    <div>
                        <img src={img7} alt='title or description' data-action="" style={{ maxWidth: "100%" }} />
                    </div>
                    <div>
                        <img src={img8} alt='title or description' data-action="" style={{ maxWidth: "100%" }} />
                    </div>
                </Slider>
            </div>
        );
    }
}