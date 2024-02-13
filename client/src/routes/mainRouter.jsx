import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Index from "../primary_comps/Index";
import NotFound from "../components/NotFound";

function MainRouter() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Root URL Route */}
          <Route path="/" element={<Index />} />
          {/* Index Route */}
          <Route path="../primary_comps/index" element={<Index />} />
          {/* 404 Not Found Route */}
          <Route path="../components/NotFound" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default MainRouter;
