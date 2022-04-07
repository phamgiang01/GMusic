import React, { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import HeadsetOutlinedIcon from "@material-ui/icons/HeadsetOutlined";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LibraryMusicOutlinedIcon from "@material-ui/icons/LibraryMusicOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import "./Menu.scss";
import { FormContext } from "../../../context/DataContext";

import Login from "../../Auth/Login";
import ForgotPassword from "../../Auth/ForgotPassword";
import Register from "../../Auth/Register";
import { AuthContext } from "../../../context/AuthContext";
import { LOCAL_STORAGE_USER_ID } from "../../../context/constant";
const Menu = () => {
  const {
    authState: { user },
    logoutUser,
  } = useContext(AuthContext);
  const {
    formState: { showForm },
    updateForm,
  } = useContext(FormContext);

  const [showSetting, setShowSetting] = useState(false);
  const [mainWidth, setMainWidth] = useState(window.innerWidth);
  const [showExpand, setShowExpand] = useState(false);
  const handleLogout = () => {
    logoutUser();
    setShowSetting(!showSetting);
  };
  let isUnmounted = useRef(true);
  useEffect(() => {
    

    function handleResize() {
      setMainWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    mainWidth > 1250 ? setShowExpand(true) : setShowExpand(false);
    return () => {
      isUnmounted = false;
    }
  }, [mainWidth]);
  return (
    <div
      className={mainWidth < 992 && !showExpand ? "menu menu-tablet" : "menu"}
    >
      <Link to="/" className="menu-header">
        <img
          src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/music-icon-mohammed-jabir-ap.jpg"
          alt=""
        />
        <h6>GMusic</h6>
      </Link>
      <div className="menu-auth">
        {user ? (
          <div className="menu-auth-more">
            <AccountCircleIcon />
            <h6 style={{ margin : "5px 0 0 10px" }}>{user.username}</h6>
            {user ? (
              <MoreVertOutlinedIcon
                onClick={(e) => setShowSetting(!showSetting)}
                style={{ right: 0, position: "absolute" }}
                className="moreForLogout"
              />
            ) : (
              ""
            )}
            {user && showSetting ? (
              <div onClick={handleLogout} className="option-user">
                <ExitToAppIcon />
                <span>Đăng xuất</span>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="menu-auth-more">
            <span onClick={() => updateForm("Login")}>Đăng nhập </span>
            <span>|</span>
            <span onClick={() => updateForm("Register")}>Đăng kí </span>
          </div>
        )}
        {showForm === "Login" ? (
          <Login />
        ) : showForm === "Register" ? (
          <Register />
        ) : showForm === "forgotpassword" ? (
          <ForgotPassword />
        ) : (
          ""
        )}
      </div>
      <ul>
        {user ? (
          <Link to="/profile">
            <LibraryMusicOutlinedIcon />
            <h6> Cá nhân </h6>
          </Link>
        ) : (
          ""
        )}
        <Link to="/">
          <HomeOutlinedIcon />
          <h6> Trang chủ</h6>
        </Link>
        <Link to="/tim-kiem">
          <SearchIcon />
          <h6> Tìm kiếm</h6>
        </Link>
        <Link to="/kham_pha ">
          <ExploreOutlinedIcon />
          <h6> Khám phá</h6>
        </Link>
        <Link to="/">
          <EqualizerIcon />
          <h6> BXH GMUSIC</h6>
        </Link>
      </ul>
      {mainWidth < 992 && showExpand ? (
        <ArrowBackIosOutlinedIcon
          className="expand-menu"
          onClick={(e) => setShowExpand(!showExpand)}
        />
      ) : mainWidth < 992 && !showExpand ? (
        <ArrowForwardIosOutlinedIcon
          className="expand-menu"
          onClick={(e) => setShowExpand(!showExpand)}
        />
      ) : (
        ""
      )}
    </div>
  );
};
export default Menu;
