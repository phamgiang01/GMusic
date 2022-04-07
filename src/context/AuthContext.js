import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/AuthReducer";
import axios from "axios";
import { LOCAL_STORAGE_TOKEN_NAME, LOCAL_STORAGE_USER_ID ,apiUrl} from "./constant";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });
  // get user
  const loadUser = async () => {
    
    const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
    try {
      const response = await axios.get(`${apiUrl}/auth`,{ headers:{'token': `Bearer ${accessToken}`}});

      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (err) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      localStorage.removeItem(LOCAL_STORAGE_USER_ID);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };
  useEffect(() => loadUser(), []);

  // Login user
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
        localStorage.setItem(
          LOCAL_STORAGE_USER_ID,
          response.data.userId
        );

      await loadUser();
      return response.data;
    } catch (err) {
      if (err.response.data) return err.response.data;
      else return { success: false, message: err.message };
    }
  };

  // Register user
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
        localStorage.setItem(
          LOCAL_STORAGE_USER_ID,
          response.data.userId
        );
      await loadUser();

      return response.data;
    } catch (err) {
      if (err.response.data) return err.response.data;
      else return { success: false, message: err.message };
    }
  };

  // Logout user
  const logoutUser = async () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
  };

  const authContextData = { loginUser, registerUser, logoutUser, authState };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
