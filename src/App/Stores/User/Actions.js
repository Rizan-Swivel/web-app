import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getAllUsers: ["data"],
  getAllUsersSuccess: ["data"],
  getAllUsersFailure: ["error"],
  updateUserPassword: ['data'],

  getAllMobileUsers:["data"],
  getAllMobileUsersSuccess: ["data"],
  getAllMobileUsersFailure: ["error"],
  // updateUserPasswordSuccess: ['data'],
  // updateUserPasswordFailure: ['error'],
});

export const USERS = Types;
export default Creators;
