import React, { Component } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class SlickSlider extends Component {
    constructor(props) {
        super(props)
    }

    renderSlides = () => {
        const slides = this.props.rowData.map(item => {
            return <div><img src={"images/" + item.image} alt='title or description' data-action="" style={{ maxWidth: "100%" }} /></div>
        })
        return slides;
    }

    render() {
        const settings = {
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "100px",
            slidesToShow: this.renderSlides().length > 5 ? 5 : this.renderSlides().length - 1,
            speed: 500,
            focusOnSelect: true,
            border: "none"
        };
        return (
            <div className="slickslider">
                <Slider {...settings}>
                    {this.renderSlides()}
                </Slider>
            </div>
        );
    }
}