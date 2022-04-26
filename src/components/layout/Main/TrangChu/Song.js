import React, { useContext, useEffect, useState } from "react";
import NhacCuaaTui from "nhaccuatui-api-full";
import "./Song.scss";
import { Row, Col } from "react-bootstrap";
import { DataContext } from "../../../../context/DataContext";
const Song = () => {
  const [list, setList] = useState();
  const { updateAudio } = useContext(DataContext);

  useEffect(() => {
    NhacCuaaTui.getHome().then((data) => setList(data.song));
  }, []);
  return (
    <div className="song-home">
      <h2>Bài hát</h2>

      <div className="song-home-list">
        {list?.map((item, index) => (
          <Col xs={12} sm={6} className="song" key={index}>
            <div
              className="song-non"
              onClick={() => updateAudio(null, list, index)}
            >
              <img src={item.thumbnail} alt="" />
              <div className="song-non-infor">
                <h6>{item.title}</h6>
                <p>
                  {item.artists?.map((child, index) => (
                    <span>{child.name}</span>
                  ))}
                </p>
              </div>
            </div>
          </Col>
        ))}
      </div>
    </div>
  );
};

export default Song;
