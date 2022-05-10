import React, { useEffect, useState } from "react";
import SliderBanner from "./SliderBanner";
import SliderItem from "./SliderItem";
import NewRelease from "./NewRelease";
import ChartTopMusic from "./ChartTopMusic";
import BXHSong from "./BXHSong";
import HotVideo from "./HotVideo";
import "./index.scss";
import Footer from "../Footer";
import NhacCuaTui from "nhaccuatui-api-full";
import Song from "./Song";
import Loading from "../../Loading";
const TrangChu = () => {
  const [list, setList] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    NhacCuaTui.getHome().then((data) => {
      setList(data.topicEvent);
      setLoading(false);
    });
  }, []);
  return (
    <div className="main">
      <SliderBanner />
      {loading ? <Loading /> : list.map((item,index) => <SliderItem list={item} key={index} />)}
      <NewRelease />
      <ChartTopMusic />
      <BXHSong />
      <HotVideo />
      <Song />
      <Footer />
    </div>
  );
};

export default TrangChu;
