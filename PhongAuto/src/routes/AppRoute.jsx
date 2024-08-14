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
            <ProtectedRoute roles={["CUSTOMER", "ADMIN"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
