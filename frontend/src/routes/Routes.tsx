import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/Home";
import LoginPage from "../auth/Login";
import RegisterPage from "../auth/Register";
import ProfilePage from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/register",
        Component: RegisterPage,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
