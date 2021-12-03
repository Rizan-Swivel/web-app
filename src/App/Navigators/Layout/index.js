// import libs
import React from "react";
import { connect } from "react-redux";

// import components
import PublicLayout from "./Public";
import PrivateLayout from "./Private";

const Layout = (props) => {
  return props.isAuthenticated ? (
    <PrivateLayout {...props}>{props.children}</PrivateLayout>
  ) : (
    <PublicLayout {...props}>{props.children}</PublicLayout>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
