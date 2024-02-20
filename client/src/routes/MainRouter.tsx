import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Index from "../primary_comps/Index";
import NotFound from "../components/NotFound";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Recovery from "../components/auth/Recovery";

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
        </Routes>
      </div>
    </Router>
  );
}

export default MainRouter;