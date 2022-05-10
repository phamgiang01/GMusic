import React, { useContext, useEffect, useState } from "react";
import NhacCuaTui from "nhaccuatui-api-full";
import "./Song.scss";
import { Col } from "react-bootstrap";
import { DataContext } from "../../../../context/DataContext";
import Loading from "../../Loading";
const Song = () => {
  const [list, setList] = useState();
  const { updateAudio } = useContext(DataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    NhacCuaTui.getHome().then((data) => {
      setList(data.song);
      setLoading(false);
    });
  }, []);
  return (
    <div className="song-home">
      <h2>Bài hát</h2>

      {loading ? (
        <Loading />
      ) : (
        <div className="song-home-list">
          {list.map((item, index) => (
            <Col xs={12} sm={6} className="song" key={index}>
              <div
                className="song-non"
                onClick={() => updateAudio(null, list, index)}
              >
                <img src={item.thumbnail} alt="" />
                <div className="song-non-infor">
                  <h6>{item.title}</h6>
                  <p>
                  {item.artists.map((child, index) =>
              index < item.artists.length - 1 ? (
                <span key={index}>{child.name},</span>
              ) : (
                <span key={index}>{child.name}</span>
              )
            )}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </div>
      )}
    </div>
  );
};

export default Song;
