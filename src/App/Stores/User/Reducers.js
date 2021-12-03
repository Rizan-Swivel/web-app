import { INITIAL_STATE_USERS } from "./InitialState";
import { createReducer } from "reduxsauce";
import { USERS } from "./Actions";

export const getAllUsers = (state, { data }) => {
  return {
    ...state,
  };
};

export const getAllUsersSuccess = (state, { data }) => {
  return {
    ...state,
    userList: data,
  };
};

export const getAllUsersFailure = (state, { error }) => {
  return {
    ...state,
    error,
  };
};

export const updateUserPassword = (state, { data }) => {
  return {
    ...state,
  };
};

export const getAllMobileUsers = (state, { data }) => {
  return {
    ...state,
  };
};

export const getAllMobileUsersSuccess = (state, { data }) => {
  return {
    ...state,
    userList: data,
  };
};

export const getAllMobileUsersFailure = (state, { error }) => {
  return {
    ...state,
    error,
  };
};

// export const updateUserPasswordSuccess = (state, { data }) => ({
//     ...state,
//     uploadedFiles: data
// });
//
// export const updateUserPasswordFailure = (state) => {
//     return {
//         ...state,
//         uploadedFiles: null
//     }
// };

export const reducer = createReducer(INITIAL_STATE_USERS, {
  [USERS.GET_ALL_USERS]: getAllUsers,
  [USERS.GET_ALL_USERS_SUCCESS]: getAllUsersSuccess,
  [USERS.GET_ALL_USERS_FAILURE]: getAllUsersFailure,
  [USERS.UPDATE_USER_PASSWORD]: updateUserPassword,
  [USERS.GET_ALL_MOBILE_USERS]: getAllMobileUsers,
  [USERS.GET_ALL_MOBILE_USERS_SUCCESS]: getAllMobileUsersSuccess,
  [USERS.GET_ALL_MOBILE_USERS_FAILURE]: getAllMobileUsersFailure,
  // [USERS.UPDATE_USER_PASSWORD_SUCCESS]: updateUserPasswordSuccess,
  // [USERS.UPDATE_USER_PASSWORD_FAILURE]: updateUserPasswordFailure,
});
