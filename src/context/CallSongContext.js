import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CallSongContext = createContext();

const CallSongProvider = ({ children }) => {
  const [AllSongs,setAllSongs] = useState([]);
  const [songOfTop, setSongOfTop] = useState([]);
  const callSong = async () => {
    try {
      const res = await axios.get(
        "https://api.apify.com/v2/key-value-stores/EJ3Ppyr2t73Ifit64/records/LATEST?fbclid=IwAR1tL4S8cGIQgbW_o3r2kvBm2mcN6GQ2Je_al7EJhQPCYF2FSRtukZDvo1Q/songs"
      );
      setSongOfTop(res.data.songs);
      const newList01 =Object.values(res.data.songs)
      const newList02 = [].concat.apply([],newList01)
      const newList03 = [].concat.apply([],newList02.map(item=>{
        return item.songs
      }))
      setAllSongs(newList03)
    } catch (error) {
      console.log(error);
    }
      
  };
  useEffect(() => callSong(), []);
  return (
    <CallSongContext.Provider value={{ songOfTop, AllSongs }}>
      {children}
    </CallSongContext.Provider>
  );
};
export default CallSongProvider;
