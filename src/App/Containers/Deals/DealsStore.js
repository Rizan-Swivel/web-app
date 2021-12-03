import React, { useEffect } from "react";
import DealsActions from "../../Stores/Deals/Actions";
import { useDispatch, useSelector } from "react-redux";
import StartupActions from "../../Stores/Startup/Actions";
import FileManagerActions from "../../Stores/FileManager/Actions"

const DealsStore = (Component) =>
  function Comp(props) {

        const dispatch = useDispatch();

        const dealsList = useSelector(state => state.deals.dealsList)
        const deal = useSelector(state => state.deals.deal)
        const selectedDealId = useSelector(state => state.deals.selectedDealId)
        const userId = useSelector(state => state.startup.user.userId)
        const userRole = useSelector(state => state.startup.role)
        const brandsList = useSelector(state => state.startup.brands)
        const categoryList = useSelector(state => state.startup.categories)
        const actionSuccess = useSelector(state => state.deals.success)
        const uploadedFiles = useSelector(state => state.fileManager.uploadedFiles)
        const dealDeleteSuccess = useSelector(state => state.deals.dealDeleteSuccess)
        const PendingDealData = useSelector(state => state.deals.PendingDealData)
        const pendingDealsList = useSelector(state => state.deals.pendingDealsList)
        const offerTypesList = useSelector(state => state.deals.offerTypesList)
        const combinedDealRequestsList = useSelector(state => state.deals.combinedDealRequestsList)
        const dealRequestsListForCombination = useSelector(state => state.deals.dealRequestsListForCombination)
        const summeryForDealRequestsListForCombination = useSelector(state => state.deals.summeryForDealRequestsListForCombination)

        const getProps = () => ({
            ...props,
            uploadedFiles,            
            dealDeleteSuccess,
            userRole,
            userId,
            actionSuccess,
            deal,
            dealsList,
            selectedDealId,
            brandsList,
            categoryList,
            PendingDealData,
            pendingDealsList,
            offerTypesList,
            combinedDealRequestsList,
            dealRequestsListForCombination,
            summeryForDealRequestsListForCombination,
            searchOnAllDeals: (data) => dispatch(DealsActions.searchOnAllDeals(data)),
            getAllDealsByMerchant: (data) => dispatch(DealsActions.getAllDealsByMerchant(data)),
            getDeal: (data) => dispatch(DealsActions.getDeal(data)),
            setSelectedDealId: (data) => dispatch(DealsActions.setSelectedDealId(data)),
            createDeal: (data) => dispatch(DealsActions.createDeal(data)),
            getCategories: (data) => dispatch(StartupActions.getCategories(data)),
            getBrands: (data) => dispatch(StartupActions.getBrands(data)),
            handleDealApproval: (data) => dispatch(DealsActions.handleDealApproval(data)),
            deleteDeal: (data) => dispatch(DealsActions.deleteDeal(data)),
            uploadFiles: (data) => dispatch(FileManagerActions.uploadFiles(data)),
            clearUploadedFilesData: () => dispatch(FileManagerActions.clearUploadedFilesData()),
            searchDealsForCategory: (data) => (dispatch(DealsActions.searchDealsForCategory(data))),
            searchDealsForBrand: (data) => (dispatch(DealsActions.searchDealsForBrand(data))),
            getPendingDealsList:(data)=>(dispatch(DealsActions.getPendingDealsList(data))),
            getDealByID:(data)=>(dispatch(DealsActions.getDealByID(data))),
            approvePendingDeal:(data)=>(dispatch(DealsActions.approvePendingDeal(data))),
            createOfferType: (data)=>(dispatch(DealsActions.createOfferType(data))),
            getAllOfferTypes: (data)=>(dispatch(DealsActions.getAllOfferTypes(data))),
            getCombinedDealRequestsList: (data)=>(dispatch(DealsActions.getCombinedDealRequestsList(data))),
            getDealRequestsListForCombination: (data)=>(dispatch(DealsActions.getDealRequestsListForCombination(data))),
            getSummeryForDealRequestsListForCombination: (data)=>(dispatch(DealsActions.getSummeryForDealRequestsListForCombination(data))),
            resetDealsState: ()=>(dispatch(DealsActions.resetDealsState()))
        })

    return <Component {...getProps()} />;
  };

export default DealsStore;
