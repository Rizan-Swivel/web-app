import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ReportsActions from "../../Stores/Reports/Actions";

const ReportStore = Component  =>
    function Comp(props) {
        const dispatch = useDispatch();
        const audienceReachSummeryReportForDeals = useSelector(state => state.deals.audienceReachSummeryReportForDeals)
        const audienceReachDetailedReportForDeal = useSelector(state => state.deals.audienceReachDetailedReportForDeal)
        const userRole = useSelector(state => state.startup.role)
        const userId = useSelector(state => state.startup.user.userId)
        const dealReportsData = useSelector(state => state.reports.dealReportsData)
        const merchantReportData = useSelector(state => state.reports.merchantReportData)
        const audienceReachSummeryReportForMerchents = useSelector(state => state.reports.audienceReachSummeryReportForMerchents)
        const audienceReachDetailedReportForMerchent = useSelector(state => state.reports.audienceReachDetailedReportForMerchent)
        const dealReportsDataMV =useSelector(state=> state.reports.dealReportsDataMV)
        const audienceReachSummeryReportForMerchentsMV =useSelector(state=> state.reports.audienceReachSummeryReportForMerchentsMV)

        const getProps = () => ({
            ...props,
            userId,
            userRole,
            dealReportsData,
            merchantReportData,
            dealReportsDataMV,
            audienceReachSummeryReportForMerchentsMV,        
            audienceReachSummeryReportForDeals,
            audienceReachDetailedReportForDeal,
            audienceReachSummeryReportForMerchents,
            audienceReachDetailedReportForMerchent,
            getAudienceReachSummeryReportForDeals: (data) => dispatch(ReportsActions.getAudienceReachSummeryReportForDeals(data)),
            getAudienceReachDetailedReportForDeal: (data) => dispatch(ReportsActions.getAudienceReachDetailedReportForDeal(data)),
            resetDealsState: ()=>(dispatch(ReportsActions.resetDealsState())),
            getAudienceReachDealForTopTen: (data) => dispatch(ReportsActions.getAudienceReachDealForTopTen(data)),
            getAudienceReachMerchentForTopTen: (data) => dispatch(ReportsActions.getAudienceReachMerchentForTopTen(data)),
            getAudienceReachSummeryReportForMerchents: (data) => dispatch(ReportsActions.getAudienceReachSummeryReportForMerchents(data)),
            getAudienceReachDetailedReportForMerchent: (data) => dispatch(ReportsActions.getAudienceReachDetailedReportForMerchent(data)),
        })
     
    return <Component {...getProps()} />;
  };

export default  ReportStore;
