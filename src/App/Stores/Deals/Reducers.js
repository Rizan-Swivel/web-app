import { INITIAL_STATE_DEALS } from "./InitialState";
import { createReducer } from "reduxsauce";
import { DEALS } from "./Actions";

/**
 *
 * User Profile Reducer
 */

export const searchOnAllDeals = (state) => ({
  ...state,
});

export const searchOnAllDealsSuccess = (state, { data }) => ({
  ...state,
  dealsList: data,
});

export const searchOnAllDealsFailure = (state, { error }) => ({
  ...state,
  error,
});

export const getAllDealsByMerchant = (state) => ({
  ...state,
});

export const getAllDealsByMerchantSuccess = (state, { data }) => ({
  ...state,
  dealsList: data,
});

export const getAllDealsByMerchantFailure = (state, { error }) => ({
  ...state,
  error,
});

export const getDeal = (state) => ({
  ...state,
});

export const getDealSuccess = (state, { data }) => ({
  ...state,
  deal: data,
});

export const getDealFailure = (state, { error }) => ({
  ...state,
  error,
});

export const setSelectedDealId = (state, { data }) => ({
  ...state,
  selectedDealId: data,
});

export const setSelectedDealIdSuccess = (state, { data }) => ({
  ...state,
  selectedDealId: data,
});

export const setSelectedDealIdFailure = (state, { error }) => ({
  ...state,
  error,
});

export const createDeal = (state) => ({
  ...state,
});

export const createDealSuccess = (state, { data }) => ({
  ...state,
  deal: data,
});

export const createDealFailure = (state, { error }) => ({
  ...state,
  error,
});

export const handleDealApproval = (state) => ({
  ...state,
});

export const handleDealApprovalSuccess = (state, { data }) => ({
  ...state,
  success: data,
});

export const handleDealApprovalFailure = (state, { error }) => ({
  ...state,
  error,
});

export const deleteDeal = (state) => ({
  ...state,
});

export const deleteDealSuccess = (state, { data }) => ({
  ...state,
  dealDeleteSuccess: true,
});

export const deleteDealFailure = (state, { error }) => ({
  ...state,
  dealDeleteSuccess: false,
  error,
});

 export const searchDealsForCategory = (state) => ({
   ...state,
 });

 export const searchDealsForCategorySuccess = (state, { data }) => ({
   ...state,
   dealsList: data,
 });

 export const searchDealsForCategoryFailure = (state, { error }) => ({
   ...state,
   error,
 });

 export const searchDealsForBrand = (state) => ({
   ...state,
 });

 export const searchDealsForBrandSuccess = (state, { data }) => ({
   ...state,
   dealsList: data,
 });

 export const searchDealsForBrandFailure = (state, { error }) => ({
   ...state,
   error,
 });

 export const getPendingDealsList =(state)=>({
    ...state
});

export const getPendingDealsListSuccess =(state, {data})=>({
     ...state,
     pendingDealsList: data,
});

 export const getPendingDealsListFailure =(state, { error})=>({
   ...state,
   error,

 });

 export const approvePendingDeal = ( state, { data } )=>{
  return {
      ...state
  }
}

export const approvePendingDealSuccess = ( state, { data } )=>(
  {
      ...state,
      PendingDealData: data
  }
)

export const approvePendingDealFailure = ( state, { error } )=>{
  return {
      ...state,
      error: error
  }
}

export const getDealByID  = (state) => ({
  ...state,
});

export const getDealByIDSuccess = (state, { data }) => ({
  ...state,
  PendingDealData: data,
});

export const getDealByIDFailure = (state, { error }) => ({
  ...state,
  error,
});

export const createOfferType  = (state) => ({
    ...state,
});

export const createOfferTypeSuccess = (state, { data }) => ({
    ...state,
    success: data,
});

export const createOfferTypeFailure = (state, { error }) => ({
    ...state,
    error,
});

export const getAllOfferTypes  = (state) => ({
    ...state,
});

export const getAllOfferTypesSuccess = (state, { data }) => ({
    ...state,
    offerTypesList: data,
});

export const getAllOfferTypesFailure = (state, { error }) => ({
    ...state,
    error,
});

export const getCombinedDealRequestsList  = (state) => ({
    ...state,
});

export const getCombinedDealRequestsListSuccess = (state, { data }) => ({
    ...state,
    combinedDealRequestsList: data,
});

export const getCombinedDealRequestsListFailure = (state, { error }) => ({
    ...state,
    error,
});

export const getDealRequestsListForCombination  = (state) => ({
    ...state,
});

export const getDealRequestsListForCombinationSuccess = (state, { data }) => ({
    ...state,
    dealRequestsListForCombination: data,
});

export const getDealRequestsListForCombinationFailure = (state, { error }) => ({
    ...state,
    error,
});

export const getSummeryForDealRequestsListForCombination  = (state) => ({
    ...state,
});

export const getSummeryForDealRequestsListForCombinationSuccess = (state, { data }) => ({
    ...state,
    summeryForDealRequestsListForCombination: data,
});

export const getSummeryForDealRequestsListForCombinationFailure = (state, { error }) => ({
    ...state,
    error,
});

export const resetDealsState = (state, { error }) => ({
    ...state,
});

export const resetDealsStateSuccess = (state, { error }) => ({
    ...INITIAL_STATE_DEALS,
});



