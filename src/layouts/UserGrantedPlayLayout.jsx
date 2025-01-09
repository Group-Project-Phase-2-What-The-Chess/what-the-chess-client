import { Navigate, Outlet } from "react-router";

export default function UserGrantedPlayLayout() {
  const isGranted = localStorage.getItem("access");

  if (isGranted) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
}
