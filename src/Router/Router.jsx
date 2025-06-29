import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home";
import AuthLayout from "../AuthLayouts/AuthLayout";
import Login from "../Pages/Login/Login";
import Registar from "../Pages/Registar/Registar";
import PrivetRouts from "../Routs/PrivetRouts";
import Coverage from "../Pages/Coverage/Coverage";
import Loader from "../Components/Loader/Loader";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashBoardLayout from "../DashBoardLayout/DashBoardLayout";
import MyParcels from "../Pages/DashBoard/MyParcels";
import Payment from "../Pages/DashBoard/Payment";
import PaymentHistory from "../Pages/DashBoard/PaymentHistory/PaymentHistory";
import TrackParcel from "../Pages/DashBoard/TrackParcel/TrackParcel";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/coverage',
        loader: () => fetch("./area.json"),
        hydrateFallbackElement: <Loader></Loader>,
        element: <Coverage></Coverage>,
      },
      {
        path: "/SendParcel",
        loader: () => fetch("./area.json"),
        hydrateFallbackElement: <Loader></Loader>,
        element: <PrivetRouts>
          <SendParcel></SendParcel>
        </PrivetRouts>
      },
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
      },

    ]
  },
  {
    path: "/dashboard",
    element: <PrivetRouts>
      <DashBoardLayout></DashBoardLayout>
    </PrivetRouts>,
    children: [
      {
        path: "myparcels",
        Component: MyParcels
      },
      {
        path: "Payment/:parcelId",
        Component: Payment
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory
      },
      {
        path: "track",
        Component: TrackParcel
      }
    ]
  }
]);