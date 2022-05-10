import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NhacCuaTui from "nhaccuatui-api-full";
import Loading from "../../Loading";
import Footer from "../Footer";
import { DataContext } from "../../../../context/DataContext";
import "./CustomSong.scss";
const CustomSong = () => {
  const key = useParams().id;
  const startIndex = key.lastIndexOf(".") + 1;
  const newKey = key?.slice(startIndex);
  const [song, setSong] = useState();
  const [loading, setLoading] = useState(true);
  const [lyric, setLyric] = useState();
  const { updateAudio } = useContext(DataContext);
  useEffect(() => {
    // setLoading(true)
    NhacCuaTui.getLyric(newKey).then((data) => {
      setLyric(data);
      //  setLoading(false)
    });
  }, []);
  useEffect(() => {
    NhacCuaTui.getSong(newKey).then((data) => {
      setSong(data.song);
      setLoading(false);
    });
  }, []);
  const convertString = (string) => {
    const newString = string?.replaceAll("<br />", "\n");
    return newString;
  };

  return (
    <div className="main">
      <div className="detailSong">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="detailSong-top">
              {song?.thumbnail ? (
                <img
                  src={song.thumbnail}
                  alt=""
                  onClick={() => updateAudio(song, null, null)}
                />
              ) : (
                <img
                  style={{ maxWidth: 300 }}
                  src="https://stc-id.nixcdn.com/v12/static/media/default_song_no_cover.a876da66.png"
                  alt=""
                  onClick={() => updateAudio(song, null, null)}
                />
              )}

              <div className="infor-song">
                <div className="name-song">
                  <span>Bài hát : </span>
                  <h6>{song.title}</h6>
                </div>
                <div className="artists-song">
                  {song.artists.map((child, index) => (
                    <img src={child.imageUrl} alt="" key={index} />
                  ))}
                  {song.artists.map((child, index) =>
                    index < song.artists.length - 1 ? (
                      <span key={index}>{child.name},</span>
                    ) : (
                      <span key={index}>{child.name}</span>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="lyric-song">
              <h6>Lời bài hát</h6>
              <p style={{ whiteSpace: "pre-wrap" }}>
                {convertString(lyric?.lyric?.lyric)}
              </p>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CustomSong;
