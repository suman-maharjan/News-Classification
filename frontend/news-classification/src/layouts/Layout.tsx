import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { ToastProvider } from "../context/ToastContext";

const Layout = () => {
  return (
    <ToastProvider>
      <NavBar />
      <main className="flex-shrink-0 h-screen flex flex-col">
        <div className="h-full pt-16">
          <Outlet />
        </div>
      </main>
    </ToastProvider>
  );
};

export default Layout;
