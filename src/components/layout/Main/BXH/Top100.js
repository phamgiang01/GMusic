
import React, {  useEffect, useState } from "react";
import NhacCuaTui from "nhaccuatui-api-full";

const BXH = () => {
  const [list,setList] = useState();

  // or
  useEffect(() => {
    NhacCuaTui.getHome().then((data) => setList(data.newRelease.song));
  },[]);
  
  return (
    <div className="main">
     {list?.map((item,index)=>(
       <div key={index}>
         <h6>{item.title}</h6>
         <img src={item.thumbnail} alt="" />
       </div>
     ))}
    </div>
  );
};

export default BXH;
