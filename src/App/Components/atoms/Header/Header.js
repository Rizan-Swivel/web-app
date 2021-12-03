import React, { useState } from "react";
import { connect } from "react-redux";
import StartupActions from "../../../Stores/Startup/Actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { MenuIcon } from "../Icons";


function Header(props) {
  const { toggleSidebar, t } = props;
  const { mode } = useState(null);
  const { toggleMode } = useState(null);

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  function onClicklogOut() {
    return (
      <a
        onClick={() => {
          props.logOut();
        }}
        className="cursor-pointer"
      >
        {" "}
        <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="mr-2" />
        Logout
      </a>
    );
  }

  return (
    <header className="z-40 py-4 bg-white shadow dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full mx-auto text-gray-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={() => toggleSidebar()}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex justify-left flex-1 lg:mr-32">    
        </div>
        <ul className="flex items-center mr-8 flex-shrink-0 space-x-6 text-black">
          {/* <!-- Theme toggler --> */}
          <li>   
          </li>
          {/* <Notification /> */}
          <li className="relative">         
          </li>
          {/* <!-- Profile menu --> */}
          <li>
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            ></button>    
          </li>
          {onClicklogOut()}
        </ul>
      </div>
    </header>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(StartupActions.logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
