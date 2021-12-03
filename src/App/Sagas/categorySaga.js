import { call, put } from "redux-saga/effects";
import CATEGORYACTIONS from "../Stores/Category/Actions";

export function* getAllCategories(api, action) {
  try {
    const response = yield call(api.getCategories, action.data);
    if (response.ok) {
      const respData = response.data.data;
      yield put(CATEGORYACTIONS.getAllCategoriesSuccess(respData));
    }
  } catch (error) {
    yield put(CATEGORYACTIONS.getAllCategoriesFailure(error));
  }
}

export function* getCategory(api, action) {
  try {
    const response = yield call(api.getCategory, action.data);
   if (response.ok) {
     const respData = response.data.data;
      yield put(CATEGORYACTIONS.getCategorySuccess(respData));
    }
  } catch (error) {
    yield put(CATEGORYACTIONS.getCategoryFailure(error));
  }
}

export function* resetCategoryState(api, action) {
  try {
    yield put(CATEGORYACTIONS.resetCategoryStateSuccess());
  } catch (Error) {
  }
}