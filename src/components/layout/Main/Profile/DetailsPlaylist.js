import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { DataContext } from "../../../../context/DataContext";
import { ProfileContext } from "../../../../context/ProfileContext";
import { Row } from "react-bootstrap";
import "./DetailPlaylist.scss";
const DetailPlaylist = () => {
  const [optionPlaylist, setOptionPlaylist] = useState(false);
  const [showOption, setShowOption] = useState();
  const { updateAudio } = useContext(DataContext);
  const navigate = useNavigate();
  const {
    profileState: { list },
    getPlaylist,
    getListSongLove,
    removePlaylist,
    removeFromPlaylist,
    removeSongLove,
  } = useContext(ProfileContext);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getPlaylist(id);
    } else {
      getListSongLove();
    }
  }, [list]);
  const handlePlaylist = () => {
    setOptionPlaylist(!optionPlaylist);
  };
  const handleSong = (index) => {
    setShowOption((prevShowOption) => (prevShowOption !== index ? index : ""));
  };
  const deletePlaylist = () => {
    removePlaylist(id);
    navigate("/profile");
  };
  const deleteSong = (item) => {
    const newItem = {
      name: id,
      song: item,
    };
    id ? removeFromPlaylist(newItem) : removeSongLove(item);

    setShowOption("");
  };
  return (
    <div className={id ? "main" : null}>
      {id ? (
        <>
          <div className="title-Playlist">
            <MoreVertIcon onClick={handlePlaylist} />
            {optionPlaylist ? <p onClick={deletePlaylist}>Xóa playlist</p> : ""}
            <img
              src="https://image.shutterstock.com/image-vector/playlist-handdrawn-concept-on-beige-260nw-1657857751.jpg"
              className="img"
              style={{ width: 200, height: 200, background: "white" }}
              alt=""
            />
            <h2>{id}</h2>
          </div>
        </>
      ) : (
        ""
      )}
      <Row className="list-song">
        {list?.map((item, index) => (
          <div key={index} className="song-item">
            {(
              <img src={item.avatar} alt="" onClick={() => updateAudio(item)} />
            ) && (
              <img
                src={item.thumbnail}
                alt=""
                onClick={() => updateAudio(item)}
              />
            )}
            <div className="song-title">
              <h6>{item?.title}</h6>
              {/* { */}
              <p>{item?.creator}</p>
              {/* || */}
              {/* <p>
                  {item?.artists?.map((child, index) =>
                    index < list?.artists?.length - 1 ? (
                      <span key={index}>{child.name},</span>
                    ) : (
                      <span key={index}>{child.name}</span>
                    )
                  )}
                </p> */}
              {/* } */}
            </div>
            <MoreVertIcon onClick={() => handleSong(index)} />
            {showOption === index ? (
              <span onClick={() => deleteSong(item)}>Xóa bài hát</span>
            ) : (
              ""
            )}
          </div>
        ))}
      </Row>
    </div>
  );
};

export default DetailPlaylist;
