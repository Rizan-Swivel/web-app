import { takeLatest, all } from "redux-saga/effects";
import { STARTUP } from "../Stores/Startup/Actions";
import { PROFILE } from "../Stores/Profile/Actions";
import { DEALS } from "../Stores/Deals/Actions";
import { CATEGORIES } from "../Stores/Category/Actions";
import { BRANDS } from "../Stores/Brands/Actions";
import { USERS } from "../Stores/User/Actions";
import {FILE_MANAGER} from "../Stores/FileManager/Actions";
import { MERCHANTS } from "../Stores/Merchants/Actions";
import { REPORTS } from "../Stores/Reports/Actions";

import {
  startup,
  signInGoogle,
  signUpGoogle,
  logOutUser,
  signInSuccess,
  loadData,
  signUpFacebook,
  signInFacebook,
  login,
  register,
  addFCMTOKEN,
  getRoleSummary,
  getUserRoleSummary,
  updateUserRole,
  deleteROle,
  getAllPermissions,
  addRole,
  updateRolePermissions,
  changeLanguage,
  getNewNotifications,
  deleteNotifications,
  getCategories,
  getBrands,
  generateOTP,
  verifyOTP,
  merchantSignUp,
  resetStartupSuccess,
  resetOTPVerification
} from "./startupSaga";
import API from "../Services/Api";
import { userProfile, userProfileUpdate } from "./profileSaga";
import { getAllCategories,getCategory, resetCategoryState } from "./categorySaga";
import { getAllBrands,getBrand, resetBrandsState } from "./brandSaga";
import { getAllUsers, updateUserPassword,getAllMobileUsers } from "./userSaga";
import {
    getDeal,
    getAllDealsByMerchant,
    searchOnAllDeals,
    selectedDealId,
    createDeal,
    handleDealApproval,
    deleteDeal,
    searchDealsForCategory,
    searchDealsForBrand,
    getPendingDealsList,
    approvePendingDeal,
    getDealByID,
    createOfferType,
    getAllOfferTypes,
    getCombinedDealRequestsList,
    getDealRequestsListForCombination,
    getSummeryForDealRequestsListForCombination,
    resetDealsState
} from "./dealsSaga";
import {
    getMerchant,
    getAllMerchantsByCategory,
    updateMerchant,
    setSelectedMerchantId,
    getPendingMerchantsList,
    getAllMerchants,
    handleMerchantApproval,
    getMerchantSummery,
    searchMerchantsForCategory,
    searchMerchantsForBrand,
    handleMerchantBlocking,
    updateMerchantBasicInfo,
    updateMerchantContactInfo,
    updateMerchantBusinessInfo,
    getContactInfoByMerchantId,
    getBusinessInfoByMerchantId,
    updateCategoriesAndBrandsForMerchant,
    getBrandsCategoriesMappingByMerchant,
    updateMerchantEmail,
    updateMerchantMobileNo,
    ApproveMerchant,
    getPendingBusinessInfoList,
    getPendingContactInfoList,
    approvePendingBusinessInfo,
    approvePendingContactInfo,
    getPendingBusinessDetails,
    getPendingContactDetails,
    resetMerchantState
 } from "./merchantsSaga";
import {uploadFiles, downloadFile, deleteFile, getFiles, clearUploadedFilesData  } from "./fileManagerSaga"
import {
  getAudienceReachSummeryReportForDeals, 
  getAudienceReachDetailedReportForDeal,
  getAudienceReachMerchentForTopTen,
  getAudienceReachDealForTopTen, 
  getAudienceReachSummeryReportForMerchents, 
  getAudienceReachDetailedReportForMerchent 
} from "./reportsSaga"
//import {getAudienceReachDealForTopTen, getAudienceReachMerchentForTopTen} from "./reportSaga"

const api = API.create();

