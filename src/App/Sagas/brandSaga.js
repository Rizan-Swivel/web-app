import { call, put } from "redux-saga/effects";
import BRANDACTIONS from "../Stores/Brands/Actions";
import {brand} from "../Services/mockData"; //importing the mock data


export function* getAllBrands(api, action) {
  try {
    const response = yield call(api.getBrands, action.data);
    if (response.ok) {
      const respData = response.data.data;
      yield put(BRANDACTIONS.getAllBrandsSuccess(respData));
    }
  } catch (error) {
    yield put(BRANDACTIONS.getAllBrandsFailure(error));
  }
}
export function* getBrand(api, action) {
  try {
   const response = yield call(api.getBrand, action.data);
   if (response.ok) {
     const respData = response.data.data;
      yield put(BRANDACTIONS.getBrandSuccess(respData));
    }
  } catch (error) {
    yield put(BRANDACTIONS.getBrandFailure(error));
  }
}

export function* resetBrandsState(api, action) {
    try {
        yield put(BRANDACTIONS.resetBrandsStateSuccess());
    } catch (error) {}
}
