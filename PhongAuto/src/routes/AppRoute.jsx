import { Route, Routes } from "react-router-dom";
import { duongdan } from ".";
import Dashboard from "../pages/Dashboard/Dashboard";
import Homepage from "../pages/Homepage/Homepage";
import Detail from "../pages/Detail/Detail";

export default function AppRoute() {
  return (
    <Routes>
      <Route path={duongdan.dashboard} element={<Dashboard />} />
      <Route path={duongdan.home} element={<Homepage />} />
      <Route path={`${duongdan.detail}/:id`} element={<Detail />} />
    </Routes>
  );
}
