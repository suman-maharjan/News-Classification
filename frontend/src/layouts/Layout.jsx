import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

const Layout = () => {
  return (
    <div className="">
      <NavBar />
      <main className="flex-shrink-0 d-flex flex-column min-vh-100">
        <div className="container mt-2 mb-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
