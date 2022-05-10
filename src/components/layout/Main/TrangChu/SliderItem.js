import React from "react";
import Slider from "react-slick";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
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

const SliderItem = (props) => {
  const data = props.list;
  var settings = {
    infinite: false,
    speed: 500,

    slidesToShow: 7,
    slidesToScroll: 7,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 2450,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 2080,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1560,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-item">
      <h2> {data.groupName.split("_", 1)} </h2>
      <Slider {...settings}>
        {data.listPlaylist.map((child, index) => (
          <header key={index}>
            <nav className="item-animation">
              <Link to={"/playlist/" + child.key}>
                <img src={child.thumbnail} alt="" />
                <div className="item-animation__mask">
                  <MoreVertIcon />
                  <PlayCircleFilledIcon className="item-animation__mask-play" />
                </div>
              </Link>
            </nav>
            <Link to="/">
              <h6>{child.title}</h6>
            </Link>
          </header>
        ))}
      </Slider>
    </div>
  );
};

export default SliderItem;
