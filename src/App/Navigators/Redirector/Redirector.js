import React from "react";
import { Redirect } from "react-router-dom";
import { useQuery } from "./";

export const Redirector = (props) => {
  let query = useQuery();
  return (
    <Redirect
      {...props}
      to={{
        pathname: props.pathname,
        state: { from: props.state, queryParams: query },
      }}
    />
  );
};
export default Redirector;
