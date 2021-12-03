import React, { Component, useEffect } from "react";
import { useSelector, useDispatch} from "react-redux"
import MerchantsActions  from "../../Stores/Merchants/Actions";
import StartupActions, {STARTUP} from "../../Stores/Startup/Actions";
import FileManagerActions from "../../Stores/FileManager/Actions";
import UserActions from "../../Stores/User/Actions"
import {resetMerchantState} from "../../Stores/Merchants/Reducers";

const MerchantsStore = Component =>
    function Comp(props){
        console.log("merchent store props ", props )
        const dispatch = useDispatch();

        const userId = useSelector( state => state.startup.user?.userId )
        const merchantsList = useSelector( state => state.merchants.merchantsList)
        const merchant = useSelector( state => state.merchants.merchant)
        const categoryList = useSelector( state => state.startup.categories)
        const brandList = useSelector( state => state.startup.brands)
        const OTPVerification = useSelector( state => state.startup.OTPVerification)
        const OTPGeneration = useSelector( state => state.startup.OTPGeneration)
        const merchantSummery = useSelector( state => state.merchants.merchantSummery)
        const userRole = useSelector(state => state.startup.role)
        const merchantSignUpResp = useSelector(state => state.startup.merchantSignUp)
        const uploadedFiles = useSelector(state => state.fileManager.uploadedFiles)
        const merchantBusinessInfo = useSelector(state => state.merchants.merchantBusinessInfo)
        const merchantContactInfo = useSelector(state => state.merchants.merchantContactInfo)
        const brandsCategoriesMapping = useSelector(state => state.merchants.brandsCategoriesMapping)
        const merchantsListToApprove= useSelector(state=>state.merchants.merchantsListToApprove)
        const pendingBusinessInfoList= useSelector(state=>state.merchants.pendingBusinessInfoList)
        const pendingContactInfoList= useSelector(state=>state.merchants.pendingContactInfoList)
        const pendingBusinessData = useSelector(state=>state.merchants.pendingBusinessData)
        const PendingContactData = useSelector(state=>state.merchants.PendingContactData)

        const getProps = () => ({
            ...props,            
            userId,
            userRole,
            merchantsList,
            merchant,
            categoryList,
            brandList,
            OTPVerification,
            OTPGeneration,
            merchantSummery,
            merchantSignUpResp,
            uploadedFiles,
            merchantBusinessInfo,
            merchantContactInfo,
            brandsCategoriesMapping,            
            merchantsListToApprove,
            pendingBusinessInfoList,
            pendingContactInfoList,
            pendingBusinessData,
            PendingContactData,
            getAllMerchantsByCategory: (data) => (dispatch( MerchantsActions.getAllMerchantsByCategory(data))),
            searchMerchantsForBrand: (data) => (dispatch( MerchantsActions.searchMerchantsForBrand(data))),
            searchMerchantsForCategory: (data) => (dispatch( MerchantsActions.searchMerchantsForCategory(data) )),
            getMerchant: (data) => (dispatch(MerchantsActions.getMerchant(data))),
            updateMerchant: (data) => dispatch(MerchantsActions.updateMerchant(data)),
            getCategoryList: (data) => {dispatch(StartupActions.getCategories(data));},
            getBrandsList: (data) => dispatch(StartupActions.getBrands(data)),
            merchantSignUp: (data) => dispatch(StartupActions.merchantSignUp(data)),
            generateOTP: (data) => dispatch(StartupActions.generateOTP(data)),
            verifyOTP: (data) => dispatch(StartupActions.verifyOTP(data)),
            getPendingMerchantsList: (data) => { dispatch(MerchantsActions.getPendingMerchantsList(data))},
            getAllMerchants: (data) => (dispatch( MerchantsActions.getAllMerchants(data))),
            handleMerchantApproval: (data) => (dispatch( MerchantsActions.handleMerchantApproval(data) )),
            getMerchantSummery: (data) => (dispatch(MerchantsActions.getMerchantSummery(data))),
            handleMerchantBlocking: (data) => (dispatch(MerchantsActions.handleMerchantBlocking(data))),
            ApproveMerchant:(data)=>(dispatch(MerchantsActions.ApproveMerchant(data))),
            getPendingBusinessInfoList:(data) => {dispatch(MerchantsActions.getPendingBusinessInfoList(data))},
            getPendingContactInfoList:(data) => {dispatch(MerchantsActions.getPendingContactInfoList(data))},
            getPendingBusinessDetails:(data) => {dispatch(MerchantsActions.getPendingBusinessDetails(data))},
            approvePendingBusinessInfo:(data) => {dispatch(MerchantsActions.approvePendingBusinessInfo(data))},
            getPendingContactDetails:(data) => {dispatch(MerchantsActions.getPendingContactDetails(data))},
            approvePendingContactInfo:(data) => {dispatch(MerchantsActions.approvePendingContactInfo(data))},
            updateMerchantBusinessInfo: (data) => (dispatch(MerchantsActions.updateMerchantBusinessInfo(data))),
            updateMerchantBasicInfo: (data) => (dispatch(MerchantsActions.updateMerchantBasicInfo(data))),
            updateMerchantContactInfo: (data) => (dispatch(MerchantsActions.updateMerchantContactInfo(data))),
            getBusinessInfoByMerchantId: (data) => (dispatch(MerchantsActions.getBusinessInfoByMerchantId(data))),
            getContactInfoByMerchantId: (data) => (dispatch(MerchantsActions.getContactInfoByMerchantId(data))),
            uploadFiles: (data) => dispatch(FileManagerActions.uploadFiles(data)),
            clearUploadedFilesData: () => dispatch(FileManagerActions.clearUploadedFilesData()),
            updateUserPassword: (data) => dispatch(UserActions.updateUserPassword(data)),
            updateCategoriesAndBrandsForMerchant: (data) => dispatch(MerchantsActions.updateCategoriesAndBrandsForMerchant(data)),
            getBrandsCategoriesMappingByMerchant: (data) => dispatch(MerchantsActions.getBrandsCategoriesMappingByMerchant(data)),
            updateMerchantEmail: (data) => dispatch(MerchantsActions.updateMerchantEmail(data)),
            updateMerchantMobileNo: (data) => dispatch(MerchantsActions.updateMerchantMobileNo(data)),
            resetOTPVerification: () => dispatch(StartupActions.resetOTPVerification()),
            resetMerchantState: () => dispatch(MerchantsActions.resetMerchantState())
        })
        return <Component {...getProps()}/>
}
export default MerchantsStore;