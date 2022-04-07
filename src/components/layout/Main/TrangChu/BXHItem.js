import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../../../context/DataContext";
import {Col} from 'react-bootstrap'
const BXHItem = (props) => {
  const item =props.data
  const title= props.title
  const { updateAudio } = useContext(DataContext);
  const [hover, setHover] = useState(false);
  const [hover1, setHover1] = useState(false);
  const [text, setText] = useState(0);
  const handleImgHover = () => {
    setHover(!hover);
    text !== 1 ? setText(1) : setText(0);
  };
  const handleImgHover1 = () => {
    setHover1(!hover1);
    text !== 2 ? setText(2) : setText(0);
  };
  const hoverActive = hover ? "hoverActive" : "";
  const hoverActive1 = hover1 ? "hoverActive1" : "";

  return (
    <Col className="top-area" xs={12} md={6} xl={4}>
      <div className="infor-top">
        
          <h3>{title}</h3>
        <div className="top-background">
          <div className="top-0">
            <div  onClick={() => updateAudio(null, item?.song, 0)}>
              <img src={item?.song[0].thumbnail} alt="" />
            </div>
          </div>
          <div className={"top-1 " + hoverActive}>
            <div  onClick={() => updateAudio(null, item?.song, 1)}>
              <img
                src={item?.song[1].thumbnail}
                alt=""
                onMouseEnter={handleImgHover}
                onMouseLeave={handleImgHover}
              />
            </div>
          </div>
          <div className={"top-2 " + hoverActive1}>
            <div  onClick={() => updateAudio(null, item?.song, 2)}>
              <img
                src={item?.song[2].thumbnail}
                alt=""
                onMouseEnter={handleImgHover1}
                onMouseLeave={handleImgHover1}
              />
            </div>
          </div>
        </div>
        
      </div>
      <div className="infor-text">
          <div >
            <h6>{item?.song[text].title}</h6>
          </div>
          <p style={{ color: "white" }}>{item?.song[text]?.artists.map((child)=><>{child.name}</>)}</p>
        </div>
        <Link
          to="/"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <button
            style={{
              backgroundColor: `rgba(99, 98, 98, .5)`,
              outline: `none`,
              border: `1px solid rgba(99, 98, 98, .5)`,
              padding: `5px 20px`,
              marginTop: 5,
              color: `rgba(244,246,248,0.8)`,
              borderRadius: 4,
              fontWeigh: 100,
            }}
          >
            <span>Xem tất cả </span>
          </button>
        </Link>
    </Col>
  );
};

export default BXHItem;
