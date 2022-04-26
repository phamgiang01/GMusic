import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderItem.scss";
import NhacCuaTui from "nhaccuatui-api-full";
import { Link } from "react-router-dom";
import { DataContext } from "../../../../context/DataContext";
import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@material-ui/icons/NavigateNextOutlined";
function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="slick-next pull-right"
      style={{ right: 0 }}
      onClick={onClick}
    >
      <NavigateNextOutlinedIcon />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="slick-prev pull-left" style={{ left: 0 }} onClick={onClick}>
      <NavigateBeforeOutlinedIcon />
    </div>
  );
}

const SliderBanner = () => {
  const { updateAudio } = useContext(DataContext);
  require("./SliderBanner.scss");
  const [list, setList] = useState();
  useEffect(() => {
    NhacCuaTui.getHome().then((data) => setList(data.showcase));
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    centerPadding: "40px",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          centerMode: false,
          centerPadding: "0",
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="slider__fake">
      <Slider {...settings}>
        {list?.map((step, index) => (
          <div key={index}>
            <img src={step.thumbnail} alt="" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderBanner;
