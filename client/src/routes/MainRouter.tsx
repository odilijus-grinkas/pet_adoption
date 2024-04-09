import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AdminPanel from "../components/AdminModeratorPages/AdminPanel";
import AllPostsPage from "../primary_comps/AllPostsPage";
import Index from "../primary_comps/Index";
import Login from "../primary_comps/Auth/Login";
import NotFound from "../components/NotFound";
import Post from "../components/Posts/Post";
import PostCreate from "../components/Posts/PostCreate";
import Profile from "../components/Profile/Profile";
import Recovery from "../primary_comps/Auth/Recovery";
import Register from "../primary_comps/Auth/Register";
import Timeout from "../primary_comps/Auth/Timeout";

// import PostList from "../primary_comps/PostList";

function MainRouter() {
  return (
    <Router>
      <div>
        {/* Wrap Routes with Timeout component */}
        <Timeout timeout={3600000}>
          <Routes>
            {/* Posts Page Route */}
            {<Route path="/" element={<Index />} />}
            <Route path="/allposts/" element={<AllPostsPage />} />
            <Route path="/allposts/:filter" element={<AllPostsPage />} />
            {/* Posts URL Route */}
            <Route path="/Post" element={<Post />} />
            <Route path="/Post/:id" element={<Post />} />
            <Route path="/Post/Create" element={<PostCreate />} />
            {/* Auth Route */}
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Recovery" element={<Recovery />} />
            {/* Profile */}
            <Route path="/Profile" element={<Profile />} />
            {/* 404 Not Found Route */}
            <Route path="*" element={<NotFound />} />
            {/* Admin | Moderator Page Route */}
            <Route path="/AdminPanel" element={<AdminPanel />} />
          </Routes>
        </Timeout>
      </div>
    </Router>
  );
}

export default MainRouter;
