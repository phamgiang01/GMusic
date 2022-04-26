import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HotVideo.scss";
import NhacCuaTui from "nhaccuatui-api-full";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Col, Row } from "react-bootstrap";
const HotVideo = () => {
  const [list, setList] = useState();
  useEffect(() => {
    NhacCuaTui.getHome().then((data) => setList(data.video));
  }, []);

  return (
    <div className="hotVideo">
      <h2>Hot Video</h2>
      <Row className="video__list ">
        {list?.map((video, index) =>
          index < 2 ? (
            <Col key={index} xs={12} sm={6} className="video__list-item">
              <div className="video">
                <Link to={"/video/" + video.key}>
                  <div className="video__url">
                    <img src={video.thumbnail} alt="" />

                    <div className="item__mask">
                      <MoreVertIcon
                        style={{
                          position: "absolute",
                          top: 5,
                          right: 0,
                          zIndex: 3,
                          color: "white",
                        }}
                      />
                      <PlayCircleFilledIcon
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          color: "white",
                          transform: "translate(-50%,-50%)",
                          zIndex: 3,
                          height: 50,
                          width: 50,
                        }}
                      />
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
                  {video.artists?.map((child, index) => (
                    <span>{child.name}</span>
                  ))}
                </p>
              </div>
            </Col>
          ) : (
            <></>
          )
        )}
      </Row>
      <Row className="video__list">
        {list?.map((video, index) =>
          index > 4 ? (
            <Col key={index} xs={12} sm={6} md={3} className="video__list-item">
              <div className="video">
                <Link to={"/video/" + video.key}>
                  <div className="video__url">
                    <img src={video.thumbnail} alt="" />
                    <div className="item__mask">
                      <MoreVertIcon
                        style={{
                          position: "absolute",
                          top: 5,
                          right: 0,
                          zIndex: 3,
                          color: "white",
                        }}
                      />
                      <PlayCircleFilledIcon
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          color: "white",
                          transform: "translate(-50%,-50%)",
                          zIndex: 3,
                          height: 50,
                          width: 50,
                        }}
                      />
                    </div>
                    <span>{video.time}</span>
                  </div>
                </Link>
              </div>
              <div className="infor__video">
                <Link to="/">
                  <h6 style={{ fontSize: 15 }}>{video.title}</h6>
                </Link>
                <p style={{ color: "white" }}>
                  {video.artists?.map((child, index) => (
                    <span key={index}>{child.name}</span>
                  ))}
                </p>
              </div>
            </Col>
          ) : (
            <></>
          )
        )}
      </Row>
    </div>
  );
};

export default HotVideo;
