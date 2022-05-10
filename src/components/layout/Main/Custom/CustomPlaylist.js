import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NhacCuatui from "nhaccuatui-api-full";
import Footer from "../Footer";
import { Row, Col } from "react-bootstrap";
import "./CustomPlaylist.scss";
import { DataContext } from "../../../../context/DataContext";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Loading from "../../Loading";
const CustomPlaylist = () => {
  const [loading, setLoading] = useState(true);
  const { updateAudio } = useContext(DataContext);
  const keyPlaylist = useParams();
  const [list, setList] = useState();
  const lengthPage = 25;
  useEffect(() => {
    NhacCuatui.getPlaylistDetail(keyPlaylist.id).then((data) => {
      setList(data.playlist);
      setLoading(false);
    });
  }, []);
  const [indexPage, setIndexPage] = useState(0);
  const totalPage = Math.ceil(list?.songs?.length / lengthPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }
  const indexOfFirst = indexPage * lengthPage;
  const indexOfLast = (indexPage + 1) * lengthPage - 1;

  const listSong = list?.songs.slice(indexOfFirst, indexOfLast);

  return (
    <div className="main">
      {loading ? (
        <Loading />
      ) : (
        <div className="custom__playlist">
          <div className="top__playlist">
            {list.thumbnail ? (
              <img src={list.thumbnail} alt="" />
            ) : (
              <img
                style={{ maxWidth: 300 }}
                src="https://stc-id.nixcdn.com/v12/static/media/default_song_no_cover.a876da66.png"
                alt=""
              />
            )}
            <div className="infor-playlist">
              <div className="name-playlist">
                <span>Playlist : </span>
                <h6>{list.title}</h6>
              </div>
              <div className="artists-playlist">
                {list.artists.map((child, index) =>
                  child?.thumbnail ? (
                    <img src={child.imageUrl} alt="" key={index} />
                  ) : (
                    <img
                      style={{ maxWidth: 50 }}
                      src="https://stc-id.nixcdn.com/v12/static/media/default_song_no_cover.a876da66.png"
                      alt=""
                    />
                  )
                )}
                {list.artists.map((child, index) =>
                  index < list.artists.length - 1 ? (
                    <span key={index}>{child.name},</span>
                  ) : (
                    <span key={index}>{child.name}</span>
                  )
                )}
              </div>
              <div className="date-playlist">
                <span>{new Date(list.dateCreate).toLocaleDateString()}</span>
              </div>

              <span>{list.title}</span>
              <p style={{ marginTop: 30 }}>Tags : </p>
              <div className="list-tag-playlist">
                {list.listTag.map((item, index) => (
                  <span key={index}>{item.name}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="playlist__createdBy">
            {list.uploadBy.avatarUrl ? (
              <img src={list.uploadBy.avatarUrl} alt="" />
            ) : (
              <img
                style={{ maxWidth: 50 }}
                src="https://stc-id.nixcdn.com/v12/static/media/default_song_no_cover.a876da66.png"
                alt=""
              />
            )}
            <div className="infor-userCreated">
              <p>Tạo bởi :</p>
              <h6>{list.uploadBy.fullName}</h6>
            </div>
          </div>
          <h2>Danh sách bài hát</h2>
          <div className="table">
            <Row className="table-header">
              <Col xs={6} style={{ display: "flex", gap: 15 }} className="convertText">
                <p>#</p>
                <p>Tiêu đề</p>
              </Col>
              <Col xs={5} className="convertText">
                <p>Nghệ sĩ</p>
              </Col>
              <Col xs={1}>
                <AccessTimeIcon />
              </Col>
            </Row>
            {listSong.map((item, index) => (
              <Row
                className="table-item"
                key={item.key}
                onClick={(e) => updateAudio(null, list.songs, index)}
              >
                <Col 
                  xs={6}
                  style={{ display: "flex", gap: 15, alignItems: "center" }}
                >
                  <span>{lengthPage * indexPage + index + 1}</span>
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt="" key={index} />
                  ) : (
                    <img
                      style={{ maxWidth: 50 }}
                      src="https://stc-id.nixcdn.com/v12/static/media/default_song_no_cover.a876da66.png"
                      alt=""
                    />
                  )}
                  <p className="table-item-title">{item.title}</p>
                </Col>
                <Col xs={5}   className="convertText">
                  {item.artists.map((child, index) =>
                    index < item.artists.length - 1 ? (
                      <span key={index}>{child.name},</span>
                    ) : (
                      <span key={index}>{child.name}</span>
                    )
                  )}
                </Col>
                <Col   xs={1}>
                  <span>{item.duration}</span>
                </Col>
              </Row>
            ))}
          </div>
          <div className="pagination">
            {pageNumbers.map((number) => (
              <span onClick={(e) => setIndexPage(number - 1)}>{number}</span>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CustomPlaylist;
