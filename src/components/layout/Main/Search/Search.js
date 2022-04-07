import { useState, useEffect, useContext } from "react";
import { Form } from "react-bootstrap";
import Footer from "../Footer";
import { HotSearch } from "../storeMain";
import SearchIcon from "@material-ui/icons/Search";
import "./Search.scss";
import { DataContext } from "../../../../context/DataContext";
import { CallSongContext } from "../../../../context/CallSongContext";
const Search = () => {
  const [historySearch, setHistorySearch] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [arrReturn, setArrReturn] = useState([]);
  const { updateAudio } = useContext(DataContext);
  const { AllSongs } = useContext(CallSongContext);
  useEffect(() => {
    if (localStorage.getItem("title")) {
      setHistorySearch(JSON.parse(localStorage.getItem("title")));
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const result = valueSearch
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const newArr = AllSongs.filter((item) => {
      return (
        item.title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(result) ||
        item.creator
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(result)
      );
    });
    setArrReturn(newArr);
    if (historySearch.length >= 5) {
      const newList = setHistorySearch(historySearch.slice(0, 4));

      newList.unshift(valueSearch);
      localStorage.removeItem("title");
      localStorage.setItem("title", JSON.stringify(historySearch));
    }
  };
  const updateReSearch = (item) => {
    setValueSearch(item);
    const result = item
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const newArr = AllSongs.filter((item) => {
      return (
        item.title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(result) ||
        item.creator
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(result)
      );
    });
    setArrReturn(newArr);

    if (historySearch.length >= 5) {
      const newList = historySearch.slice(0, 4);
      newList.unshift(item);

      localStorage.removeItem("title");

      localStorage.setItem("title", JSON.stringify(historySearch));
    }
  };
  const removeAllSearch = () => {
    localStorage.removeItem("title");
    setHistorySearch([]);
  };
  return (
    <div className="main">
      <div className="main-search">
        <Form onSubmit={handleSearch} className="input-search">
          <SearchIcon />
          <input
            type="text"
            placeholder="Tìm kiếm"
            onChange={(e) => setValueSearch(e.target.value)}
            value={valueSearch}
          />
        </Form>
        <div className="hot-search">
          <h2>Top Từ Khóa</h2>
          <div className="list-hot-search">
            {HotSearch.map((item, index) => (
              <button
                key={index}
                className="hot-search-button"
                onClick={() => updateReSearch(item.title)}
              >
                <span>#{index + 1}</span>
                <h6>{item.title}</h6>
              </button>
            ))}
          </div>
        </div>
        <div className="search-return">
          <h2>Bài hát</h2>
          <div className="list-search-return">
            {arrReturn?.map((item, index) => (
              <div
                key={index}
                onClick={() => updateAudio(item)}
                className="item-return"
              >
                <img src={item.avatar} alt="" />
                <div className="infor-item-search">
                  <h6>{item.title}</h6>
                  <p>{item.creator}</p>
                </div>
              </div>
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
      </div>
      <Footer />
    </div>
  );
};

export default Search;
