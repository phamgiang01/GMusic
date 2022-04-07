

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./SliderItem.scss"
import { tutorialSteps } from "../storeMain";


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style,position :"absolute",right:12,zIndex:2}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style ,position :"absolute",left: 12,zIndex:2}}
      onClick={onClick}
    />
  );
}

const SliderBanner = () => {
  require("./SliderBanner.scss")

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay:false,
    autoplaySpeed :2000 ,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

  };


  return (
    <div className="slider__fake">
     
      <Slider {...settings}>
      {tutorialSteps.map((step) => (
          <div key={step.id}>
            
              <img  src={step.imgPath} alt="" />
             
           </div>
         ))}
      </Slider>
    </div>
  );
}


export default SliderBanner
