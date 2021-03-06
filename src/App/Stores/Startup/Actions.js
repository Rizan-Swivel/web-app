import {createActions} from 'reduxsauce';

//javascrip actions as object

const {Types, Creators} = createActions({
  loadData: null,
  setUserData : ['user'],
  setRole : null,
  signInGoogle : ['token'],
  signInGoogleSuccess : ['data'],
  signInGoogleFailure : ['error'],
  signUpGoogle : ['token'],
  logOut : null,
  logOutSuccess :null,
  logOutFailure : ['error'],
  checkAuthenticated : null,
  loadDataSuccess: null,
  signInFacebook : ['token'],
  signInFacebookSuccess : ['data'],
  signInFacebookFailure : ['error'],
  signUpFacebook: ['token'],
  loadDataFailure: null,
  setNotificationCount: null,
  clearNotificationCount : null,
  clearNotifications : null,
  retryRequest: ['data'],
  login: ['obj'],
  loginSuccess: ['data'],
  loginFailure: ['error'],
  register: ['obj'],
  registerFailure: ['error'],
  addFcmtoken: ['token'],
  addFcmtokenSuccess: ['data'],
  addFcmtokenFailure: ['error'],
  getRoleSummary : null,
  getRoleSummaryFailure : ['error'],
  getRoleSummarySuccess : ['data'],
  getUserRoleSummary : ['data'],
  getUserRoleSummaryFailure : ['error'],
  getUserRoleSummarySuccess : ['data'],
  updateUserRole : ['data'],
  updateUserRoleFailure : ['error'],
  updateUserRoleSuccess : ['data'],
  deleteRole : ['data'],
  deleteRoleSuccess : ['data'],
  deleteRoleFailure : ['error'],
  getPermissions : null,
  getPermissionsSuccess : ['data'],
  getPermissionsFailure : ['error'],
  addRole : ['data'],
  addRoleSuccess : ['data'],
  addRoleFailure : ['error'],
  setRoleUpdateData : ['data'],
  updateRole : ['data','id'],
  updateRoleSuccess : ['data'],
  updateRoleFailure : ['error'],
  changeLanguage: ['data'],
  changeLanguageSuccess: ['data'],
  changeLanguageFailure: ['error'],
  getNewNotifications : ['data'],
  getNewNotificationsFailure : ['error'],
  getNewNotificationsSuccess : ['data'],
  deleteNotifications : ['notifications', 'data', 'deleteSlice'],
  deleteNotificationsFailure : ['error'],
  deleteNotificationsSuccess : ['data'],
  getCategories : ['data'],
  getCategoriesFailure : ['error'],
  getCategoriesSuccess : ['data'],
  getBrands : ['data'],
  getBrandsFailure : ['error'],
  getBrandsSuccess : ['data'],
  generateOTP : ['data'],
  generateOTPFailure : ['error'],
  generateOTPSuccess : ['data'],
  verifyOTP : ['data'],
  verifyOTPFailure : ['error'],
  verifyOTPSuccess : ['data'],
  merchantSignUp : ['data'],
  merchantSignUpFailure : ['error'],
  merchantSignUpSuccess : ['data'],
  makeRequest:['payload'],
  makeRequestFailed:['payload'],
  makeRequestSuccess:['payload'],
  notifySuccess: ['message'],
  notifyFailure: ['message'],
  resetStartupSuccess: [],
  resetOTPVerification: [],
  resetOTPVerificationSuccess: []
});

export const STARTUP = Types;
export default Creators;
