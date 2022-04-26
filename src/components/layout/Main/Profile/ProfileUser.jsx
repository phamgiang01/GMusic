import React, { useContext, useState } from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./Profile.scss";
import PlayList from "./PlayList";
import { AuthContext } from "../../../../context/AuthContext";
import DetailPlaylist from "./DetailsPlaylist";

const ProfileUser = () => {
  const [typeProfile, setTypeProfile] = useState("playlist");
  const {
    authState: { user },
    logoutUser,
  } = useContext(AuthContext);

  return (
    <div className="main">
      <div className="profileUser">
        <div className="backgroundUser">
          <div className="imgUser">
            <img src={user?.image} alt="" />
            <h3>{user?.username}</h3>
          </div>
          <div className="extendUser">
            <ExitToAppIcon />
            <span onClick={logoutUser}>Đăng xuất</span>
          </div>
        </div>
        <div className="listForUser">
          <ul>
            <li
              onClick={(e) => setTypeProfile("playlist")}
              className={typeProfile === "playlist" ? "active" : ""}
            >
              Playlist
            </li>
            <li
              onClick={(e) => setTypeProfile("lovesong")}
              className={typeProfile === "lovesong" ? "active" : ""}
            >
              Bài hát yêu thích
            </li>
            <li
              onClick={(e) => setTypeProfile("profile")}
              className={typeProfile === "profile" ? "active" : ""}
            >
              Cá nhân
            </li>
          </ul>
        </div>
        {typeProfile === "playlist" ? (
          <PlayList />
        ) : typeProfile === "lovesong" ? (
          <DetailPlaylist />
        ) : null}
      </div>
    </div>
  );
};

export default ProfileUser;
