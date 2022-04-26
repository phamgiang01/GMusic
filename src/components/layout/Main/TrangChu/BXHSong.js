import React , {useContext, useState} from 'react'
import BXHItem from './BXHItem';
import './BXHSong.scss'
import { CallSongContext } from '../../../../context/CallSongContext';
const BXHSong = () => {
    const {songOfTop} = useContext(CallSongContext)
    const BXHVN = Object.values(songOfTop)[0]?.find((item) =>
    item.name === "Nhạc Trẻ")
    const BXHPop = Object.values(songOfTop)[1]?.find((item) =>
    item.name === "Pop")
    const BXHHan = Object.values(songOfTop)[2]?.find((item) =>
    item.name === "Nhạc Hàn")
    
  return (
    <div className='BXH__Songs'>
      <h2>BXH Bài Hát</h2>
      <div className="list__top-area row">
        <BXHItem  data={BXHVN}/>
        <BXHItem  data={BXHPop}/>
        <BXHItem  data={BXHHan}/>
      </div>
    </div>
  )
}

export default BXHSong
