import React, { Suspense, useEffect, useState } from "react";
import { Redirector, useQuery } from "../Navigators/Redirector";
import { Route } from "react-router-dom";


const PrivateRoute = ({ component: Component, role, props, ...rest }) => {

  const [renderComponent, setRenderomponent] = useState(null);

  let query = useQuery();
  useEffect(() => {
    let renderer = props.isAuthenticated ? ()=> {

      return (<Route {...props} {...rest} queryParams={query} component={() => <Component {...props} {...rest} />}/>)

  } : (
      setTimeout(() => {
        return (
          <Redirector {...rest} pathname={"/login"} state={props.location} />
        );
      }, 200)
    );
    setRenderomponent(renderer);
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {renderComponent && renderComponent}
    </Suspense>
  );
};

export default PrivateRoute;
