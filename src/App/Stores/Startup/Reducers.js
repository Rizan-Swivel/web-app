import { INITIAL_STATE } from "./InitialState";
import { createReducer } from "reduxsauce";
import { STARTUP } from "./Actions";
import publicRoutes from "../../Navigators/NavRoutes/PublicRoutes";
import adminRoutes from "../../Navigators/NavRoutes/AdminRoutes";
import merchantRoutes from "../../Navigators/NavRoutes/MerchantRoutes";

export const loadData = (state) => ({
  ...state,
});

export const setUserData = (state, { user }) => ({
  ...state,
  user,
});

export const signInGoogle = (state, { token }) => ({
  ...state,
});

export const signUpGoogle = (state, { token }) => ({
  ...state,
});

export const signInGoogleSuccess = (state, { data }) => {

  console.log("signInGoogleSuccess", data)
  return{
    ...state,
    success: "Login Success",
    user: data,
  }

};

export const signInGoogleFailure = (state, { error }) => ({
  ...state,
});

const createRouter = (state) => {
  var role = state.role;
  var permissions = role && role.permissions ? role.permissions : [];

  var generatedStack = [];
  var userRouter = adminRoutes.map((route, i) => {
    var element = permissions.find(
      (element) => element.resourceId === route.id
    );

    if (element) {
      generatedStack.push({ ...route, roles: [role.name] });
    }
  });
  const router = [...publicRoutes, ...generatedStack];

  return router;
};

export const setRole = (state) => {
  localStorage.setItem('user', JSON.stringify(state.user))
  return ({
    ...state,
    isAuthenticated: !!localStorage.getItem("user"),
    role: state.user.role ? state.user.role.name : "",
    permissions: state.user.role,
    userRoutes: state.role == "ADMIN" ? [...adminRoutes] : [...merchantRoutes], //Else Merchant Routes <<Temporary Code>>
    // userRoutes: createRouter(state.user),
    //remove the "if" condition after testing
  })
};

export const logOutSuccess = (state) => ({
  ...state,
  ...INITIAL_STATE,
});
export const logOutFailure = (state, { error }) => {
  localStorage.removeItem("user");
  return {
    ...state,
    isAuthenticated: false,
    user: {},
  };
};

export const checkAuthenticated = (state) => ({
  ...state,
  isAuthenticated:
    !!localStorage.getItem("user") && localStorage.getItem("user") !== "null",
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
  role:
    !!localStorage.getItem("user") && localStorage.getItem("user") !== "null"
      ? JSON.parse(localStorage.getItem("user")).role.name
      : null,
  userRoutes:
    !!localStorage.getItem("user") && localStorage.getItem("user") !== "null"
      ? state.role == "ADMIN"
        ? [...adminRoutes, ...publicRoutes]
        : [...merchantRoutes, ...publicRoutes] //line 98 and 99 should be replaced to => << createRouter(JSON.parse(localStorage.getItem("user"))) >> => once permissions are sent from backend
      : [...adminRoutes, ...merchantRoutes, ...publicRoutes],
});

export const signUpFacebook = (state, { token }) => ({
  ...state,
});

export const signInFacebook = (state, { token }) => ({
  ...state,
});

export const signInFacebookSuccess = (state, { data }) => ({
  ...state,
  user: data,
});

export const signInFacebookFailure = (state, { error }) => ({
  ...state,
});

export const setNotificationCount = (state) => ({
  ...state,
  notificationCount: state.notificationCount + 1,
});

export const clearNotifications = (state) => ({
  ...state,
  notificationCount: 4,
});

export const clearNotificationCount = (state) => ({
  ...state,
  notificationCount: 0,
});

export const retryRequest = (state, { data }) => ({
  ...state,
  user: data,
});

export const login = (state, { obj }) => ({
  ...state,
});

export const loginSuccess = (state, { data }) => {

  console.log("loginSuccess")
  return(
      {
        ...state,
        success: data,
      }
  )
}

export const loginFailure = (state, { error }) => ({
  ...state,
  error,
});

