import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import {createBrowserHistory} from "history";
import HomePage from "../components/HomePage";

export const browserHistory = createBrowserHistory();

// Instead of BrowserRouter, we use the regular router,
// but we pass in a customer history to it.
const AppRouter = () => (
  <Router history={browserHistory}>
    <div>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
