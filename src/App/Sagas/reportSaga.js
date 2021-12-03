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