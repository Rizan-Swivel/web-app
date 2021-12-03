import { put, call } from "redux-saga/effects";
import PROFILEACTIONS from "../Stores/Profile/Actions";

//Saga For User Profile

export function* userProfile(api, action) {
  try {
    const response = yield call(api.getUserProfile);
    if (response.ok) {
      yield put(PROFILEACTIONS.userProfileSuccess(response.data.data));
    } else {
      yield put(PROFILEACTIONS.userProfileFailure(response.error));
    }
  } catch (err) {
    yield put(PROFILEACTIONS.userProfileFailure(err));
  }
}

export function* userProfileUpdate(api, action) {
  try {
    const response = yield call(api.updateUserProfile, action.data);
    if (response.ok) {
      yield put(PROFILEACTIONS.userProfileUpdateSuccess(response.data.data));
    } else {
      yield put(PROFILEACTIONS.userProfileUpdateFailure(response.error));
    }
  } catch (err) {
    yield put(PROFILEACTIONS.userProfileUpdateFailure(err));
  }
}
