import React, { useEffect, useState, useContext } from "react";
import "./NewRelease.scss";
import { Link } from "react-router-dom";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { DataContext } from "../../../../context/DataContext";
import NhacCuaTui from "nhaccuatui-api-full";
const NewRelease = () => {
  const [list, setList] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { updateAudio } = useContext(DataContext);
  useEffect(() => {
    NhacCuaTui.getHome().then((data) => setList(data.newRelease.song));
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex === 5) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);
  return (
    <div className="new__release">
      <h2>Mới phát hành</h2>
      <div className="produce__song">
        {list ? (
          <>
            <Link to="/">
              <img
                src={list[currentIndex].thumbnail}
                alt=""
                onClick={() =>
                  updateAudio(null, list, currentIndex)}
              />
            </Link>
            <div className="infor__song">
              <h6>{list[currentIndex].title}</h6>
              <p>
                {list[currentIndex].artists.map((item, index) =>
                  item.imageUrl ? (
                    <img src={item.imageUrl} alt="" key={index} />
                  ) : (
                    ""
                  )
                )}
                {list[currentIndex].artists.map((item, index) =>
                  index < list[currentIndex].artists.length - 1 ? (
                    <span key={index}>{item.name},</span>
                  ) : (
                    <span key={index}>{item.name}</span>
                  )
                )}
              </p>
              <DateRangeIcon />
              <span>
                Ngày phát hành :{" "}
                {new Date(list[currentIndex].dateCreate).toLocaleDateString()}
              </span>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="list__song-release">
        {list?.map((child, index) => (
          <div className="song-release" key={index}>
            <Link to="/">
              <img
                src={child.thumbnail}
                alt=""
                onClick={() => updateAudio(null, list, index)}
              />
            </Link>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewRelease;
