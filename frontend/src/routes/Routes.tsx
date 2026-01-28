import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/Home";
import LoginPage from "../auth/Login";
import RegisterPage from "../auth/Register";
import ProfilePage from "../pages/Profile";
import ProductsPage from "../pages/Products";
import SalesPage from "../pages/Sales";
import PrivateRoute from "./PrivateRoute";
import AuthGuard from "./AuthGuard";
import ErrorPage from "../pages/Error";

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
        element: (
          <AuthGuard>
            <LoginPage />
          </AuthGuard>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthGuard>
            <RegisterPage />
          </AuthGuard>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/products",
        element: (
          <PrivateRoute>
            <ProductsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/sales",
        element: (
          <PrivateRoute>
            <SalesPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);
