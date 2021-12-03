import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../../atoms/SideBar";
import Header from "../../atoms/Header";
import Main from "./Main";
import ThemedSuspense from "../../atoms/Header/ThemedSuspense";
// import { SidebarContext } from '../../../context/SidebarContext'

// const Page404 = lazy(() => import('../../../Containers/NotFound'))
// {/* <DashboardContainer {...props} routes={props.routes} role={props.role} authenticated={props.isAuthenticated}  /> */}

function DashboardContainer(props) {
  const { role, authenticated } = props;
  // const isSidebarOpen = true;

  //   const { isSidebarOpen, closeSidebar } = useContext()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [closeSidebar, setCloseSidebar] = useState(false);
  let location = useLocation();

  const onCloseSidebar = () => {
    // setCloseSidebar(!closeSidebar)
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    //setIsSidebarOpen(false)
    onCloseSidebar();
  });

  return (
    <div
      className={`dd flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden `}
    >
      <Sidebar
        toggleSidebar={toggleSidebar}
        {...props}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex flex-col flex-1 w-full">
        <Header {...props} toggleSidebar={toggleSidebar} />
        <Main {...props} />
      </div>
    </div>
  );
}
export default DashboardContainer;
