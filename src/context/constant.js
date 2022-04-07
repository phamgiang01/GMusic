export const apiUrl =
  process.env.MODE_ENV !== "production"
    ? "https://gmusic-app-01.herokuapp.com" : "http://localhost:5000"
    // : "https://gmusic01.herokuapp.com";

export const LOCAL_STORAGE_TOKEN_NAME = "Nhaccuatui";
export const LOCAL_STORAGE_USER_ID = "USER_ID";
export const LOCAL_STORAGE_ACTIVE = "active";
export const LOCAL_STORAGE_LIST_ACTIVE = "listActive";



