import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./components/layout/Menu/Menu";
import BXH from "./components/layout/Main/BXH/Top100";
import TrangChu from "./components/layout/Main/TrangChu";
import Search from "./components/layout/Main/Search/Search";
import "./App.scss";
import Listen from "./components/layout/Listen/Listen";
import Explore from "./components/layout/Main/Explore/Explore";
import ProfileUser from "./components/layout/Main/Profile/ProfileUser";
import DetailPlaylist from "./components/layout/Main/Profile/DetailsPlaylist";
import AppContextProvider from "./context/AppContext";
import CustomPlaylist from "./components/layout/Main/CustomPlaylist/CustomPlaylist";
import Video from "./components/layout/Main/PageVideo/Video";
function App() {
  return (
    <div className="m-0 p-0">
      <AppContextProvider>
        <Router>
          <Menu />
          <Routes>
            <Route exact path="/" element={<TrangChu />} />
            <Route path="/BXH-Top100" element={<BXH />} />
            <Route path="/tim-kiem" element={<Search />} />
            <Route path="/kham_pha" element={<Explore />} />
            <Route path="/playlist/:id" element={<CustomPlaylist />} />
            <Route path="/video/:id" element={<Video />} />

            <Route path="/profile">
              <Route path="" element={<ProfileUser />} />
              <Route path=":id" element={<DetailPlaylist />} />
            </Route>
          </Routes>
          <Listen />
        </Router>
      </AppContextProvider>
    </div>
  );
}

export default App;