export const register = (state, { obj }) => ({
  ...state,
});

export const registerFailure = (state, { error }) => ({
  ...state,
});

export const addFCM = (state, { token }) => ({
  ...state,
});

export const addFCMSuccess = (state, { data }) => ({
  ...state,
});

export const addFCMFailure = (state, { error }) => ({
  ...state,
});

export const getRoleSummary = (state) => ({
  ...state,
});

export const getRoleSummarySuccess = (state, { data }) => ({
  ...state,
  roleSummary: data,
});

export const getRoleSummaryFailure = (state, { error }) => ({
  ...state,
  error,
});

export const getUserRoleSummary = (state, { data }) => ({
  ...state,
});

export const getUserRoleSummarySuccess = (state, { data }) => ({
  ...state,
  userRoleSummary: data,
});

export const getUserRoleSummaryFailure = (state, { error }) => ({
  ...state,
  error,
});

export const updateUserRole = (state, { data }) => ({
  ...state,
});

export const updateUserRoleSuccess = (state, { data }) => ({
  ...state,
});

export const updateUserRoleFailure = (state, { error }) => ({
  ...state,
  error,
});

export const deleteRole = (state, { data }) => ({
  ...state,
});

export const deleteRoleSuccess = (state, { data }) => ({
  ...state,
});

export const deleteRoleFailure = (state, { error }) => ({
  ...state,
  error,
});

export const getPermissions = (state) => ({
  ...state,
});

export const getPermissionsSuccess = (state, { data }) => ({
  ...state,
  ALlpermissions: data,
});

export const getPermissionsFailure = (state, { error }) => ({
  ...state,
  error,
});

export const getNewNotifications = (state) => ({
  ...state,
});

export const getNewNotificationsSuccess = (state, { data }) => ({
  ...state,
  newNotifications: data,
});

export const getNewNotificationsFailure = (state, { error }) => ({
  ...state,
  error,
});

export const deleteNotifications = (state, { data }) => ({
  ...state,
});

export const deleteNotificationsSuccess = (state, { data }) => ({
  ...state,
});

export const deleteNotificationsFailure = (state, { error }) => ({
  ...state,
  error,
});

export const getCategories = (state) => ({
  ...state,
});

export const getCategoriesSuccess = (state, { data }) => ({
  ...state,
  categories : data
});

export const getCategoriesFailure = (state, { error }) => ({
  ...state,
  error
});

export const getBrands = (state) => ({
  ...state,
});

export const getBrandsSuccess = (state, { data }) => ({
  ...state,
  brands : data
});

export const getBrandsFailure = (state, { error }) => ({
  ...state,
  error
});

export const generateOTP = (state) => ({
  ...state,
});

export const generateOTPSuccess = (state, { data }) => ({
  ...state,
  OTPGeneration: data
});

export const generateOTPFailure = (state, { error }) => ({
  ...state,
  OTPGeneration: error
});

export const verifyOTP = (state) => ({
  ...state,
});

export const verifyOTPSuccess = (state, { data }) => ({
  ...state,
  OTPVerification: data
});

export const verifyOTPFailure = (state, { error }) => ({
  ...state,
  OTPVerification: error
});

export const merchantSignUp = (state) => ({
  ...state,
});

export const merchantSignUpSuccess = (state, { data }) => ({
  ...state,
  merchantSignUpResp: data
});

export const merchantSignUpFailure = (state, { error }) => ({
  ...state,
  merchantSignUpResp: error
});

export const addRole = (state,{data}) => ({
  ...state,
});

export const addRoleSuccess = (state, { data }) => ({
  ...state,
});

export const addRoleFailure = (state, { error }) => ({
  ...state,
  error,
});

export const setRoleUpdateData = (state, { data }) => ({
  ...state,
  roleUpdata: data,
});

export const updateRole = (state, { data, id }) => ({
  ...state,
});

export const updateRoleSuccess = (state, { data }) => ({
  ...state,
});

export const updateRoleFailure = (state, { error }) => ({
  ...state,
  error,
});

