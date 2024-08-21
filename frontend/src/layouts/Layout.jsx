import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main className="flex-shrink-0 min-h-screen flex flex-col">
        <div className="pt-16">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
