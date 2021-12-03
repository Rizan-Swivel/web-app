import React, { Suspense, useEffect, useState } from "react";
import { Redirector, useQuery } from "../Navigators/Redirector";
import { useLocation } from "react-router-dom";

const PublicRoutes = ({ component: Component, rest, ...props }) => {
  const [renderComponent, setRenderomponent] = useState(null);
  const { search } = useLocation();
  let query = useQuery();
  useEffect(() => {
    let renderer = !props.isAuthenticated ? (
      <Component {...props} queryParams={query} />
    ) : (
      <Redirector
        {...props}
        pathname={
          props.location.state && props.location.state.from
            ? `${props.location.state.from.pathname}${search ? search : ""}`
            : "/dashboard"
        }
        to={props.location}
      />
    );
    setRenderomponent(renderer);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {renderComponent && renderComponent}
    </Suspense>
  );
};

export default PublicRoutes;
