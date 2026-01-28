import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import RegisterLayout from "./pages/register/registerLayout";
import UserRegister from "./pages/register/UserRegister";
import HotelRegister from "./pages/register/HotelRegister";
import ActivityRegister from "./pages/register/ActivityRegister";
import Home from "./pages/landing/Home";
import Login from "./pages/login/Login";
import { RoleProtectedRoute } from "./components/protectedRoutes/ProtectedRoute";
import UserReservations from "./pages/adminPanel/UserReservations";
import HotelAdminPanel from "./pages/adminPanel/HotelAdminPanel";
import ActivityAdminPanel from "./pages/adminPanel/ActivityAdminPanel";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/my-reservations"
          element={
            <RoleProtectedRoute allowedRoles={["User"]}>
              <UserReservations/>
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/activities"
          element={
            <RoleProtectedRoute allowedRoles={["EAdmin"]}>
              <ActivityAdminPanel/>
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/admin/rooms"
          element={
            <RoleProtectedRoute allowedRoles={["HAdmin"]}>
              <HotelAdminPanel/>
            </RoleProtectedRoute>
          }
        />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterLayout />}>
          <Route index element={<UserRegister />} />
          <Route path="user" element={<UserRegister />} />
          <Route path="admin" element={<HotelRegister />} />
          <Route path="business" element={<ActivityRegister />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;