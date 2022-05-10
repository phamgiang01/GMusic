import React, { useEffect, useState } from "react";
import NhacCuatui from "nhaccuatui-api-full";
import { Link, useParams } from "react-router-dom";
import "./Video.scss";
import Footer from "../Footer";
import Loading from "../../Loading";
const Video = () => {
  const valueKey = useParams();
  const [list, setList] = useState();
  const [video, setVideo] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    NhacCuatui.getHome().then((data) => setList(data.video));
  }, []);
  useEffect(() => {
    NhacCuatui.getVideoDetail(valueKey.id).then((data) => {
      setVideo(data.video);
      NhacCuatui.getHome().then((data) => {
        setList(data.video);
        setLoading(false);
      });
    });
  }, [valueKey]);

  return (
    <div className="main">
      {loading ? (
        <Loading />
      ) : (
        <div className="videoPage">
          <div className="detail-video">
            <video src={video?.streamUrls[0].streamUrl} controls></video>
            <div className="infor-video">
              <h3>{video.title}</h3>
              <p>
                {video.artists.map((item, index) =>
                  item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} key={index} />
                  ) : (
                    ""
                  )
                )}
                {video.artists.map((item, index) =>
                  index < video.artists.length - 1 ? (
                    <span key={index}>{item.name},</span>
                  ) : (
                    <span key={index}>{item.name}</span>
                  )
                )}
              </p>
            </div>
          </div>

          <div className="list-video">
            <h3>Nghe tiếp</h3>
            <div className="list-video-item">
              {list.map((video, index) => (
                <Link to={"/video/" + video.key}>
                  <div className="video-item">
                    <img src={video.thumbnail} alt="" />
                    <div className="video-item-text">
                      <p>{video.title}</p>
                      {video.artists.map((child, index) => (
                        <span key={index}>{child.name}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Video;
