import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  setError: ["error"],
  resetError : [null]
});

export const ErrorType = Types;
export default Creators;
