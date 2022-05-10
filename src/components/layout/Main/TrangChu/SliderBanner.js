import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderItem.scss";
import NhacCuaTui from "nhaccuatui-api-full";
import { Link } from "react-router-dom";
import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@material-ui/icons/NavigateNextOutlined";
import Loading from "../../Loading";
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
  const [loading, setLoading] = useState(true);
  require("./SliderBanner.scss");
  const [list, setList] = useState();
  useEffect(() => {
    NhacCuaTui.getHome().then((data) => {
      setList(data.showcase);
      setLoading(false);
    });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
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
  const toLink = (url) => {
    //get string after ".com/"
    
    const endIIndex = url.indexOf(".html");
    const newUrl = url.slice(0, endIIndex);
    const indexKey = newUrl.lastIndexOf(".") +1;
    return newUrl.slice(indexKey);
  };
  const checkSongOrPlaylist = (url) => {
    //get string after ".com/" : song or playlist

    const index = url.indexOf(".com") + 5;
    const param = url.slice(index, index + 1);
    if (param === "b") return 1;
    return 0;
  };
  return (
    <div className="slider__fake">
      {loading ? (
        <Loading />
      ) : (
        <Slider {...settings}>
          {list.map((step, index) => (
            <div key={index}>
              {checkSongOrPlaylist(step.url) ? (
                <>
                  <Link to={"/song/" + toLink(step.url)}>
                    <img src={step.thumbnail} alt="" />
                  </Link>
                </>
              ) : (
                <Link to={"/playlist/" + toLink(step.url)}>
                    <img src={step.thumbnail} alt="" />
                  </Link>
              )}
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default SliderBanner;
