import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import RegisterLayout from "./pages/register/registerLayout";
import UserRegister from "./pages/register/UserRegister";
import HotelRegister from "./pages/register/HotelRegister";
import ActivityRegister from "./pages/register/ActivityRegister"
import Home from "./pages/landing/Home";
import Login from "./pages/login/Login";
import MainHotelPage from "./pages/hotels/MainHotelPage";
import HotelDetail from "./pages/hotels/HotelDetail";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/hoteles" element={<MainHotelPage />} />
        <Route path="/hotel/:idHotel" element={<HotelDetail />} />
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
    </Routes>
  );
}

export default App;
