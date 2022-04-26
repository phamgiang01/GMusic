import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./ChartTopMusic.scss";
import { Link } from "react-router-dom";
import { DataContext } from "../../../../context/DataContext";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { CallSongContext } from "../../../../context/CallSongContext";
import NhacCuaTui from "nhaccuatui-api-full";

const ChartTopMusic = () => {
  const { updateAudio } = useContext(DataContext);
  const [list, setList] = useState();
  const [mainWidth, setMainWidth] = useState(window.innerWidth);
  const d = new Date();
  const hour = d.getHours();

  useEffect(() => {
    let isUnmounted = false;
    function handleResize() {
      setMainWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      isUnmounted = true;
    };
  }, [mainWidth, hour]);
  useEffect(() => {
    NhacCuaTui.getChart().then((data) => setList(data.ranking));
  }, []);
  return (
    <>
      <h2 style={{ marginLeft: 25 }}>Realtime GMusic</h2>
      <div className="chart__custom">
        {mainWidth > 768 ? (
          <Line
            data={{
              labels: [
                "",
                hour + 2 < 24 ? `${hour + 2} : 00 ` : `${hour + 2 - 24} : 00`,
                hour + 4 < 24 ? `${hour + 4} : 00 ` : `${hour + 4 - 24} : 00`,
                hour + 6 < 24 ? `${hour + 6} : 00 ` : `${hour + 6 - 24} : 00`,
                hour + 8 < 24 ? `${hour + 8} : 00 ` : `${hour + 8 - 24} : 00`,
                hour + 10 < 24
                  ? `${hour + 10} : 00 `
                  : `${hour + 10 - 24} : 00`,
                hour + 12 < 24
                  ? `${hour + 12} : 00 `
                  : `${hour + 12 - 24} : 00`,
                hour + 14 < 24
                  ? `${hour + 14} : 00 `
                  : `${hour + 14 - 24} : 00`,
                hour + 16 < 24
                  ? `${hour + 16} : 00 `
                  : `${hour + 16 - 24} : 00`,
                hour + 18 < 24
                  ? `${hour + 18} : 00 `
                  : `${hour + 18 - 24} : 00`,
                hour + 20 < 24
                  ? `${hour + 20} : 00 `
                  : `${hour + 20 - 24} : 00`,
                hour + 22 < 24
                  ? `${hour + 22} : 00 `
                  : `${hour + 22 - 24} : 00`,
                `${hour} : 00`,
              ],
              datasets: [
                {
                  data: [32, 35, 38, 37, 39, 35, 36, 39, 37, 35, 34, 35, 36],
                  label: list?.song[0].title,
                  borderColor: "#3e95cd",
                  fill: false,
                  borderWidth: 2,
                },
                {
                  data: [27, 27, 28, 30, 29, 28, 28, 26, 28, 27, 29, 28, 30],
                  label: list?.song[1].title,
                  borderColor: "#8e5ea2",
                  fill: false,
                  borderWidth: 2,
                },
                {
                  data: [20, 21, 22, 25, 24, 23, 25, 24, 26, 22, 23, 25, 21],
                  label: list?.song[2].title,
                  borderColor: "#3cba9f",
                  fill: true,
                  borderWidth: 2,
                },
              ],
            }}
            options={{
              title: {
                display: true,
                text: "Realtime GMusic",
              },
              legend: {
                display: true,
                position: "bottom",
              },
            }}
          />
        ) : (
          <Line
            data={{
              labels: [
                "",
                hour + 3 < 24 ? `${hour + 3}` : `${hour + 3 - 24}`,
                hour + 6 < 24 ? `${hour + 6}` : `${hour + 6 - 24}`,
                hour + 9 < 24 ? `${hour + 9}` : `${hour + 9 - 24}`,
                hour + 12 < 24 ? `${hour + 12}` : `${hour + 12 - 24}`,
                hour + 15 < 24 ? `${hour + 15}` : `${hour + 15 - 24}`,
                hour + 18 < 24 ? `${hour + 18}` : `${hour + 18 - 24}`,
                hour + 21 < 24 ? `${hour + 21}` : `${hour + 21 - 24}`,
                `${hour}`,
              ],
              datasets: [
                {
                  data: [40, 38, 38, 37, 39, 43, 43, 42, 41, 39, 38, 39, 38],
                  label: list?.song[0].title,
                  borderColor: "#3e95cd",
                  fill: false,
                  borderWidth: 1,
                },
                {
                  data: [25, 27, 28, 30, 25, 26, 28, 25, 23, 27, 29, 28, 35],
                  label: list?.song[1].title,
                  borderColor: "#8e5ea2",
                  fill: false,
                  borderWidth: 1,
                },
                {
                  data: [17, 16, 19, 20, 22, 23, 21, 18, 19, 22, 23, 25, 21],
                  label: list?.song[2].title,
                  borderColor: "#3cba9f",
                  fill: true,
                  borderWidth: 1,
                  maxWidth: 15,
                },
              ],
            }}
            options={{
              title: {
                display: true,
                text: "Realtime GMusic",
              },
              legend: {
                display: false,
                position: "bottom",
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        )}
        <div className="table">
          {list?.song?.map((child, index) => (
            <div
              onClick={() => updateAudio(null, list?.song, index)}
              key={index}
            >
              {index < 3 ? (
                <Row key={index}>
                  <Col xs={4} sm={3} md={2} className="col-ava">
                    <div className={`index-${index} col-index`}>
                      <span>{index + 1}</span>
                    </div>
                    <img src={child.thumbnail} alt="" />
                  </Col>
                  <Col xs={4} sm={4} md={5} className="col-title">
                    <h6>{child.title}</h6>
                  </Col>
                  <Col xs={4} sm={4} className="col-artists">
                    {child.artists?.map((item) =>
                      item?.artistId !==
                      child.artists[child.artists.length - 1]?.artistId ? (
                        <span key={item.artistId}>{item.name},</span>
                      ) : (
                        <span key={item.artistId}>{item.name}</span>
                      )
                    )}
                  </Col>
                </Row>
              ) : (
                <></>
              )}
            </div>
          ))}
          <Link to="/BXH-GMusic" className="expand-chart">
            <span>Xem thêm</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ChartTopMusic;
