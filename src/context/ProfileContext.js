import axios from "axios";
import { createContext, useReducer } from "react";
import { ProfileReducer } from "../reducers/ProfileReducer";
import {
  LOCAL_STORAGE_TOKEN_NAME,
  LOCAL_STORAGE_USER_ID,
  apiUrl,
} from "./constant";

export const ProfileContext = createContext();

const ProfileContextProvider = ({ children }) => {
  const [profileState, dispatch] = useReducer(ProfileReducer, {
    list: null,
    arrList: null,
  });

  // Get name all playlist
  const getArrPlaylist = async () => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
    const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID);
    try {
      const response = await axios.get(
        `${apiUrl}/profile/getListPlaylist/` + userId,
        {
          headers: { token: `Bearer ${accessToken}` },
        }
      );
      dispatch({
        type: "GET_ARR_LIST",
        payload: { arrList: response.data.arrPlaylist },
      });
      return { success: true, message: "Get all playlist successfully" };
    } catch (err) {
      if (err.response.data) return err.response.data;
      else return { success: false, message: err.message };
    }
  };

  // Get Playlist
  const getPlaylist = async (name) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
    const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID);
    try {
      const response = await axios.get(
        `${apiUrl}/profile/getPlaylist/` + userId + "/" + name,
        {
          headers: { token: `Bearer ${accessToken}` },
        }
      );

      dispatch({
        type: "GET_PLAYLIST",
        payload: { list: response.data.playlist.songs },
      });
      return { success: true, message: "Get  playlist successfully" };
    } catch (err) {
      if (err.response.data) return err.response.data;
      else return { success: false, message: err.message };
    }
  };
  // Get SongLove
  const getListSongLove = async () => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
    const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID);
    try {
      const response = await axios.get(
        `${apiUrl}/profile/getListSongLove/` + userId,
        {
          headers: { token: `Bearer ${accessToken}` },
        }
      );
      dispatch({
        type: "GET_PLAYLIST",
        payload: { list: response.data.listSongLove },
      });
      return { success: true, message: "Get  list successfully" };
    } catch (err) {
      if (err.response.data) return err.response.data;
      else return { success: false, message: err.message };
    }
  };

  // Create playlist
  const createPlaylist = async (item) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
    const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID);
    try {
      const response = await axios.post(
        `${apiUrl}/profile/createPlaylist/` + userId,
        item,
        { headers: { token: `Bearer ${accessToken}` } }
      );
      getArrPlaylist();
      return { success: true, message: response.data.message };
    } catch (err) {
      if (err.response.data) return err.response.data;
      else return { success: false, message: err.message };
    }
  };

  // Remove Playlist
  const removePlaylist = async (name) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
    const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID);
    const item = { name: name };
    try {
      const response = await axios.post(
        `${apiUrl}/profile/removePlaylist/` + userId,
        item,
        { headers: { token: `Bearer ${accessToken}` } }
      );

      getArrPlaylist();
      return { success: true, message: response.data.message };
    } catch (err) {
      if (err.response.data) return err.response.data;
      else return { success: false, message: err.message };
    }
  };

  // Add song to Playlist
  const addToPlaylist = async (item) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
    const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID);
    try {
      const list = await axios.get(
        `${apiUrl}/profile/getPlaylist/` + userId + "/" + item.name,
        {
          headers: { token: `Bearer ${accessToken}` },
        }
      );
      const exist = list.data.playlist.songs.find(
        (child) => child.music === item.song.music
      );
      if (exist) return { success: false, message: "Song exist in Playlist" };
      const newList = [...list.data.playlist.songs, item.song];
      const newItem = {
        name: item.name,
        songs: newList,
      };
      const response = await axios.post(
        `${apiUrl}/profile/updatePlaylist/` + userId,
        newItem,
        { headers: { token: `Bearer ${accessToken}` } }
      );
      return { success: true, message: response.data.message };
    } catch (err) {
      // if (err.response.data) return err.response.data;
      return { success: false, message: err.message };
    }
  };
  // Remove Song From Playlist
  const removeFromPlaylist = async (item) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
    const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID);
    try {
      const list = await axios.get(
        `${apiUrl}/profile/getPlaylist/` + userId + "/" + item.name,
        {
          headers: { token: `Bearer ${accessToken}` },
        }
      );
      const newList = list.data.playlist.songs.filter(
        (child) => child.music !== item.song.music
      );
      const newItem = {
        name: item.name,
        songs: newList,
      };
      const response = await axios.post(
        `${apiUrl}/profile/updatePlaylist/` + userId,
        newItem,
        { headers: { token: `Bearer ${accessToken}` } }
      );
      return { success: true, message: response.data.message };
    } catch (err) {
      if (err.response.data) return err.response.data;
      else return { success: false, message: err.message };
    }
  };

  // Add Song to Song Love
  const addToListSongLove = async (item) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
    const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID);
    try {
      await axios.post(`${apiUrl}/profile/addListSongLove/` + userId, item, {
        headers: { token: `Bearer ${accessToken}` },
      });
      return { success: true, message: "Add Song Successfully" };
    } catch (err) {
      if (err.response.data) return err.response.data;
      else return { success: false, message: err.message };
    }
  };

  // Remove Song from Song Love
  const removeSongLove = async (item) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
    const userId = localStorage.getItem(LOCAL_STORAGE_USER_ID);
    try {
      await axios.post(`${apiUrl}/profile/delListSongLove/` + userId, item, {
        headers: { token: `Bearer ${accessToken}` },
      });

      return { success: true, message: "Remove Song Successfully" };
    } catch (err) {
      if (err.response.data) return err.response.data;
      else return { success: false, message: err.message };
    }
  };

  const ProfileContextData = {
    getArrPlaylist,
    getPlaylist,
    createPlaylist,
    removePlaylist,
    addToPlaylist,
    removeFromPlaylist,
    getListSongLove,
    addToListSongLove,
    removeSongLove,
    profileState,
  };

  return (
    <ProfileContext.Provider value={ProfileContextData}>
      {children}
    </ProfileContext.Provider>
  );
};
export default ProfileContextProvider;
