import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AdminPanel from "../components/AdminModeratorPages/AdminPanel";
import DropzoneComponent from "../components/Posts/DropzoneComponent"
import Index from "../primary_comps/Index";
import Login from "../primary_comps/Auth/Login";
import NotFound from "../components/NotFound";
import Post from "../components/Posts/Post";
import Profile from "../components/Profile/Profile";
import Recovery from "../primary_comps/Auth/Recovery";
import Register from "../primary_comps/Auth/Register";
import Timeout from '../primary_comps/Auth/Timeout';

function MainRouter() {
  return (
    <Router>
      <div>
        {/* Wrap Routes with Timeout component */}
        <Timeout timeout={3600000}>
          <Routes>
            {/* Root URL Route */}
            <Route path="/" element={<Index />} />
            {/* Posts URL Route */}
            <Route path="/Post" element={<Post />} />
            <Route path="/Post/:id" element={<Post />} />
            {/* Auth Route */}
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Recovery" element={<Recovery />} />
            {/* Profile */}
            <Route path="/Profile" element={<Profile />} />
            {/* 404 Not Found Route */}
            <Route path="*" element={<NotFound />} />
            <Route path="/AdminPanel" element={<AdminPanel />} />
            {/* Admin | Moderator Page Route */}
            {/*  <Route path="/AdMod" element={<UserList />} />*/}
            <Route path="/Testing" element={<DropzoneComponent />} />
          </Routes>
        </Timeout>
      </div>
    </Router>
  );
}

export default MainRouter;
