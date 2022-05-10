import { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import SearchIcon from "@material-ui/icons/Search";
import NhacCuaTui from "nhaccuatui-api-full";
import "./Search.scss";
import Footer from "../Footer";
import Loading from "../../Loading";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";

const Search = () => {
  const [historySearch, setHistorySearch] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [searchReturn, setSearchReturn] = useState();
  const [typeSearch, setTypeSearch] = useState("song");
  const [topKey, setTopKey] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    NhacCuaTui.searchByKeyword(valueSearch).then((data) => {
      setSearchReturn(data.search);
      setLoading(false);
    });
  }, [valueSearch]);
  useEffect(() => {
    NhacCuaTui.getTopKeyword(valueSearch).then((data) =>
      setTopKey(data.topkeyword)
    );
  }, []);
  useEffect(() => {
    if (localStorage.getItem("title")) {
      setHistorySearch(JSON.parse(localStorage.getItem("title")));
    }
  }, []);
  const saveLocalStorage = (name) => {
    if (historySearch.length >= 5) {
      const newList = historySearch.slice(0, 4);
      newList.unshift(name);
      setHistorySearch(newList);
      localStorage.setItem("title", JSON.stringify(newList));
    } else {
      const newList = historySearch;
      newList.unshift(name);
      setHistorySearch(newList);
      localStorage.setItem("title", JSON.stringify(newList));
    }
  };
  const updateReSearch = (name) => {
    setValueSearch(name);

    saveLocalStorage(name);
  };
  const removeAllSearch = () => {
    localStorage.removeItem("title");
    setHistorySearch([]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    saveLocalStorage(valueSearch);
  };

  return (
    <div className="main">
      <div className="main-search">
        <Form className="input-search" onSubmit={handleSubmit}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Tìm kiếm"
            onChange={(e) => setValueSearch(e.target.value)}
            value={valueSearch}
          />
        </Form>
        {valueSearch ? (
          <div className="search-return">
            <div className="list-search">
              <h5
                className={typeSearch === "song" ? "typeActive" : ""}
                onClick={() => setTypeSearch("song")}
              >
                Bài hát
              </h5>
              <h5
                className={typeSearch === "playlist" ? "typeActive" : ""}
                onClick={() => setTypeSearch("playlist")}
              >
                Playlist
              </h5>
              <h5
                className={typeSearch === "video" ? "typeActive" : ""}
                onClick={() => setTypeSearch("video")}
              >
                Video
              </h5>
            </div>
            {loading ? (
              <Loading />
            ) : (
              <Row className="list-search-return">
                {typeSearch === "song"
                  ? searchReturn?.song?.song.map((item, index) => (
                      <Col xs={6} md={4} lg={3} className="search-item">
                        <div key={index} className="item-animation">
                          {item?.thumbnail ? (
                            <img src={item.thumbnail} alt="" />
                          ) : (
                            <img
                              src="https://stc-id.nixcdn.com/v12/static/media/default_song_no_cover.a876da66.png"
                              alt=""
                            />
                          )}
                          <div className="item-animation__mask">
                            <MoreVertIcon />
                            <Link to={"/song/" + item.key}>
                              <PlayCircleFilledIcon className="item-animation__mask-play" />
                            </Link>
                          </div>
                        </div>

                        <Link to="/">
                          <h6>{item.title}</h6>
                        </Link>

                        <p style={{ color: "white" }}>
                          {item.artists.map((child, index) => (
                            <span>{child.name}</span>
                          ))}
                        </p>
                      </Col>
                    ))
                  : typeSearch === "playlist"
                  ? searchReturn?.playlist?.playlist.map((item, index) => (
                      <Col xs={6} md={4} lg={3} className="search-item">
                        <div key={index} className="item-animation">
                          {item?.thumbnail ? (
                            <img src={item.thumbnail} alt="" />
                          ) : (
                            <img
                             
                              src="https://stc-id.nixcdn.com/v12/static/media/default_song_no_cover.a876da66.png"
                              alt=""
                            />
                          )}
                          <div className="item-animation__mask">
                            <MoreVertIcon />
                            <Link to={"/playlist/" + item.key}>
                              <PlayCircleFilledIcon className="item-animation__mask-play" />
                            </Link>
                          </div>
                        </div>

                        <Link to="/">
                          <h6>{item.title}</h6>
                        </Link>

                        <p style={{ color: "white" }}>
                          {item.artists.map((child, index) => (
                            <span>{child.name}</span>
                          ))}
                        </p>
                      </Col>
                    ))
                  : searchReturn?.video?.video.map((item, index) => (
                      <Col xs={6} md={4} lg={3} className="search-item">
                        <div key={index} className="item-animation">
                          {item?.thumbnail ? (
                            <img src={item.thumbnail} alt="" />
                          ) : (
                            <img
                             
                              src="https://stc-id.nixcdn.com/v12/static/media/default_song_no_cover.a876da66.png"
                              alt=""
                            />
                          )}
                          <div className="item-animation__mask">
                            <MoreVertIcon />
                            <Link to={"/video/" + item.key}>
                              <PlayCircleFilledIcon className="item-animation__mask-play" />
                            </Link>
                          </div>
                        </div>

                        <Link to="/">
                          <h6>{item.title}</h6>
                        </Link>

                        <p style={{ color: "white" }}>
                          {item.artists.map((child, index) => (
                            <span>{child.name}</span>
                          ))}
                        </p>
                      </Col>
                    ))}
              </Row>
            )}
          </div>
        ) : (
          <>
            {" "}
            <div className="hot-search">
              <h2>Top Từ Khóa</h2>
              <div className="list-hot-search">
                {topKey?.map((item, index) => (
                  <button
                    key={index}
                    className="hot-search-button"
                    onClick={() => updateReSearch(item.name)}
                  >
                    <span>#{index + 1}</span>
                    <h6>{item.name}</h6>
                  </button>
                ))}
              </div>
            </div>
            <div className="search-history">
              <div className="banner-search-history">
                <h2>Lịch Sử Tìm Kiếm</h2>
                <span className="remove-AllSearch" onClick={removeAllSearch}>
                  Xóa tất cả
                </span>
              </div>
              <div className="search-history-list">
                {historySearch?.map((item, index) =>
                  index < 5 ? (
                    <button key={index} onClick={() => updateReSearch(item)}>
                      <span>{item}</span>
                    </button>
                  ) : (
                    <></>
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Search;
