import SignUp from "@/app/signup/page";

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
    element: <SignUp />,
  },
  {
    exact: false,
    path: paths.signup,
    element: <SignUp />,
  },
];
