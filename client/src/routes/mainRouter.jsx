import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Index from "../primary_comps/Index";
import NotFound from "../components/NotFound";

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
          <Route path="../components/NotFound" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default MainRouter;
