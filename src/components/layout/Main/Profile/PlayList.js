import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useStore } from "../../../contexts/store";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import "./Playlist.scss";
import { AuthContext } from "../../../../context/AuthContext";
import { ProfileContext } from "../../../../context/ProfileContext";

const PlayList = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const {
    profileState: { arrList },
    getArrPlaylist,
    createPlaylist,
  } = useContext(ProfileContext);
  const [showForm, setShowForm] = useState(false);
  const [namePlaylist, setNamePlaylist] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getArrPlaylist();
  }, []);
  const createNewPlaylist = () => {
    const item = {
      name: namePlaylist,
      songs: [],
    };
    createPlaylist(item);
  };

  return (
    <div className="playlist">
      
        <div className="createPlaylist" onClick={(e) => setShowForm(true)}>
          <img
            src="https://image.shutterstock.com/image-vector/playlist-handdrawn-concept-on-beige-260nw-1657857751.jpg"
            className="img"
            style={{ width: 200, height: 200, background: "white" , borderRadius:10 }}
            alt=""
          />
          <AddIcon />
        </div>
        {showForm ? (
          <div className="formAdding">
            <div className="form">
              <CloseIcon onClick={(e) => setShowForm(false)} />
              <h3>Tạo playlist mới</h3>
              <input
                type="text"
                onChange={(e) => setNamePlaylist(e.target.value)}
                placeholder="Nhập tên playlist"
              />
              <p onClick={createNewPlaylist}> TẠO MỚI</p>
            </div>
          </div>
        ) : (
          ""
        )}

        {arrList?.map((item, index) => (
          <Link key={index} to={item} style={{margin:" 0 3% 2%" }}>
            <img
              src="https://image.shutterstock.com/image-vector/playlist-handdrawn-concept-on-beige-260nw-1657857751.jpg"
              className="img"
              style={{ width: 200, height: 200, background: "white", borderRadius:10  }}
              alt=""
            />
            <h3 style={{ margin: "15px 0 35px", fontSize: 25 }}>{item}</h3>
          </Link>
        ))}
    </div>
  );
};

export default PlayList;
