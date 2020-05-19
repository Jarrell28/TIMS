import React, { Component } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/carousel.css";


class SlickSlider extends Component {
    constructor(props) {
        super(props)
    }

    //Loops the rowData object from parent component and creates a slide element for each one
    renderSlides = () => {
        const slides = this.props.rowData.map(item => {
            return <div key={item.id} data-index={item.id} style={{ width: "250px" }}><img src={"images/" + item.image} alt='Image Unavailable' style={{ width: "100%" }} onClick={this.props.onSlideClicked} /></div>
        })
        return slides;
    }

    componentDidUpdate(prevProps, prevState) {
        //updates current slide when component is updated, prompting the select animation
        if (prevProps.currentSlide !== this.props.currentSlide) {
            this.slider.slickGoTo(this.props.currentSlide)
        }
    }

    render() {
        //Logic to show how many slides to show based on how many slides are available
        let slidesToShow;
        switch (this.renderSlides().length) {
            case 5:
                slidesToShow = 3;
                break;
            case 4:
                slidesToShow = 3;
                break;
            case 3:
                slidesToShow = 1;
                break;
            case 2:
                slidesToShow = 1;
                break;
            case 1:
                slidesToShow = 1;
                break;
            default:
                slidesToShow = 5;
                break;
        }

        //Slider settings
        const settings = {
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "100px",
            slidesToShow: slidesToShow,
            speed: 500,
            focusOnSelect: true,
            border: "none",
            variableWidth: true,
            rows: 1
        };

        return (
            <div className="slickslider">
                <Slider ref={slider => (this.slider = slider)} {...settings}>
                    {this.renderSlides()}
                </Slider>
            </div>
        );
    }

}

export default SlickSlider;