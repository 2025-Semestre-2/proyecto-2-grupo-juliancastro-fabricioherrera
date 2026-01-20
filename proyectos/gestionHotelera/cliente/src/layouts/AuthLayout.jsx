import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="auth-layout">
      <Outlet />
    </main>
  );
}
