import React , {useEffect, useState} from 'react'
import BXHItem from './BXHItem';
import './BXHSong.scss'
import NhacCuaTui from "nhaccuatui-api-full";
const BXHSong = () => {
  const [listVN,setListVN] =useState();
  const [listUSA,setListUSA] =useState();
  const [listKorea,setListKorea] =useState();

  useEffect(() => {
    NhacCuaTui.getChart({category:"nhac-viet"}).then((data) =>setListVN(data.ranking));
    NhacCuaTui.getChart({category:"au-my"}).then((data) =>setListUSA(data.ranking));
    NhacCuaTui.getChart({category:"nhac-han"}).then((data) =>setListKorea(data.ranking));

  }, []);
  return (
    <div className='BXH__Songs'>
      <h2>BXH Bài Hát</h2>
      <div className="list__top-area row">
        <BXHItem  data={listVN} title="Việt Nam" />
        <BXHItem  data={listUSA} title="Âu Mỹ "  />
        <BXHItem  data={listKorea} title="Hàn Quốc"  />
      </div>
    </div>
  )
}

export default BXHSong
