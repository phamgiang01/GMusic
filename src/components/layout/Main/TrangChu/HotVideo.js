import React from 'react'
import { Link } from 'react-router-dom'
import { HotVideos } from '../storeMain'
import './HotVideo.scss'

import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const HotVideo = () => {
  return (
    <div className="hotVideo">
      <h2>Hot Video</h2>
      <div className="video__list row">
        {
          HotVideos[0].videos.map((video)=>(
            <div  key={video.id} className="col-12 col-md-6">
              <div className="video">
                <Link to="/">
                  <img src={video.imgPath} alt="" />
                  <div className="item__mask">
                            <MoreVertIcon style={{ position:"absolute", top:5,right:0,zIndex:3,color:"black"}}/>
                            <PlayCircleOutlineIcon style={{ position:"absolute",top: "50%",left:"50%",color:"black",transform: "translate(-50%,-50%)",zIndex:3,height:30,width:30 }}/>
                  </div>
                  <span>{video.time}</span>
                </Link>
              </div>
              <div className="infor__video">
                <Link to="/">
                  <h6>{video.title}</h6>
                </Link>
                <p style={{color:"white"}}>{video.artist}</p>
              </div>
            </div>
          ))
        }
      </div>
      <div className="video__list row ">
        {
          HotVideos[1].videos.map((video)=>(
            <div  key={video.id} className="col-12 col-sm-6 col-md-3">
              <div className="video" style={{maxWidth:"90%"}}>
                <Link to="/">
                  <img src={video.imgPath} alt="" />
                  <div className="item__mask">
                            <MoreVertIcon style={{ position:"absolute", top:5,right:0,zIndex:3,color:"black"}}/>
                            <PlayCircleOutlineIcon style={{ position:"absolute",top: "50%",left:"50%",color:"black",transform: "translate(-50%,-50%)",zIndex:3,height:30,width:30 }}/>
                  </div>
                  <span>{video.time}</span>
                </Link>
              </div>
              <div className="infor__video">
                <Link to="/">
                  <h6 style={{fontSize:15}}>{video.title}</h6>
                </Link>
                <p style={{fontSize:14 ,color:"white"}}>{video.artist}</p>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default HotVideo
