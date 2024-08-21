import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Layout;
