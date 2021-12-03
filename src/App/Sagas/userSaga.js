import { call, put } from "redux-saga/effects";
import USERACTIONS from "../Stores/User/Actions";


export function* getAllUsers(api, action) {
  try {
    const response = yield call(api.getAllUsers, action.data);
    if (response.ok) {
      const respData = response.data.data;
      yield put(USERACTIONS.getAllUsersSuccess(respData));
    }
  } catch (error) {
    yield put(USERACTIONS.getAllUsersFailure(error));
  }
}

export function* getAllMobileUsers(api, action) {
  try {
    const response = yield call(api.getAllMobileUsers, action.data);
    if (response.ok) {
      const respData = response.data.data;
      yield put(USERACTIONS.getAllMobileUsersSuccess(respData));
    }
  } catch (error) {
    yield put(USERACTIONS.getAllMobileUsersFailure(error));
  }
}

export function* updateUserPassword(api, action) {

  try {
    const response = yield call(api.updateUserPassword(action.data))

    if(response.ok){
      //notify success
    }
  }catch (e) {

    //notify failure
  }
}