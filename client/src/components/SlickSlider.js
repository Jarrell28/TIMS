import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/carousel.css";

const SlickSlider = (props) => {
    //slider

    const renderSlides = () => {
        const slides = props.rowData.map(item => {
            return <div key={item.id}><img src={"images/" + item.image} alt='title or description' data-action="" style={{ maxWidth: "100%"}} /></div>
        })
        return slides;
    }

    let slidesToShow;
    switch (renderSlides().length) {
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


    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "100px",
        slidesToShow: slidesToShow,
        speed: 500,
        focusOnSelect: true,
        border: "none"
    };
    return (
        <div className="slickslider">
            <Slider {...settings}>
                {renderSlides()}
            </Slider>
        </div>
    );
}

export default SlickSlider;