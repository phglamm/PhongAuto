import { Route, Routes } from "react-router-dom";
import { duongdan } from ".";
import Dashboard from "../pages/Dashboard/Dashboard";
import Detail from "../pages/Detail/Detail";
import Homepage from "@/pages/Homepage/Homepage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import ProfilePage from "@/pages/ProfilePage/ProfilePage";

export default function AppRoute() {
  return (
    <Routes>
      <Route path={duongdan.dashboard} element={<Dashboard />} />
      <Route path={duongdan.home} element={<Homepage />} />
      <Route path={`${duongdan.detail}/:id`} element={<Detail />} />
      <Route path={duongdan.login} element={<LoginPage />} />
      <Route path={duongdan.profile} element={<ProfilePage />} />
    </Routes>
  );
}
