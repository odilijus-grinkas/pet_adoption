import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Index from "../primary_comps/Index";
import Login from "../primary_comps/Auth/Login";
import NotFound from "../components/NotFound";
import Recovery from "../primary_comps/Auth/Recovery";
import Register from "../primary_comps/Auth/Register";
import UserList from "../components/AdminModeratorPages/AdminModeratorPage";
import Post from "../components/Posts/Post";

function MainRouter() {
  return (
    <Router>
      <div>
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
          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFound />} />
          {/* Admin | Moderator Page Route */}
         {/*  <Route path="/AdMod" element={<UserList />} />*/}
        </Routes>
      </div>
    </Router>
  );
}

export default MainRouter;
