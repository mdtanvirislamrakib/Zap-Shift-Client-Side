import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../RootLayout/RootLayout";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            element: <p>Hello Bro</p>
        }
    ]
  },
]);