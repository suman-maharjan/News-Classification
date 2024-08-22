import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main className="flex-shrink-0 h-screen flex flex-col">
        <div className="h-full pt-16">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
