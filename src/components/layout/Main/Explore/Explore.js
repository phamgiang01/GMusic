import React, { useContext, useState } from "react";
import { CallSongContext } from "../../../../context/CallSongContext";
import "./Explore.scss";
import { DataContext } from "../../../../context/DataContext";
import {Row,Col} from 'react-bootstrap'
import Footer from "../Footer"
const Explore = () => {
  const { songOfTop } = useContext(CallSongContext);
  const [indexLocation, setIndexLocation] = useState(0);
  const [nameCategory, setNameCategory] = useState("Nhạc Trẻ");

  const { updateAudio } = useContext(DataContext);
  
  const updateCountry = (country) => {
    const listKeys = Object.keys(songOfTop);
    const IndexInList = listKeys.findIndex((key) => {
      return key === country;
    });
    if(country ==="top100_VN") setNameCategory("Nhạc Trẻ")
    if(country ==="top100_AM") setNameCategory("Pop")
    if(country ==="top100_CA") setNameCategory("Nhạc Hàn")
    if(country ==="top100_KL") setNameCategory("Không lời")
    setIndexLocation(IndexInList);
  };
  const handleCategory =(name)=>{
    setNameCategory(name)
  }

  return (
    <div className="main">
      <div className="country">
        <h5 onClick={() => updateCountry("top100_VN")}>Việt Nam</h5>
        <h5 onClick={() => updateCountry("top100_AM")}>Âu Mỹ</h5>
        <h5 onClick={() => updateCountry("top100_CA")}>Châu Á</h5>
        <h5 onClick={() => updateCountry("top100_KL")}>Khác</h5>
      </div>

      <div className="list-category">
        {Object.values(songOfTop)[indexLocation]?.map((item, index) => (
          <h6 key={index} onClick={()=>handleCategory(item.name)}>{item.name}</h6>
        ))}
      </div>
      <Row className="category-child">
        {Object.values(songOfTop)[indexLocation]?.map((item) =>
          item.name === nameCategory ? (
            item.songs.map((child, index) => (
              <Col xs={12} sm ={6} md={4} lg={3} 
                key={child.music}
                className="category-item"
                onClick={() => updateAudio(null, item.songs, index)}
              >
                <img src={child.avatar} alt="" />
                <h6>{child.title}</h6>
                <p>{child.creator}</p>
              </Col>
            ))
          ) : (
            <></>
          )
        )}
      </Row>
      <Footer />
    </div>
  );
};

export default Explore;
