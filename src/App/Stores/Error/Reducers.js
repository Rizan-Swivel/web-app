import { INITIAL_STATE_BRANDS } from "./InitialState";
import { createReducer } from "reduxsauce";
import { ErrorType } from "./Actions";

export const setErrorReducer = (state, { error }) => {
  return {
    ...state,
    error  : error
  };
};

export const resetErrorReducer = (state, { data }) => {
  return {
    ...state,
    error : { 
       message : "",
       show : false,
       type : ""
    }
  };
};


export const reducer = createReducer(INITIAL_STATE_BRANDS, {
  [ErrorType.SET_ERROR]: setErrorReducer,
  [ErrorType.RESET_ERROR]: resetErrorReducer
});
