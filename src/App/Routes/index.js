// import libs
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, withRouter, useLocation, useHistory, Redirect } from "react-router-dom";
import { messaging } from "../init-fcm";
// import components
import PrivateRoute from "./Private";
import PublicRoute from "./Public";
import Layout from "../Navigators/Layout";
import StartupActions from "../Stores/Startup/Actions";
import { history } from "../Stores/CreateStore";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectError } from "../Stores/Error/Selectors";
import _ from "lodash";


function Routes(props) {
  const { t } = useTranslation();
  let history = useHistory();
  let location = useLocation();
  const error = useSelector(selectError)

  const getPermisssion = () => {
    messaging
      .requestPermission()
      .then(async function () {
        getToken();
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
  };

  const getToken = () => {
    messaging
      .getToken()
      .then((currentToken) => {
        if (currentToken) {

          if (props.isAuthenticated) {
            props.addToken(currentToken);
          }
        } else {
          // Show permission request.

          console.log(
            "No Instance ID token available. Requests permission to generate one."
          );
          getPermisssion();

          // Show permission UI.
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
      });
  };

  useEffect(()=> {

        if(error.show === true) {
          toast[error.type](error.message);
        }
  }, [error])

  useEffect(() => {
    props.checkAuthenticated();
   
    if (props.isAuthenticated) {
      getToken();
    }
  }, [props.isAuthenticated]);

  return (

    <Router history={history}>
      <Layout {...props} routes={props.routes} t={t}>
      <ToastContainer theme="colored" />
        <Switch>
          {props.routes &&
            props.routes.map((route, i) => {
              if (route.auth) {
                return (
                  <PrivateRoute
                    key={i}
                    {...route}
                    role={props.role}
                    props={props}
                    t={t}
                  />
                );
              }
              return <PublicRoute key={i} {...route} {...props} t={t} />;
            })}
        </Switch>
      </Layout>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  count: state.startup.notificationCount,
  routes: state.startup.userRoutes,
  role: state.startup.role,
  isAuthenticated: state.startup.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  // setNotificationCount: () => dispatch(StartupActions.setNotificationCount()),
  checkAuthenticated: () => dispatch(StartupActions.checkAuthenticated()),
  addToken: (token) => dispatch(StartupActions.addFcmtoken(token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
