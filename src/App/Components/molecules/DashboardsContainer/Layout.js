import React, { useContext, Suspense, useEffect, lazy, useState } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import routes from "../routes";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Main from "../containers/Main";
import ThemedSuspense from "../components/ThemedSuspense";
import { SidebarContext } from "../context/SidebarContext";

const Page404 = lazy(() => import("../pages/404"));

function Layout() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(null);
  const [isPagesMenuOpen, setIsPagesMenuOpen] = useState(false);

  const togglePagesMenu = () => {
    setIsPagesMenuOpen(!isPagesMenuOpen);
  };
  useEffect(() => {}, []);

  return (
    <div
      classNameName="flex h-screen bg-gray-50 dark:bg-gray-900 "
      style={isSideMenuOpen ? "overflow-hidden:true" : ""}
    >
      {/* <!--  sidebar --> */}
      <Sidebar />
    </div>
  );
}

export default Layout;
