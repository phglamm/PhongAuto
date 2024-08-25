import { Route, Routes } from "react-router-dom";
import { duongdan } from ".";
import ProtectedRoute from "./protedtedRoute";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import Homepage from "../pages/Homepage/Homepage";
import Detail from "../pages/Detail/Detail";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFound from "../pages/NotFound/NotFound";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import Accounts from "../pages/Dashboard/Accounts/Accounts";
import CartPage from "../pages/CartPage";
import Checkout from "../pages/Checkout";
import OrderHistoryPage from "../pages/OrderHistoryPage";
import TrackingPage from "../pages/TrackingPage";
import OrderSuccess from "../pages/OrderSuccess";
import Statistics from "../pages/Dashboard/Statistics";
import Orders from "../pages/Dashboard/Orders";

export default function AppRoute() {
  return (
    <div>
      <Routes>
        <Route
          path={duongdan.dashboard}
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <Dashboard />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path={`${duongdan.dashboard}/${duongdan.accounts}`}
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <Accounts />
            </ProtectedRoute>
          }
        />
        <Route path={duongdan.home} element={<Homepage />} />
        <Route path={`${duongdan.detail}/:id`} element={<Detail />} />
        <Route path={duongdan.login} element={<LoginPage />} />
        <Route path={duongdan.notfound} element={<NotFound />} />
        <Route path={duongdan.register} element={<RegisterPage />} />
        <Route
          path={duongdan.profile}
          element={
            <ProtectedRoute roles={["CUSTOMER", "ADMIN", "STAFF"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path={duongdan.cart} element={<CartPage />} />
        <Route
          path={duongdan.checkout}
          element={
            <ProtectedRoute roles={["CUSTOMER"]}>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path={duongdan.orderHistory}
          element={
            <ProtectedRoute roles={["CUSTOMER"]}>
              <OrderHistoryPage />
            </ProtectedRoute>
          }
        />
        <Route path={`${duongdan.tracking}/:id`} element={<TrackingPage />} />
        <Route path={duongdan.orderSuccess} element={<OrderSuccess />} />
        <Route path="dashboard/statistics" element={<Statistics />} />
        <Route path="dashboard/orders" element={<Orders />} />
      </Routes>
    </div>
  );
}