export default function* root() {
  yield all([takeLatest(STARTUP.LOAD_DATA, startup, api)]);
  yield all([takeLatest(STARTUP.SIGN_IN_GOOGLE, signInGoogle, api)]);
  yield all([takeLatest(STARTUP.SIGN_UP_GOOGLE, signUpGoogle, api)]);
  yield all([takeLatest(STARTUP.SIGN_IN_GOOGLE_SUCCESS, signInSuccess, api)]);
  yield all([takeLatest(STARTUP.LOG_OUT, logOutUser, api)]);
  yield all([takeLatest(PROFILE.USER_PROFILE, userProfile, api)]);
  yield all([takeLatest(PROFILE.USER_PROFILE_UPDATE, userProfileUpdate, api)]);
  yield all([takeLatest(STARTUP.LOAD_DATA, loadData, api)]);
  yield all([takeLatest(STARTUP.REGISTER, register, api)]);
  yield all([takeLatest(STARTUP.LOGIN, login, api)]);
  yield all([takeLatest(STARTUP.SIGN_UP_FACEBOOK, signUpFacebook, api)]);
  yield all([takeLatest(STARTUP.SIGN_IN_FACEBOOK, signInFacebook, api)]);
  yield all([takeLatest(STARTUP.ADD_FCMTOKEN, addFCMTOKEN, api)]);
  yield all([takeLatest(STARTUP.GET_ROLE_SUMMARY, getRoleSummary, api)]);
  yield all([takeLatest(STARTUP.GET_USER_ROLE_SUMMARY, getUserRoleSummary, api),]);
  yield all([takeLatest(STARTUP.UPDATE_USER_ROLE, updateUserRole, api)]);
  yield all([takeLatest(STARTUP.DELETE_ROLE, deleteROle, api)]);
  yield all([takeLatest(STARTUP.GET_PERMISSIONS, getAllPermissions, api)]);
  yield all([takeLatest(STARTUP.ADD_ROLE, addRole, api)]);
  yield all([takeLatest(STARTUP.UPDATE_ROLE, updateRolePermissions, api)]);
  yield all([takeLatest(STARTUP.GET_NEW_NOTIFICATIONS, getNewNotifications, api),]);
  yield all([takeLatest(STARTUP.DELETE_NOTIFICATIONS, deleteNotifications, api),]);
  yield all([takeLatest(STARTUP.CHANGE_LANGUAGE, changeLanguage, api)]);
  yield all([takeLatest(STARTUP.GET_CATEGORIES, getCategories, api)]);
  yield all([takeLatest(STARTUP.GET_BRANDS, getBrands, api)]);
  yield all([takeLatest(STARTUP.GENERATE_OTP, generateOTP, api)]);
  yield all([takeLatest(STARTUP.VERIFY_OTP, verifyOTP, api)]);
  yield all([takeLatest(STARTUP.MERCHANT_SIGN_UP, merchantSignUp, api)]);
  yield all([takeLatest(DEALS.SEARCH_ON_ALL_DEALS, searchOnAllDeals, api)]);
  yield all([takeLatest(DEALS.GET_DEAL, getDeal, api)]);
  yield all([takeLatest(DEALS.GET_ALL_DEALS_BY_MERCHANT, getAllDealsByMerchant, api),]);
  yield all([takeLatest(DEALS.SEARCH_DEALS_FOR_CATEGORY, searchDealsForCategory, api),]);
  yield all([takeLatest(DEALS.SEARCH_DEALS_FOR_BRAND, searchDealsForBrand, api)]);
  yield all([takeLatest(DEALS.SET_SELECTED_DEAL_ID, selectedDealId, api)]);
  yield all([takeLatest(DEALS.CREATE_DEAL, createDeal, api)]);
  yield all([takeLatest(DEALS.HANDLE_DEAL_APPROVAL, handleDealApproval, api)]);
  yield all([takeLatest(DEALS.DELETE_DEAL, deleteDeal, api)]);
  yield all([takeLatest(MERCHANTS.APPROVE_MERCHANT, ApproveMerchant, api)]);
  yield all([takeLatest(MERCHANTS.SET_SELECTED_MERCHANT_ID, setSelectedMerchantId, api),]);
  yield all([takeLatest(MERCHANTS.GET_MERCHANT, getMerchant, api)]);
  yield all([takeLatest(MERCHANTS.GET_ALL_MERCHANTS_BY_CATEGORY, getAllMerchantsByCategory, api)]);
  yield all([takeLatest(MERCHANTS.SEARCH_MERCHANTS_FOR_BRAND, searchMerchantsForBrand, api)]);
  yield all([takeLatest(MERCHANTS.SEARCH_MERCHANTS_FOR_CATEGORY, searchMerchantsForCategory, api)]);
  yield all([takeLatest(MERCHANTS.UPDATE_MERCHANT, updateMerchant, api)]);
  yield all([takeLatest(MERCHANTS.GET_PENDING_MERCHANTS_LIST, getPendingMerchantsList, api)]);
  yield all([takeLatest(MERCHANTS.GET_ALL_MERCHANTS, getAllMerchants, api)]);
  yield all([takeLatest(MERCHANTS.HANDLE_MERCHANT_APPROVAL, handleMerchantApproval, api)]);
  yield all([takeLatest(MERCHANTS.GET_MERCHANT_SUMMERY, getMerchantSummery, api)]);
  yield all([takeLatest(MERCHANTS.HANDLE_MERCHANT_BLOCKING, handleMerchantBlocking, api)]);
  yield all([takeLatest(MERCHANTS.UPDATE_MERCHANT_BASIC_INFO, updateMerchantBasicInfo, api)]);
  yield all([takeLatest(MERCHANTS.UPDATE_MERCHANT_BUSINESS_INFO, updateMerchantBusinessInfo, api)]);
  yield all([takeLatest(MERCHANTS.UPDATE_MERCHANT_CONTACT_INFO,updateMerchantContactInfo, api)]);
  yield all([takeLatest(MERCHANTS.GET_CONTACT_INFO_BY_MERCHANT_ID,getContactInfoByMerchantId, api)]);
  yield all([takeLatest(MERCHANTS.GET_BUSINESS_INFO_BY_MERCHANT_ID,getBusinessInfoByMerchantId, api)]);
  yield all([takeLatest(CATEGORIES.GET_ALL_CATEGORIES, getAllCategories, api)]);
  yield all([takeLatest(CATEGORIES.GET_CATEGORY, getCategory, api)]);
  yield all([takeLatest(BRANDS.GET_ALL_BRANDS, getAllBrands, api)]);
  yield all([takeLatest(BRANDS.GET_BRAND, getBrand, api)]);
  yield all([takeLatest(USERS.GET_ALL_USERS, getAllUsers, api)]);
  yield all([takeLatest(FILE_MANAGER.UPLOAD_FILES, uploadFiles, api)]);
  yield all([takeLatest(FILE_MANAGER.CLEAR_UPLOADED_FILES_DATA, clearUploadedFilesData, api)]);
  yield all([takeLatest(USERS.UPDATE_USER_PASSWORD, updateUserPassword, api)]);
  yield all([takeLatest(MERCHANTS.UPDATE_CATEGORIES_AND_BRANDS_FOR_MERCHANT, updateCategoriesAndBrandsForMerchant, api)]);
  yield all([takeLatest(MERCHANTS.GET_BRANDS_CATEGORIES_MAPPING_BY_MERCHANT, getBrandsCategoriesMappingByMerchant, api)]);
  yield all([takeLatest(MERCHANTS.UPDATE_MERCHANT_EMAIL, updateMerchantEmail, api)]);
  yield all([takeLatest(MERCHANTS.UPDATE_MERCHANT_MOBILE_NO, updateMerchantMobileNo, api)]);
  yield all([takeLatest(MERCHANTS.GET_PENDING_BUSINESS_INFO_LIST,getPendingBusinessInfoList,api)]);
  yield all([takeLatest(MERCHANTS.GET_PENDING_CONTACT_INFO_LIST,getPendingContactInfoList,api)]);
  yield all([takeLatest(DEALS.GET_PENDING_DEALS_LIST,getPendingDealsList,api)]);
  yield all([takeLatest(MERCHANTS.APPROVE_PENDING_BUSINESS_INFO,approvePendingBusinessInfo,api)]);
  yield all([takeLatest(MERCHANTS.APPROVE_PENDING_CONTACT_INFO,approvePendingContactInfo,api)]);
  yield all([takeLatest(MERCHANTS.GET_PENDING_BUSINESS_DETAILS, getPendingBusinessDetails, api)]);
  yield all([takeLatest(MERCHANTS.GET_PENDING_CONTACT_DETAILS, getPendingContactDetails,api)]);
  yield all([takeLatest(DEALS.GET_DEAL_BY_ID,getDealByID,api)]);
  yield all([takeLatest(DEALS.APPROVE_PENDING_DEAL,approvePendingDeal,api)]);
  yield all([takeLatest(STARTUP.RESET_OTP_VERIFICATION,resetOTPVerification,api)]);
  yield all([takeLatest(STARTUP.RESET_STARTUP_SUCCESS, resetStartupSuccess,api)]);
  yield all([takeLatest(USERS.GET_ALL_MOBILE_USERS, getAllMobileUsers, api)]);
  yield all([takeLatest(DEALS.CREATE_OFFER_TYPE, createOfferType, api)]);
  yield all([takeLatest(DEALS.GET_ALL_OFFER_TYPES, getAllOfferTypes, api)]);
  yield all([takeLatest(DEALS.GET_COMBINED_DEAL_REQUESTS_LIST, getCombinedDealRequestsList, api)]);
  yield all([takeLatest(DEALS.GET_DEAL_REQUESTS_LIST_FOR_COMBINATION, getDealRequestsListForCombination, api)]);
  yield all([takeLatest(DEALS.GET_SUMMERY_FOR_DEAL_REQUESTS_LIST_FOR_COMBINATION, getSummeryForDealRequestsListForCombination, api)]);
  yield all([takeLatest(DEALS.RESET_DEALS_STATE, resetDealsState, api)]);
  yield all([takeLatest(BRANDS.RESET_BRANDS_STATE, resetBrandsState, api)]);
  yield all([takeLatest(CATEGORIES.RESET_CATEGORY_STATE, resetCategoryState, api)]);
  yield all([takeLatest(MERCHANTS.RESET_MERCHANT_STATE, resetMerchantState, api)]);
  yield all([takeLatest(REPORTS.GET_AUDIENCE_REACH_SUMMERY_REPORT_FOR_DEALS, getAudienceReachSummeryReportForDeals, api)]);
  yield all([takeLatest(REPORTS.GET_AUDIENCE_REACH_DETAILED_REPORT_FOR_DEAL, getAudienceReachDetailedReportForDeal, api)]);
  yield all([takeLatest(REPORTS.GET_AUDIENCE_REACH_DEAL_FOR_TOP_TEN, getAudienceReachDealForTopTen, api)]);
  yield all([takeLatest(REPORTS.GET_AUDIENCE_REACH_MERCHENT_FOR_TOP_TEN, getAudienceReachMerchentForTopTen, api)]);
  yield all([takeLatest(REPORTS.GET_AUDIENCE_REACH_SUMMERY_REPORT_FOR_MERCHENTS, getAudienceReachSummeryReportForMerchents, api)]);
  yield all([takeLatest(REPORTS.GET_AUDIENCE_REACH_DETAILED_REPORT_FOR_MERCHENT, getAudienceReachDetailedReportForMerchent, api)]);
}
