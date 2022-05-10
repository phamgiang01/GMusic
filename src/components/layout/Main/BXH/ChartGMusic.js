import React, { useContext, useEffect, useState } from "react";
import NhacCuaTui from "nhaccuatui-api-full";
import "./ChartGMusic.scss";
import NavigateBeforeOutlinedIcon from "@material-ui/icons/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@material-ui/icons/NavigateNextOutlined";
import { DataContext } from "../../../../context/DataContext";
import Loading from "../../Loading";
import { Row } from "react-bootstrap";
import Footer from "../Footer";
import { Link, useParams } from "react-router-dom";
const ChartGMusic = () => {

  const category = useParams().id;
 
  const [loading, setLoading] = useState(true);
  const currentWeek = Math.floor(
    (new Date() - new Date(new Date().getFullYear(), 0, 0)) /
      1000 /
      60 /
      60 /
      24 /
      7
  );
  const [list, setList] = useState();
  const [week, setWeek] = useState(currentWeek);
  const year = new Date().getFullYear();

  const { updateAudio } = useContext(DataContext);
  useEffect(() => {
    NhacCuaTui.getChart({
      category,
      time: {
        week: week,
        year: year,
      },
    }).then((data) => {
      setList(data.ranking);
      setLoading(false);
    });
  }, [category,week]);
  return (
    <div className="main">
      <div className="Chart-Category">
        <h2>BXH Tuần</h2>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="Chart-weekly">
          <div className="list-category">
            <Link to="/BXH-GMusic/nhac-viet">
              <p className={category === "nhac-viet" ? "typeActive" : ""}>
                Việt Nam
              </p>
            </Link>
            <Link to="/BXH-GMusic/au-my">
              <p className={category === "au-my" ? "typeActive" : ""}>Âu Mỹ </p>
            </Link>
            <Link to="/BXH-GMusic/nhac-han">
              <p className={category === "nhac-han" ? "typeActive" : ""}>
                Hàn Quốc
              </p>
            </Link>
          </div>
          <div className="weekly-item">
            <div className="layout-time">
              <NavigateBeforeOutlinedIcon
                onClick={() => {
                  if (week > 1) setWeek(week - 1);
                }}
              />
              <h2>Tuần {week} </h2>
              <NavigateNextOutlinedIcon
                onClick={() => {
                  if (week < currentWeek) setWeek(week + 1);
                }}
              />
            </div>
            <div className="top1-weekly">
              <img
                src={list.song[0].thumbnail}
                alt=""
                onClick={(e) => updateAudio(null, list.song, 0)}
              />
              <div className="infor-top">
                <div className="infor-top-title">
                  <span>Bài hát :</span>
                  <h6>{list.song[0].title}</h6>
                </div>
                <div className="infor-top-singer">
                  {list.song[0].artists.map((child, index) => (
                    <img src={child.imageUrl} alt="" key={index} />
                  ))}
                  <p>
                    {list.song[0].artists.map((child, index) => (
                      <span key={index}>{child.name}</span>
                    ))}
                  </p>
                </div>
                <div className="infor-top-status">
                  <div className="status-last">
                    <span>{list.song[0].oldPosition}</span>
                    <p>Tuần trước</p>
                  </div>
                  <div className="status-max">
                    <span>{list.song[0].highestPosition}</span>
                    <p>Cao nhất</p>
                  </div>
                  <div className="status-range">
                    <span>{list.song[0].totalWeekInRanked}</span>
                    <p>Tuần trong BXH</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="run-all">
              <p  onClick={(e) => updateAudio(null, list.song, 0)} style={{cursor:"pointer"}} >Phát tất cả</p>
            </div>
            <div className="list-weekly">
              {list.song.map((item, index) => (
                <Row className="list-weekly-item" key={index}>
                  <span>{index + 1}</span>
                  <div
                    className="infor-item"
                    onClick={(e) => updateAudio(null, list.song, index)}
                  >
                    <img src={item.thumbnail} alt="" />
                    <div className="infor-item-title">
                      <h6>{item.title}</h6>
                      <p>
                        {item.artists.map((child) => (
                          <span>{child.name}</span>
                        ))}
                      </p>
                    </div>
                  </div>
                </Row>
              ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ChartGMusic;
