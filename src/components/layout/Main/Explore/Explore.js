import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "./Explore.scss";
import Footer from "../Footer";
import NhacCuaTui from "nhaccuatui-api-full";
import { DataContext } from "../../../../context/DataContext";
import { ExploreJson } from "../storeMain";
import Loading from "../../Loading";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import MoreVertIcon from "@material-ui/icons/MoreVert";
const Explore = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState();
  const { updateAudio } = useContext(DataContext);
  const [category, setCategory] = useState("moi-hot");
  const [key, setKey] = useState();
  const [keyNormal, setKeyNormal] = useState();
  const handleCategory = (name) => {
    setCategory(name);
    switch (name) {
      case "moi-hot":
        setKey("moi-hot");
        break;
      case "viet-nam":
        setKey("nhac-tre");
        setKeyNormal("Nhạc Trẻ");
        break;
      case "au-my":
        setKey("pop");
        setKeyNormal("Pop");
        break;
      case "chau-a":
        setKey("han-quoc");
        setKeyNormal("Nhạc Hàn");
        break;
      case "khac":
        setKey("thieu-nhi");
        setKeyNormal("Thiếu Nhi");
        break;
      default:
        break;
    }
  };
  const handleKey = (name) => {
    setKeyNormal(name);
    const newKey = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(" ", "-")
      .replace("/", "-");
    setKey(newKey);
    if (name === "Electronica/Dance") setKey("dance");
    if (name === "Blues/Jazz") setKey("blue-jazz");
  };
  useEffect(() => {
    NhacCuaTui.explore({
      // or "playlist" or "mv"
      type: "song",
      key: key,
      page: 1,
      pageSize: 36,
    }).then((data) => {
      setList(data.data);
      setLoading(false);
    });
    // "3eXsZDj1KmpA"
  }, [key]);

  return (
    <div className="main">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="location">
            <h5
              className={category === "moi-hot" ? "typeActive" : ""}
              onClick={() => handleCategory("moi-hot")}
            >
              Mới & Hot
            </h5>
            <h5
              className={category === "viet-nam" ? "typeActive" : ""}
              onClick={() => handleCategory("viet-nam")}
            >
              Việt Nam
            </h5>
            <h5
              className={category === "au-my" ? "typeActive" : ""}
              onClick={() => handleCategory("au-my")}
            >
              Âu Mỹ
            </h5>
            <h5
              className={category === "chau-a" ? "typeActive" : ""}
              onClick={() => handleCategory("chau-a")}
            >
              Châu Á
            </h5>
            <h5
              className={category === "khac" ? "typeActive" : ""}
              onClick={() => handleCategory("khac")}
            >
              Khác
            </h5>
          </div>
          <div className="country">
            {ExploreJson.map((explore, index) =>
              explore.title === category ? (
                <div className="explore-item" key={index}>
                  {explore.categories.map((item) => (
                    <p
                      className={item.name === keyNormal ? "typeActive" : ""}
                      onClick={() => handleKey(item.name)}
                    >
                      {item.name}
                    </p>
                  ))}
                </div>
              ) : (
                ""
              )
            )}
          </div>
          <Row className="category-child">
            {list.map((item, index) => (
              <Col
                className="category-item"
                key={item.key}
                xs={6}
                md={4}
                lg={3}
              >
                <div className="item-animation">
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt="" />
                  ) : (
                    <img
                      style={{ maxHeight: 300 }}
                      src="https://stc-id.nixcdn.com/v12/static/media/default_song_no_cover.a876da66.png"
                      alt=""
                    />
                  )}
                  <div className="item-animation__mask">
                    <MoreVertIcon />
                    <PlayCircleFilledIcon
                      className="item-animation__mask-play"
                      onClick={() => updateAudio(null, list, index)}
                    />
                  </div>
                </div>
                <div className="category-item-title">
                  <h6>{item.title}</h6>
                  {item?.artists.map((item, index) =>
                    index < item?.artists?.length - 1 ? (
                      <span key={index}>{item.name},</span>
                    ) : (
                      <span key={index}>{item.name}</span>
                    )
                  )}
                </div>
              </Col>
            ))}
          </Row>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Explore;
