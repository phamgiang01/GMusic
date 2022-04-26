import React, { useEffect, useState } from 'react'
import SliderBanner from './SliderBanner'
import SliderItem from './SliderItem'
import NewRelease from './NewRelease'
import ChartTopMusic from './ChartTopMusic'
import BXHSong from './BXHSong'
import HotVideo from './HotVideo'
import './index.scss'
import Footer from '../Footer'
import NhacCuaTui from "nhaccuatui-api-full";
import Song from './Song'
const TrangChu=()=> {
  const [list,setList]=useState()
  useEffect(() => {
    NhacCuaTui.getHome().then((data) => setList(data.topicEvent));
    

  }, []);
  return (
    <div className='main'>
      <SliderBanner />
      {list?.map((item)=>(
        <SliderItem list={item} /> 
      ))}
      <NewRelease />
      <ChartTopMusic />
      <BXHSong />
      <HotVideo />
      <Song />
      <Footer />
    </div>
  )
}

export default TrangChu
