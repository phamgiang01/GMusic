import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HotVideo.scss";
import NhacCuaTui from "nhaccuatui-api-full";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Loading from "../../Loading";
const VideoItem = (props) => {
  const video = props.video;
  return (
    <>
      <div className="video">
        <Link to={"/video/" + video.key}>
          <div className="item-animation">
            <img src={video.thumbnail} alt="" />
            <div className="item-animation__mask">
              <MoreVertIcon />
              <PlayCircleFilledIcon className="item-animation__mask-play" />
            </div>
            <span>{video.time}</span>
          </div>
        </Link>
      </div>
      <div className="infor__video">
        <Link to="/">
          <h6>{video.title}</h6>
        </Link>
        <p style={{ color: "white" }}>
        {video.artists.map((child, index) =>
              index < video.artists.length - 1 ? (
                <span key={index}>{child.name},</span>
              ) : (
                <span key={index}>{child.name}</span>
              )
            )}
        </p>
      </div>
    </>
  );
};
const HotVideo = () => {
  const [list, setList] = useState();
  const [loading, setLoading] = useState(true);
  const [mainWidth, setMainWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setMainWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
  }, [mainWidth]);
  useEffect(() => {
    NhacCuaTui.getHome().then((data) => {
      setList(data.video);
      setLoading(false);
    });
  }, []);

  return (
    <div className="hotVideo">
      <h2>Hot Video</h2>
      {loading ? (
        <Loading />
      ) : mainWidth > 1899 ? (
        <>
          <div className="video__list video__top">
            {list.map((video, index) =>
              index < 3 ? (
                <div key={index} className="video__list-item">
                  <VideoItem video={video} />
                </div>
              ) : (
                <></>
              )
            )}
          </div>
          <div className="video__list video__bottom">
            {list.map((video, index) =>
              index > 2 ? (
                <div key={index} className="video__list-item">
                  <VideoItem video={video} />
                </div>
              ) : (
                <></>
              )
            )}
          </div>
        </>
      ) : (
        <>
          <div className="video__list video__top">
            {list.map((video, index) =>
              index < 2 ? (
                <div key={index} className="video__list-item">
                  <VideoItem video={video} />
                </div>
              ) : (
                <></>
              )
            )}
          </div>
          <div className="video__list video__bottom">
            {list.map((video, index) =>
              index > 4 ? (
                <div key={index} className="video__list-item">
                  <VideoItem video={video} />
                </div>
              ) : (
                <></>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HotVideo;
