import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import AuthContext from "../context/AuthContext";

export default function MainLayout() {
  return (
    <AuthContext>
      <section className="w-full h-full">
        <Navbar />
        <Outlet />
      </section>
    </AuthContext>
  );
}
