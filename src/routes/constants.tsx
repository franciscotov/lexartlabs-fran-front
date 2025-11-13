import CreateProduct from "../pages/product/create";
import Login from "../pages/login";
import SignUp from "../pages/signup";
import { paths } from "./paths";
import ProductList from "@/pages/product/list";

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
  {
    exact: false,
    path: paths.product,
    element: <CreateProduct />,
  },
  {
    exact: false,
    path: paths.products,
    element: <ProductList />,
  },
];
