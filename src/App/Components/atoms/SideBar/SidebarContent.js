import React from "react";
import { Link, NavLink, Route } from "react-router-dom";
import * as Icons from "../Icons";
import SidebarSubmenu from "./SidebarSubmenu";
import { connect } from "react-redux";
import sidePanelLogo from "./../../../assets/images/leftpanelLogo.png";



function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function SidebarContent(props) {
  const { isAuthenticated, isSidebarOpen, toggleSidebar, t } = props;

  return (
    <div className="text-gray-500 dark:text-gray-400">
      <Link
        onClick={isSidebarOpen ? toggleSidebar : null}
        className="ml-6 w-full m-0 py-4 float-left sidepanel-logo"
        to="#"
      >
        <img src={sidePanelLogo} />
        </Link>
      {props.routes.map((route, index) => {
        // console.log(`Sidebar - ${route.path}`);
        // return <div>Hey {route.path}</div>
      })}
      <ul className="float-left w-full">
        {props.routes &&
          props.routes.map((route, index) =>
            !isAuthenticated && route.auth === false ? (
              <NavLink
                onClick={isSidebarOpen ? toggleSidebar : null}
                to={route.path}
                key={index}
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              >
                {route.title}
              </NavLink>
            ) : isAuthenticated &&
              route.auth == true &&
              route.display == "NavBar" ? (
              route.routes ? (
                <SidebarSubmenu
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                  route={route}
                  key={route.title}
                  {...props}
                />
              ) : !route.sub ? (
                <li className={`relative panel-${t(`navigation.${route.title}`).replace(/\s/g, '')}`} key={route.title}>
                  <NavLink
                    exact
                    onClick={isSidebarOpen ? toggleSidebar : null}
                    to={route.path}
                    className="inline-flex px-3 py-3  items-center w-full text-sm font-semibold text-white duration-150 hover:text-gray-100 dark:hover:text-gray-200"
                    activeClassName="text-gray-100 dark:text-gray-100"
                  >
                    <Route path={route.path} exact={route.exact}>
                      <span
                        className="absolute inset-y-0 left-0 w-1 rounded-tr-lg rounded-br-lg"
                        aria-hidden="true"
                      ></span>
                    </Route>
                    <span className="ml-4 bg-img">
                      {t(`navigation.${route.title}`)}
                    </span>
                  </NavLink>
                </li>
              ) : (
                ""
              )
            ) : (
              ""
            )
          )}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({
  routes: state.startup.userRoutes,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SidebarContent);
