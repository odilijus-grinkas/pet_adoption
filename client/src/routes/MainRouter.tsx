import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AdminPanel from "../components/AdminModeratorPages/AdminPanel";
import Index from "../primary_comps/Index";
import Login from "../components/auth/Login";
import NotFound from "../components/NotFound";
import Recovery from "../components/auth/Recovery";
import Register from "../components/auth/Register";

function MainRouter() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Root URL Route */}
          <Route path="/" element={<Index />} />
          {/* Auth Route */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Recovery" element={<Recovery />} />
          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFound />} />
          {/* Admin | Moderator Page Route */}
          <Route path="/AdminPanel" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default MainRouter;
