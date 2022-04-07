import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { DataContext } from '../../../context/DataContext'
import './CustomList.scss'
const CustomList = (props) => {
  const [playlist, setPlaylist] = useState();
  const {
    updateAudio
  } = useContext(DataContext)
  const [namePlaylist, setNamePlaylist] = useState()
  const title = props.title;
  const id ="hi"
  // const { id } = useParams();
  // const user = useStore(state => state.user)
  // const updateAudio = useStore(state => state.updateAudio)
  // const listSongLove =  JSON.parse(localStorage.getItem('listSongLove'))
  // const getListSongLove = useStore(state => state.getListSongLove)
  // const listPlaylist = useStore(state => state.listPlaylist)
  useEffect(() => {
    // id ? setPlaylist(listPlaylist?.find(item => item.name === id)?.songs) : setPlaylist(listSongLove);
    id ? setNamePlaylist(id) : setNamePlaylist(title)
  }, [])
  return (
    <div style={{ padding: 30 }} className={id ? "main" : null}>
      <div className="title-Playlist">
        <img src="https://image.shutterstock.com/image-vector/playlist-handdrawn-concept-on-beige-260nw-1657857751.jpg" className="img" style={{ width: 200, height: 200, background: 'white' }} alt="" />
        <h2>{namePlaylist}</h2>
      </div>
      <div className="list-song">
        {playlist?.map((item, index) => (
          <div key={index}
           onClick={() => updateAudio(item)}
            className='song-item'>
            <img src={item.avatar} alt="" />
            <div className="song-title">
              <h6>{item.title}</h6>
              <p>{item.creator}</p>
            </div>
          </div>

        ))}
      </div>
    </div>
  )
}

export default CustomList