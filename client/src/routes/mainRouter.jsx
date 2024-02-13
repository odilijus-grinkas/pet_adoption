import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Index from "../primary_comps/index";

// import NotFound from "./pages/NotFound"; - butu galima sukurti

function MainRouter() {
  return (
    <Router>
      <div>
        <Switch>
          {/* Index Route */}
          <Route path="../primary_comps/index" Component={Index} />
          {/* Auth Route */}
          {/* <Route path="../kazkurauth" Component={Auth} /> */}
          {/* 404 Not Found Route */}
          {/* <Route component={NotFound} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default MainRouter;
