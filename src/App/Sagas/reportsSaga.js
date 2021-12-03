import { call, put } from "redux-saga/effects";
import REPORTSACTIONS from "../Stores/Reports/Actions";


export function* getAudienceReachDealForTopTen(api, action) {
  try {
    const response = yield call(api.getAudienceReachDealForTopTen, action.data);
    if (response.ok) {
      const respData = response.data.data;
      yield put(REPORTSACTIONS.getAudienceReachDealForTopTenSuccess(respData));
    }
  } catch (error) {
    yield put(REPORTSACTIONS.getAudienceReachDealForTopTenFailure(error));
  }
}

export function* getAudienceReachSummeryReportForDeals(api, action) {
  try {
    const response = yield call(api.getAudienceReachSummeryReportForDeals, action.data);
    if (response.ok) {
      const respData = response.data.data;
      yield put(REPORTSACTIONS.getAudienceReachSummeryReportForDealsSuccess(respData));
    }
  } catch (error) {
    yield put(REPORTSACTIONS.getAudienceReachSummeryReportForDealsFailure(error));
  }
}

export function* getAudienceReachDetailedReportForDeal(api, action) {
  try {
    const response = yield call(api.getAudienceReachDetailedReportForDeal, action.data);
    if (response.ok) {
      const respData = response.data.data;
      yield put(REPORTSACTIONS.getAudienceReachDetailedReportForDealSuccess(respData));
    }
  } catch (error) {
    yield put(REPORTSACTIONS.getAudienceReachDetailedReportForDealFailure(error));
  }
}

export function* getAudienceReachMerchentForTopTen(api, action) {
  try {
    const response = yield call(api.getAudienceReachMerchentForTopTen, action.data);
    if (response.ok) {
      const respData = response.data.data;
      yield put(REPORTSACTIONS.getAudienceReachMerchentForTopTenSuccess(respData));
    }
  } catch (error) {
    yield put(REPORTSACTIONS.getAudienceReachMerchentForTopTenFailure(error));
  }
}



export function* getAudienceReachSummeryReportForMerchents(api, action) {
  try {
    const response = yield call(api.getAudienceReachSummeryReportForMerchents, action.data);
    if (response.ok) {
      const respData = response.data.data;
      yield put(REPORTSACTIONS.getAudienceReachSummeryReportForMerchentsSuccess(respData));
    }
  } catch (error) {
    yield put(REPORTSACTIONS.getAudienceReachSummeryReportForMerchentsFailure(error));
  }
}

export function* getAudienceReachDetailedReportForMerchent(api, action) {
  try {
    const response = yield call(api.getAudienceReachDetailedReportForMerchent, action.data);
    if (response.ok) {
      const respData = response.data.data;
      yield put(REPORTSACTIONS.getAudienceReachDetailedReportForMerchent(respData));
    }
  } catch (error) {
    yield put(REPORTSACTIONS.getAudienceReachDetailedReportForMerchent(error));
  }
}