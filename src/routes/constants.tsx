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
    element: <>hola</>,
    // element: <SignUp />,
  },
  {
    exact: false,
    path: paths.signup,
    element: <>hola</>,
    // element: <SignUp />,
  },
];