export const changeLanguage = (state, { data }) => ({
  ...state,
  language: data,
});

export const changeLanguageSuccess = (state, { data }) => ({
  ...state,
  language: data,
});

export const changeLanguageFailure = (state, { error }) => ({
  ...state,
  error: error,
});

export const makeRequest = (state, { payload }) => ({
  ...state,
});
export const makeRequestSuccess = (state, { payload }) => ({
  ...state,
});
export const makeRequestFailure = (state, { payload }) => ({
  ...state,
});

export const notifySuccess = (state, { payload }) => ({
  ...state,
  successMessage: payload
});

export const notifyFailure = (state, { payload }) => ({
  ...state,
  errorMessage: payload
});

export const resetStartupSuccess = (state, { payload }) => ({
  ...state,
  successMessage: null
});

export const resetOTPVerification = (state, { payload }) => ({
  ...state,
});

export const resetOTPVerificationSuccess = (state, { payload }) => ({
  ...state,
  OTPVerification: null
});

export const reducer = createReducer(INITIAL_STATE, {
  [STARTUP.LOAD_DATA]: loadData,
  [STARTUP.SET_USER_DATA]: setUserData,
  [STARTUP.SET_ROLE]: setRole,
  [STARTUP.SIGN_IN_GOOGLE]: signInGoogle,
  [STARTUP.SIGN_IN_GOOGLE_SUCCESS]: signInGoogleSuccess,
  [STARTUP.SIGN_IN_GOOGLE_FAILURE]: signInGoogleFailure,
  [STARTUP.SIGN_UP_GOOGLE]: signUpGoogle,
  [STARTUP.LOG_OUT_SUCCESS]: logOutSuccess,
  [STARTUP.LOG_OUT_FAILURE]: logOutFailure,
  [STARTUP.CHECK_AUTHENTICATED]: checkAuthenticated,
  [STARTUP.SIGN_IN_FACEBOOK]: signInFacebook,
  [STARTUP.SIGN_IN_FACEBOOK_SUCCESS]: signInFacebookSuccess,
  [STARTUP.SIGN_IN_FACEBOOK_FAILURE]: signInFacebookFailure,
  [STARTUP.SIGN_UP_FACEBOOK]: signUpFacebook,
  [STARTUP.SET_NOTIFICATION_COUNT]: setNotificationCount,
  [STARTUP.CLEAR_NOTIFICATION_COUNT]: clearNotificationCount,
  [STARTUP.CLEAR_NOTIFICATIONS]: signUpFacebook,
  [STARTUP.RETRY_REQUEST]: retryRequest,
  [STARTUP.LOGIN]: login,
  [STARTUP.LOGIN_SUCCESS]: loginSuccess,
  [STARTUP.LOGIN_FAILURE]: loginFailure,
  [STARTUP.REGISTER]: register,
  [STARTUP.REGISTER_FAILURE]: registerFailure,
  [STARTUP.ADD_FCMTOKEN]: addFCM,
  [STARTUP.ADD_FCMTOKEN_SUCCESS]: addFCMSuccess,
  [STARTUP.ADD_FCMTOKEN_FAILURE]: addFCMFailure,
  [STARTUP.GET_ROLE_SUMMARY]: getRoleSummary,
  [STARTUP.GET_ROLE_SUMMARY_FAILURE]: getRoleSummaryFailure,
  [STARTUP.GET_ROLE_SUMMARY_SUCCESS]: getRoleSummarySuccess,
  [STARTUP.GET_USER_ROLE_SUMMARY]: getUserRoleSummary,
  [STARTUP.GET_USER_ROLE_SUMMARY_FAILURE]: getUserRoleSummaryFailure,
  [STARTUP.GET_USER_ROLE_SUMMARY_SUCCESS]: getUserRoleSummarySuccess,
  [STARTUP.UPDATE_USER_ROLE]: updateUserRole,
  [STARTUP.UPDATE_USER_ROLE_FAILURE]: updateUserRoleFailure,
  [STARTUP.UPDATE_USER_ROLE_SUCCESS]: updateUserRoleSuccess,
  [STARTUP.DELETE_ROLE]: deleteRole,
  [STARTUP.DELETE_ROLE_SUCCESS]: deleteRoleSuccess,
  [STARTUP.DELETE_ROLE_FAILURE]: deleteRoleFailure,
  [STARTUP.GET_PERMISSIONS]: getPermissions,
  [STARTUP.GET_PERMISSIONS_SUCCESS]: getPermissionsSuccess,
  [STARTUP.GET_PERMISSIONS_FAILURE]: getPermissionsFailure,
  [STARTUP.ADD_ROLE]: addRole,
  [STARTUP.ADD_ROLE_SUCCESS]: addRoleSuccess,
  [STARTUP.ADD_ROLE_FAILURE]: addRoleFailure,
  [STARTUP.SET_ROLE_UPDATE_DATA]: setRoleUpdateData,
  [STARTUP.UPDATE_ROLE]: updateRole,
  [STARTUP.UPDATE_ROLE_SUCCESS]: updateRoleSuccess,
  [STARTUP.UPDATE_ROLE_FAILURE]: updateRoleFailure,
  [STARTUP.CHANGE_LANGUAGE]: changeLanguage,
  [STARTUP.CHANGE_LANGUAGE_SUCCESS]: changeLanguageSuccess,
  [STARTUP.CHANGE_LANGUAGE_FAILURE]: changeLanguageFailure,
  [STARTUP.GET_NEW_NOTIFICATIONS]: getNewNotifications,
  [STARTUP.GET_NEW_NOTIFICATIONS_SUCCESS]: getNewNotificationsSuccess,
  // [STARTUP.GET_NOTIFICATIONS_FAILURE]: getNewNotificationsFailure,  
  [STARTUP.GET_CATEGORIES]: getCategories,
  [STARTUP.GET_CATEGORIES_SUCCESS]: getCategoriesSuccess,
  [STARTUP.GET_CATEGORIES_FAILURE]: getCategoriesFailure,
  [STARTUP.GET_BRANDS]: getBrands,
  [STARTUP.GET_BRANDS_SUCCESS]: getBrandsSuccess,
  [STARTUP.GET_BRANDS_FAILURE]: getBrandsFailure,
  [STARTUP.GENERATE_OTP]: generateOTP,
  [STARTUP.GENERATE_OTP_SUCCESS]: generateOTPSuccess,
  [STARTUP.GENERATE_OTP_FAILURE]: generateOTPFailure,
  [STARTUP.VERIFY_OTP]: verifyOTP,
  [STARTUP.VERIFY_OTP_SUCCESS]: verifyOTPSuccess,
  [STARTUP.VERIFY_OTP_FAILURE]: verifyOTPFailure,
  [STARTUP.MERCHANT_SIGN_UP]: merchantSignUp,
  [STARTUP.MERCHANT_SIGN_UP_SUCCESS]: merchantSignUpSuccess,
  [STARTUP.MERCHANT_SIGN_UP_FAILURE]: merchantSignUpFailure,
  [STARTUP.DELETE_NOTIFICATIONS]: deleteNotifications,
  [STARTUP.DELETE_NOTIFICATIONS_SUCCESS]: deleteNotificationsSuccess,
  [STARTUP.DELETE_NOTIFICATIONS_FAILURE]: deleteNotificationsFailure,
  [STARTUP.MAKE_REQUEST]: makeRequest,
  [STARTUP.MAKE_REQUEST_SUCCESS]: makeRequestSuccess,
  [STARTUP.MAKE_REQUEST_FAILED]: makeRequestFailure,
  [STARTUP.NOTIFY_SUCCESS]: notifySuccess,
  [STARTUP.NOTIFY_FAILURE]: notifyFailure,
  [STARTUP.RESET_STARTUP_SUCCESS]: resetStartupSuccess,
  [STARTUP.RESET_OTP_VERIFICATION]: resetOTPVerification,
  [STARTUP.RESET_OTP_VERIFICATION_SUCCESS]: resetOTPVerificationSuccess,
});
