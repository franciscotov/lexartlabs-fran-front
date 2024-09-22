import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { ROUTES } from "./constants";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        {ROUTES.map(({ path, ...config }) => (
          <Route key={path} path={path} {...config} />
        ))}
      </Routes>
    </Router>
  );
}
