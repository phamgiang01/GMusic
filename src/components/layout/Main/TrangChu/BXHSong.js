import React, { useEffect, useState } from "react";
import BXHItem from "./BXHItem";
import "./BXHSong.scss";
const BXHSong = () => {
  const keyVN = {
    key:"nhac-viet" ,
    title:"Việt Nam"
  }
  const keyMy = {
    key:"au-my" ,
    title:"Âu Mỹ"
  }
  const keyHan = {
    key:"nhac-han" ,
    title:"Hàn Quốc"
  }
  return (
    <div className="BXH__Songs">
      <h2>BXH Bài Hát</h2>
      
        <div className="list__top-area row">
          <BXHItem data={keyVN} />
          <BXHItem data={keyMy} />
          <BXHItem data={keyHan} />
        </div>
      
    </div>
  );
};

export default BXHSong;