export const reducer = createReducer(INITIAL_STATE_DEALS, {
  [DEALS.SEARCH_ON_ALL_DEALS]: searchOnAllDeals,
  [DEALS.SEARCH_ON_ALL_DEALS_SUCCESS]: searchOnAllDealsSuccess,
  [DEALS.SEARCH_ON_ALL_DEALS_FAILURE]: searchOnAllDealsFailure,
  [DEALS.GET_ALL_DEALS_BY_MERCHANT]: getAllDealsByMerchant,
  [DEALS.GET_ALL_DEALS_BY_MERCHANT_SUCCESS]: getAllDealsByMerchantSuccess,
  [DEALS.GET_ALL_DEALS_BY_MERCHANT_FAILURE]: getAllDealsByMerchantFailure,
  [DEALS.GET_DEAL]: getDeal,
  [DEALS.GET_DEAL_SUCCESS]: getDealSuccess,
  [DEALS.GET_DEAL_FAILURE]: getDealFailure,
  [DEALS.SET_SELECTED_DEAL_ID]: setSelectedDealId,
  [DEALS.SET_SELECTED_DEAL_ID_SUCCESS]: setSelectedDealIdSuccess,
  [DEALS.SET_SELECTED_DEAL_ID_FAILURE]: setSelectedDealIdFailure,
  [DEALS.CREATE_DEAL]: createDeal,
  [DEALS.CREATE_DEAL_SUCCESS]: createDealSuccess,
  [DEALS.CREATE_DEAL_FAILURE]: createDealFailure,
  [DEALS.HANDLE_DEAL_APPROVAL]: handleDealApproval,
  [DEALS.HANDLE_DEAL_APPROVAL_SUCCESS]: handleDealApprovalSuccess,
  [DEALS.HANDLE_DEAL_APPROVAL_FAILURE]: handleDealApprovalFailure,
  [DEALS.DELETE_DEAL]: deleteDeal,
  [DEALS.DELETE_DEAL_SUCCESS]: deleteDealSuccess,
  [DEALS.DELETE_DEAL_FAILURE]: deleteDealFailure,
  [DEALS.SEARCH_DEALS_FOR_CATEGORY]: searchDealsForCategory,
  [DEALS.SEARCH_DEALS_FOR_CATEGORY_SUCCESS]: searchDealsForCategorySuccess,
  [DEALS.SEARCH_DEALS_FOR_CATEGORY_FAILURE]: searchDealsForCategoryFailure,
  [DEALS.SEARCH_DEALS_FOR_BRAND]: searchDealsForBrand,
  [DEALS.SEARCH_DEALS_FOR_BRAND_SUCCESS]: searchDealsForBrandSuccess,
  [DEALS.SEARCH_DEALS_FOR_BRAND_FAILURE]: searchDealsForBrandFailure,
  [DEALS.GET_PENDING_DEALS_LIST]:getPendingDealsList,
  [DEALS.GET_PENDING_DEALS_LIST_SUCCESS]:getPendingDealsListSuccess,
  [DEALS.GET_PENDING_DEALS_LIST_FAILURE]:getPendingDealsListFailure,
  [DEALS.GET_DEAL_BY_ID]: getDealByID,
  [DEALS.GET_DEAL_BY_ID_SUCCESS]: getDealByIDSuccess,
  [DEALS.GET_DEAL_BY_ID_FAILURE]: getDealByIDFailure,
  [DEALS.APPROVE_PENDING_DEAL]:approvePendingDeal,
  [DEALS.APPROVE_PENDING_DEAL_SUCCESS]:approvePendingDealSuccess,
  [DEALS.APPROVE_PENDING_DEAL_FAILURE]:approvePendingDealFailure,
  [DEALS.CREATE_OFFER_TYPE]:createOfferType,
  [DEALS.CREATE_OFFER_TYPE_SUCCESS]:createOfferTypeSuccess,
  [DEALS.CREATE_OFFER_TYPE_FAILURE]:createOfferTypeFailure,
  [DEALS.GET_ALL_OFFER_TYPES]:getAllOfferTypes,
  [DEALS.GET_ALL_OFFER_TYPES_SUCCESS]:getAllOfferTypesSuccess,
  [DEALS.GET_ALL_OFFER_TYPES_FAILURE]:getAllOfferTypesFailure,
  [DEALS.GET_COMBINED_DEAL_REQUESTS_LIST]:getCombinedDealRequestsList,
  [DEALS.GET_COMBINED_DEAL_REQUESTS_LIST_SUCCESS]:getCombinedDealRequestsListSuccess,
  [DEALS.GET_COMBINED_DEAL_REQUESTS_LIST_FAILURE]:getCombinedDealRequestsListFailure,
  [DEALS.GET_DEAL_REQUESTS_LIST_FOR_COMBINATION]:getDealRequestsListForCombination,
  [DEALS.GET_DEAL_REQUESTS_LIST_FOR_COMBINATION_SUCCESS]:getDealRequestsListForCombinationSuccess,
  [DEALS.GET_DEAL_REQUESTS_LIST_FOR_COMBINATION_FAILURE]:getDealRequestsListForCombinationFailure,
  [DEALS.GET_SUMMERY_FOR_DEAL_REQUESTS_LIST_FOR_COMBINATION]:getSummeryForDealRequestsListForCombination,
  [DEALS.GET_SUMMERY_FOR_DEAL_REQUESTS_LIST_FOR_COMBINATION_SUCCESS]:getSummeryForDealRequestsListForCombinationSuccess,
  [DEALS.GET_SUMMERY_FOR_DEAL_REQUESTS_LIST_FOR_COMBINATION_FAILURE]:getSummeryForDealRequestsListForCombinationFailure,
  [DEALS.RESET_DEALS_STATE]:resetDealsState,
  [DEALS.RESET_DEALS_STATE_SUCCESS]:resetDealsStateSuccess,

});
