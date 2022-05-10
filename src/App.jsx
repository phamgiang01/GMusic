import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./components/layout/Menu/Menu";
import ChartGMusic from "./components/layout/Main/BXH/ChartGMusic";
import TrangChu from "./components/layout/Main/TrangChu";
import Search from "./components/layout/Main/Search/Search";
import "./App.scss";
import Listen from "./components/layout/Listen/Listen";
import Explore from "./components/layout/Main/Explore/Explore";
import ProfileUser from "./components/layout/Main/Profile/ProfileUser";
import DetailPlaylist from "./components/layout/Main/Profile/DetailsPlaylist";
import AppContextProvider from "./context/AppContext";
import CustomPlaylist from "./components/layout/Main/Custom/CustomPlaylist";
import Video from "./components/layout/Main/PageVideo/Video";
import CustomSong from "./components/layout/Main/Custom/CustomSong";
function App() {
  return (
    <div className="m-0 p-0 ">
      <AppContextProvider>
        <Router>
          <Menu />
          <Routes>
            <Route exact path="/" element={<TrangChu />} />
            <Route path="/BXH-GMusic/:id" element={<ChartGMusic />} />
            <Route path="/tim-kiem" element={<Search />} />
            <Route path="/kham_pha" element={<Explore />} />
            <Route path="/playlist/:id" element={<CustomPlaylist />} />
            <Route path="/song/:id" element={<CustomSong />} />
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
