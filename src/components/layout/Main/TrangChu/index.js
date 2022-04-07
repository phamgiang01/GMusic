import React from 'react'
import SliderBanner from './SliderBanner'
import SliderItem from './SliderItem'
import NewRelease from './NewRelease'
import { HitInHere, RapViet } from '../storeMain'
import ChartTopMusic from './ChartTopMusic'
import BXHSong from './BXHSong'
import './index.scss'
import Footer from '../Footer'
function TrangChu() {
  return (
    <div className='main'>
      <SliderBanner />
      <SliderItem title="Phiêu cùng Rap Việt" listItem={RapViet} /> 
      <SliderItem title="Ở đây có Hit" listItem={HitInHere} /> 
      <NewRelease />
      <ChartTopMusic />
      <BXHSong />
      <Footer />
    </div>
  )
}

export default TrangChu
