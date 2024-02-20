import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Index from "../primary_comps/Index";
import NotFound from "../components/NotFound";
import Login from "../components/auth/Login";

function MainRouter() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Root URL Route */}
          <Route path="/" element={<Index />} />
          {/* Auth Route */}
          <Route path="/login" element={<Login />} />
          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default MainRouter;