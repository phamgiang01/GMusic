import { createContext } from "react";
import AuthContextProvider from "./AuthContext";
import { DataContextProvider, FormContextProvider } from "./DataContext";
import ProfileContextProvider from "./ProfileContext";
export const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  const appInitialState = {};
  return (
    <AppContext.Provider value={appInitialState}>
      
        <AuthContextProvider>
          <ProfileContextProvider>
            <DataContextProvider>
              <FormContextProvider>{children}</FormContextProvider>
            </DataContextProvider>
          </ProfileContextProvider>
        </AuthContextProvider>
      
    </AppContext.Provider>
  );
};
export default AppContextProvider;
