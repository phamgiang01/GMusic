import { React, useState, useRef, useEffect, useContext } from "react";
import "./Listen.scss";
import TimeSlider from "react-input-slider";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShuffleOutlinedIcon from "@material-ui/icons/ShuffleOutlined";
import SyncAltOutlinedIcon from "@material-ui/icons/SyncAltOutlined";
import SyncOutlinedIcon from "@material-ui/icons/SyncOutlined";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeMuteIcon from "@material-ui/icons/VolumeMute";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import SearchIcon from "@material-ui/icons/Search";
import { DataContext } from "../../../context/DataContext";
import { AuthContext } from "../../../context/AuthContext";
import { ProfileContext } from "../../../context/ProfileContext";
import { Row, Col } from "react-bootstrap";
import NhacCuaTui from "nhaccuatui-api-full";
import AlertMessage from "../AlertMessage";
const Listen = () => {
  const songOld = JSON.parse(localStorage.getItem("song-id"));
  const [audioChoose, setAudioChoose] = useState();
  const [checkTypeAudio, setCheckTypeAudio] = useState(false);

  const {
    dataState: { keyAudio, listKey, indexKey },
    updateAudio,
  } = useContext(DataContext);
  const {
    authState: { user },
  } = useContext(AuthContext);
  const {
    profileState: { arrList },
    addToListSongLove,
    addToPlaylist,
    getArrPlaylist,
  } = useContext(ProfileContext);
  useEffect(() => {
    localStorage.setItem("song-id", JSON.stringify(""));
    if (!keyAudio) {
      NhacCuaTui.getSong(songOld).then((data) => {
        data?.song?.streamUrls.length > 0
          ? setAudioChoose(data.song)
          : setAudioChoose();
      });
      setCheckTypeAudio(true);

      localStorage.setItem("song-id", JSON.stringify(songOld));
    } else {
      setCheckTypeAudio(false);
      keyAudio.key
        ? NhacCuaTui.getSong(keyAudio.key).then((data) => {
            data.song.streamUrls.length > 0
              ? setAudioChoose(data.song)
              : setAudioChoose();
          })
        : NhacCuaTui.getSong(keyAudio.songKey).then((data) => {
            data.song.streamUrls.length > 0
              ? setAudioChoose(data.song)
              : setAudioChoose();
          });

      if (keyAudio.key)
        localStorage.setItem("song-id", JSON.stringify(keyAudio?.key));
      if (keyAudio.songKey)
        localStorage.setItem("song-id", JSON.stringify(keyAudio?.songKey));
    }
  }, [keyAudio, indexKey]);

  const [nameSearch, setNameSearch] = useState("");
  const audioRef = useRef();
  const [isPlay, setIsPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(30);
  const [duration, setDuration] = useState(0);
  const [isReplay, setIsReplay] = useState(false);
  const [volmute, setVolmute] = useState(0);
  const [showOption, setShowOption] = useState(false);
  const newArrPlaylist = arrList?.filter((child) => {
    child = child.toLowerCase();
    return child.indexOf(nameSearch) > -1;
  });
  const handleAddToPlaylist = (item) => {
    const newItem = { name: item, song: keyAudio };
    addToPlaylist(newItem);
  };
  useEffect(() => {
    if (user) getArrPlaylist();
  }, [user]);
  useEffect(() => {
    if (audioChoose && !checkTypeAudio) {
      setIsPlay(true);
      audioRef?.current?.play();
    } else {
      setIsPlay(false);
      audioRef?.current?.pause();
    }
  }, [audioChoose]);
  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
    if (isPlay) audioRef.current.play();
  };

  const handleTimeSliderChange = ({ x }) => {
    audioRef.current.currentTime = x;
    setCurrentTime(x);

    if (!isPlay) {
      setIsPlay(true);
      audioRef.current.play();
    }
  };
  const handleVolumeSliderChange = ({ x }) => {
    audioRef.current.volume = x / 100;
    setVolume(x);
  };
  const handlePausePlayClick = () => {
    if (audioChoose) {
      if (isPlay) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
      setIsPlay(!isPlay);
    }
  };
  const handleRePlay = () => {
    setIsReplay(!isReplay);
  };
  const handleOnOffVolume = () => {
    if (volume !== 0) {
      setVolmute(volume);
      setVolume(0);
      audioRef.current.volume = 0;
    } else {
      setVolume(volmute);
      audioRef.current.volume = volmute / 100;
    }
  };

  return (
    <Row className="listen">
      <Col xs={3} sm={3} md={5} lg={4} xl={3} className="background__audio">
        {audioChoose ? (
          <div className="infor-song">
            {audioChoose.thumbnail ? (
              <img
                src={audioChoose.thumbnail}
                alt=""
                className="Song-Thumbnail"
              />
            ) : (
              <img
                style={{ maxWidth: 300 }}
                src="https://stc-id.nixcdn.com/v12/static/media/default_song_no_cover.a876da66.png"
                alt=""
                className="Song-Thumbnail"
              />
            )}
            <div className="Song-Title">
              <h6>{audioChoose.title}</h6>
              <p>
                {audioChoose.artists.map((item, index) =>
                  index < audioChoose.artists.length - 1 ? (
                    <span key={index}>{item.name},</span>
                  ) : (
                    <span key={index}>{item.name}</span>
                  )
                )}
              </p>
            </div>
          </div>
        ) : (
          <img src="" alt="" className="Song-Thumbnail" />
        )}

        <i style={{ position: "relative" }}>
          {user && audioChoose ? (
            <>
              <MoreVertIcon onClick={(e) => setShowOption(!showOption)} />
              {showOption ? (
                <div className="optionMore">
                  <div className="searchPlaylist">
                    <PlaylistAddIcon />
                    <span>Thêm vào playlist</span>
                    <div className="form_playlist">
                      <input
                        type="text"
                        placeholder="Search"
                        onChange={(e) =>
                          setNameSearch(e.target.value.toLocaleLowerCase())
                        }
                      />
                      <SearchIcon />
                      <div className="form_playlist-scroll">
                        {newArrPlaylist?.map((item, index) => (
                          <div key={index}>
                            <li onClick={(e) => handleAddToPlaylist(item)}>
                              {item}
                            </li>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={(e) => addToListSongLove(audioChoose)}
                    style={{ padding: "5px 10px", cursor: "pointer" }}
                  >
                    <PlaylistAddIcon />
                    <span>Thêm vào yêu thích</span>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </i>
      </Col>
      <Col xs={9} sm={9} md={7} lg={6} xl={7} className="Control-music">
        <Row className="Control-Button-Group">
          <Col xs={2} className="Shuffle-Button">
            <ShuffleOutlinedIcon />
          </Col>
          <Col
            xs={2}
            className="Prev-button"
            onClick={() => {
              if (indexKey >= 1) updateAudio(null, listKey, indexKey - 1);
            }}
          >
            <SkipPreviousIcon />
          </Col>
          <Col
            xs={2}
            className="Pause-Play-Button"
            onClick={handlePausePlayClick}
            onKeyPress={handlePausePlayClick}
          >
            {isPlay ? <PauseIcon /> : <PlayArrowIcon />}
          </Col>
          <Col
            xs={2}
            className="Next-Button"
            onClick={() => {
              if (indexKey < listKey.length - 1)
                updateAudio(null, listKey, indexKey + 1);
            }}
          >
            <SkipNextIcon />
          </Col>
          <Col xs={2} className="Replay-Button" onClick={handleRePlay}>
            {isReplay ? (
              <SyncOutlinedIcon style={{ color: "turquoise" }} />
            ) : (
              <SyncAltOutlinedIcon />
            )}
          </Col>
        </Row>
        {audioChoose ? (
          <audio
            ref={audioRef}
            src={audioChoose?.streamUrls[0]?.streamUrl}
            onLoadedData={handleLoadedData}
            onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
            onEnded={() => {
              if (isReplay) {
                setCurrentTime(0);
                audioRef.current.play();
              } else {
                if (indexKey < listKey.length - 1)
                  updateAudio(null, listKey, indexKey + 1);
              }
            }}
          />
        ) : (
          ""
        )}
        <div className="time__slider">
          {audioChoose ? (
            <p>
              {Math.floor(currentTime / 60) < 10 ? (
                <span>0{Math.floor(currentTime / 60)}</span>
              ) : (
                <span>{Math.floor(currentTime / 60)}</span>
              )}
              :
              {Math.floor(currentTime % 60) < 10 ? (
                <span>0{Math.floor(currentTime % 60)}</span>
              ) : (
                <span>{Math.floor(currentTime % 60)}</span>
              )}
            </p>
          ) : (
            <p>00:00</p>
          )}

          <TimeSlider
            axis="x"
            xmax={duration}
            x={currentTime}
            onChange={handleTimeSliderChange}
            styles={{
              track: {
                backgroundColor: "#e3e3e3",
                height: "3px",
                width: "350px",
              },
              active: {
                backgroundColor: "turquoise",
                height: "3px",
              },
              thumb: {
                width: "12px",
                height: "12px",
                backgroundColor: "#fff",
                borderRadius: "50%",
              },
            }}
          />
          {audioChoose ? <p>{audioChoose.duration}</p> : <p>00:00</p>}
        </div>
      </Col>

      <Col lg={2} className="volume">
        <i className="volumeToggle" onClick={handleOnOffVolume}>
          {volume > 50 ? (
            <VolumeUpIcon />
          ) : volume > 1 ? (
            <VolumeDownIcon />
          ) : (
            <VolumeMuteIcon />
          )}
        </i>

        <TimeSlider
          axis="x"
          xmax="100"
          x={volume}
          onChange={handleVolumeSliderChange}
          className="sliderVolume"
          styles={{
            track: {
              backgroundColor: "#e3e3e3",
              width: "90px",
              height: "3px",
              zIndex: 5,
            },
            active: {
              backgroundColor: "turquoise",
              height: "3px",
            },
            thumb: {
              width: "12px",
              height: "12px",

              borderRadius: "50%",
              zIndex: 5,
            },
          }}
        />
      </Col>
    </Row>
  );
};
export default Listen;
