//import libs
import React from "react";
import PropTypes from "prop-types";

// import components
import DashboardContainer from "../../Components/molecules/DashboardsContainer/DashboardContainer";

const propTypes = {
  children: PropTypes.node.isRequired,
};

function PrivateLayout(props) {
  return (
    <DashboardContainer
      {...props}
      routes={props.routes}
      role={props.role}
      authenticated={props.isAuthenticated}
    />
  );
}

PrivateLayout.propTypes = propTypes;

export default PrivateLayout;
