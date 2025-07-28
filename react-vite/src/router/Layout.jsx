import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";  // <-- import useLocation
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import Sidebar from "../components/Sidebar/Sidebar";
import "./Layout.css";

export default function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();     // <-- get current route
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // Hide sidebar on /about
  const hideSidebar = location.pathname === "/about";

  return (
    <ModalProvider>
      <Navigation />

      <div className="app-layout">
        {!hideSidebar && <Sidebar />}   {/* ✅ Conditional rendering */}
        <div className="main-content">
          {isLoaded && <Outlet />}
        </div>
      </div>

      <Modal />
    </ModalProvider>
  );
}
