import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/Home";
import LoginPage from "../auth/Login";
import RegisterPage from "../auth/Register";

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
        ],
    },
]);
