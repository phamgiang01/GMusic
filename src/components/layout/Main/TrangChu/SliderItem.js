import React from "react";
import Slider from "react-slick";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        position: "absolute",
        right: 0,
        top: "40%",
        zIndex: 9,
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  const divStyle = { position: "absolute", top: "40%", left: 0, zIndex: 9 };
  return <div className={className} style={divStyle} onClick={onClick} />;
}

const SliderItem = (props) => {
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1560,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
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
      <h2> {props.title} </h2>
      <Slider {...settings}>
        {props.listItem.map((item,index) => (
          <header  key={index}>
          <nav className="item">
            <Link to="/">
              <img src={item.imgPath} alt="" />
              <div className="item__mask">
                <MoreVertIcon
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 0,
                    zIndex: 3,
                    color: "#000",
                  }}
                />
                <PlayCircleOutlineIcon className="item__mask-play" />
              </div>
            </Link>
            </nav>
            <Link to="/">
              <h6>{item.title}</h6>
            </Link>
          </header>
          
          
        ))}
      </Slider>
    </div>
  );
};

export default SliderItem;
