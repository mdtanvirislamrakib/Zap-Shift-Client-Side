import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home";
import AuthLayout from "../AuthLayouts/AuthLayout";
import Login from "../Pages/Login/Login";
import Registar from "../Pages/Registar/Registar";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login
      },
      {
        path: "/registar",
        Component: Registar,
      }
    ]
  }
]);