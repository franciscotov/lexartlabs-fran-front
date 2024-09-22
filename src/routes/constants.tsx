import Login from "../pages/login";
import SignUp from "../pages/signup";
import { paths } from "./paths";

export const ROUTES = [
  {
    exact: false,
    path: paths.home,
    element: <SignUp />,
  },
  {
    exact: false,
    path: paths.login,
    element: <Login />,
  },
  {
    exact: false,
    path: paths.signup,
    element: <SignUp />,
  },
];
