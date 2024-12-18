import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

export const routerList = [
  {
    path: "/login",
    element: Login,
    private: 0,
  },
  {
    path: "/register",
    element: Register,
    private: 0,
  },
  {
    path: "/dashboard",
    element: Dashboard,
    private: 1,
  },
];

export { ProtectRoutes } from "./ProtectRoutes";
export { PublicRoute } from "./PublicRoute";
