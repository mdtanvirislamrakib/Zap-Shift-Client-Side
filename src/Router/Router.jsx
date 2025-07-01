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
import BeARider from "../Pages/DashBoard/BeARider/BeARider";
import PendingRiders from "../Pages/DashBoard/PendingRiders/PendingRiders";
import ActiveRiders from "../Pages/DashBoard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../Pages/DashBoard/MakeAdmin/MakeAdmin";


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
        element: <PrivetRouts>
          <Coverage></Coverage>
        </PrivetRouts>,
      },
      {
        path: '/beARider',
        element: <PrivetRouts>
          <BeARider></BeARider>
        </PrivetRouts>,
        loader: () => fetch("./area.json"),
        hydrateFallbackElement: <Loader></Loader>,
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
        path: "make-admin",
        Component: MakeAdmin
      },
      {
        path: "pendingRiders",
        Component: PendingRiders
      },
      {
        path: "activeRiders",
        Component: ActiveRiders
      },
      {
        path: "track",
        Component: TrackParcel
      }
    ]
  }
]);