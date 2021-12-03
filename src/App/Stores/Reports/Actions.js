import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  getAudienceReachDealForTopTen: ["data"],
  getAudienceReachDealForTopTenSuccess: ["data"],
  getAudienceReachDealForTopTenFailure: ["error"],

  getAudienceReachSummeryReportForDeals: ["data"],
  getAudienceReachSummeryReportForDealsSuccess: ["data"],
  getAudienceReachSummeryReportForDealsFailure: ["error"],

  getAudienceReachDetailedReportForDeal: ["data"],
  getAudienceReachDetailedReportForDealSuccess: ["data"],
  getAudienceReachDetailedReportForDealFailure: ["error"],

  getAudienceReachMerchentForTopTen: ["data"],
  getAudienceReachMerchentForTopTenSuccess: ["data"],
  getAudienceReachMerchentForTopTenFailure: ["error"],
  
  resetDealsState: [],
  resetDealsStateSuccess: [],

  getAudienceReachDetailedReportForMerchent: ["data"],
  getAudienceReachDetailedReportForMerchentSuccess: ["data"],
  getAudienceReachDetailedReportForMerchentFailure: ["error"],

  getAudienceReachSummeryReportForMerchents: ["data"],
  getAudienceReachSummeryReportForMerchentsSuccess: ["data"],
  getAudienceReachSummeryReportForMerchentsFailure: ["error"],
});

export const REPORTS = Types;
export default Creators;
