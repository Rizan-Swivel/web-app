import { INITIAL_STATE_REPORTS } from "./InitialState";
import { createReducer } from "reduxsauce";
import { REPORTS } from "./Actions";
import {INITIAL_STATE_DEALS} from "../Deals/InitialState";

export const getAudienceReachDealForTopTen = (state, { data }) => {
  return {
    ...state,
  };
};

export const getAudienceReachDealForTopTenSuccess = (state, { data }) => {
  return {
    ...state,
    dealReportsData: data,
    dealReportsDataMV:data,
  };
};

export const getAudienceReachDealForTopTenFailure = (state, { error }) => {
  return {
    ...state,
    error,
  };
};

export const getAudienceReachMerchentForTopTen = (state, { data }) => {
  return {
    ...state,
  };
};

export const getAudienceReachMerchentForTopTenSuccess = (state, { data }) => {
  return {
    ...state,
    merchantReportData: data,
  };
};

export const getAudienceReachMerchentForTopTenFailure = (state, { error }) =>{
  return {
    ...state,
    error,
  };
};

export const getAudienceReachSummeryReportForDeals  = (state) => ({
  ...state,
});

export const getAudienceReachSummeryReportForDealsSuccess = (state, { data }) => ({
  ...state,
  audienceReachSummeryReportForDeals: data,
});

export const getAudienceReachSummeryReportForDealsFailure = (state, { error }) => ({
  ...state,
  error,
});

export const getAudienceReachDetailedReportForDeal  = (state) => ({
  ...state,
});

export const getAudienceReachDetailedReportForDealSuccess = (state, { data }) => ({
  ...state,
  audienceReachDetailedReportForDeal: data,
});

export const getAudienceReachDetailedReportForDealFailure = (state, { error }) => ({
  ...state,
  error,
});

export const getAudienceReachSummeryReportForMerchents  = (state) => ({
  ...state,
});

export const getAudienceReachSummeryReportForMerchentsSuccess = (state, { data }) => ({
  ...state,
  audienceReachSummeryReportForMerchents: data,
  audienceReachSummeryReportForMerchentsMV:data
});

export const getAudienceReachSummeryReportForMerchentsFailure = (state, { error }) => ({
  ...state,
  error,
});

export const getAudienceReachDetailedReportForMerchent  = (state) => ({
  ...state,
});

export const getAudienceReachDetailedReportForMerchentSuccess = (state, { data }) => ({
  ...state,
  audienceReachDetailedReportForMerchent: data,
});

export const getAudienceReachDetailedReportForMerchentFailure = (state, { error }) => ({
  ...state,
  error,
});

export const resetReportsState = (state, { error }) => ({
  ...state,
});

export const resetDealsStateSuccess = (state, { error }) => ({
  ...INITIAL_STATE_DEALS,
});
export const resetMerchentsStateSuccess = (state, { error }) => ({
  ...INITIAL_STATE_REPORTS,
});

export const reducer = createReducer(INITIAL_STATE_REPORTS, {
  [ REPORTS.GET_AUDIENCE_REACH_DEAL_FOR_TOP_TEN ]: getAudienceReachDealForTopTen,
  [ REPORTS.GET_AUDIENCE_REACH_DEAL_FOR_TOP_TEN_SUCCESS ]: getAudienceReachDealForTopTenSuccess,
  [ REPORTS.GET_AUDIENCE_REACH_DEAL_FOR_TOP_TEN_FAILURE ]: getAudienceReachDealForTopTenFailure,
  
  [REPORTS.GET_AUDIENCE_REACH_MERCHENT_FOR_TOP_TEN]: getAudienceReachMerchentForTopTen,
  [REPORTS.GET_AUDIENCE_REACH_MERCHENT_FOR_TOP_TEN_SUCCESS]: getAudienceReachMerchentForTopTenSuccess,
  [REPORTS.GET_AUDIENCE_REACH_MERCHENT_FOR_TOP_TEN_FAILURE]: getAudienceReachMerchentForTopTenFailure,
  
  [ REPORTS.GET_AUDIENCE_REACH_SUMMERY_REPORT_FOR_DEALS ]: getAudienceReachSummeryReportForDeals,
  [ REPORTS.GET_AUDIENCE_REACH_SUMMERY_REPORT_FOR_DEALS_SUCCESS ]:getAudienceReachSummeryReportForDealsSuccess,
  [ REPORTS.GET_AUDIENCE_REACH_SUMMERY_REPORT_FOR_DEALS_FAILURE ]:getAudienceReachSummeryReportForDealsFailure,

  [ REPORTS.GET_AUDIENCE_REACH_DETAILED_REPORT_FOR_DEAL ]: getAudienceReachDetailedReportForDeal,
  [ REPORTS.GET_AUDIENCE_REACH_DETAILED_REPORT_FOR_DEAL_SUCCESS ]:getAudienceReachDetailedReportForDealSuccess,
  [ REPORTS.GET_AUDIENCE_REACH_DETAILED_REPORT_FOR_DEAL_FAILURE ]:getAudienceReachDetailedReportForDealFailure,

  [ REPORTS.GET_AUDIENCE_REACH_SUMMERY_REPORT_FOR_MERCHENTS ]: getAudienceReachSummeryReportForMerchents,
  [ REPORTS.GET_AUDIENCE_REACH_SUMMERY_REPORT_FOR_MERCHENTS_SUCCESS ]:getAudienceReachSummeryReportForMerchentsSuccess,
  [ REPORTS.GET_AUDIENCE_REACH_SUMMERY_REPORT_FOR_MERCHENTS_FAILURE ]:getAudienceReachSummeryReportForMerchentsFailure,

  [ REPORTS.GET_AUDIENCE_REACH_DETAILED_REPORT_FOR_MERCHENT ]: getAudienceReachDetailedReportForMerchent,
  [ REPORTS.GET_AUDIENCE_REACH_DETAILED_REPORT_FOR_MERCHENT_SUCCESS ]:getAudienceReachDetailedReportForMerchentSuccess,
  [ REPORTS.GET_AUDIENCE_REACH_DETAILED_REPORT_FOR_MERCHENT_FAILURE ]:getAudienceReachDetailedReportForMerchentFailure,
});
