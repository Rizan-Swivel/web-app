import { put, call, select } from "redux-saga/effects";
import FILEMANAGERACTIONS from "../Stores/FileManager/Actions";

//Saga For File Manager

export function* uploadFiles(api, action) {
  try {
    setUploadFileHeaders(api)
    const response = yield call(api.uploadFiles, action);
    if (response.ok) {
      removeUploadFileHeaders(api)
      yield put(FILEMANAGERACTIONS.uploadFilesSuccess(response.data.data.files));
    } else {

      removeUploadFileHeaders(api)
      yield put(FILEMANAGERACTIONS.uploadFilesFailure(response.error));
    }
  } catch (err) {
    yield put(FILEMANAGERACTIONS.uploadFilesFailure(err));
  }
} 

export function* getFiles(api, action) {
  try {
    api.setXAPIKeyHeader()
    const response = yield call(api.getFiles, action);
    if (response.ok) {
      api.removeXAPIKeyHeader();
     
      yield put(FILEMANAGERACTIONS.getFilesSuccess(response.data.data));
    } else {
      api.removeXAPIKeyHeader();
      yield put(FILEMANAGERACTIONS.getFilesFailure(response.error));
    }
  } catch (err) {
    yield put(FILEMANAGERACTIONS.getFilesFailure(err));
  }
}


export function* deleteFile(api, action) {
  try {
    let state = yield select();
    api.setUserIdHeader(state.startup.user.userId);
    api.setXAPIKeyHeader()
    const response = yield call(api.deleteFile, action.data);
    if (response.ok) {
      yield put(FILEMANAGERACTIONS.deleteFileSuccess(response.data.data));
    } else {
      yield put(FILEMANAGERACTIONS.deleteFailure(response.error));
    }
  } catch (err) {
    yield put(FILEMANAGERACTIONS.deleteFailure(err));
  }
}

export function* downloadFile(api, action) {
  try {
    let state = yield select();
    api.setUserIdHeader(state.startup.user.userId);
    api.setXAPIKeyHeader()
    api.setContentTypeHeader("application/json")
    const response = yield call(api.downloadFile, action.data);
    if (response.ok) {
      yield put(FILEMANAGERACTIONS.downloadFileSuccess(response.data.data));
    } else {
      yield put(FILEMANAGERACTIONS.downloadFailure(response.error));
    }
  } catch (err) {
    yield put(FILEMANAGERACTIONS.downloadFailure(err));
  }
}





export function* clearUploadedFilesData(api, action) {
  try {

    yield put(FILEMANAGERACTIONS.clearUploadedFilesDataSuccess());

  } catch (err) {
    console.log(err)
  }
}

function setUploadFileHeaders(api){
  api.setContentTypeHeader("multipart/form-data")
  api.setXAPIKeyHeader()
}

function removeUploadFileHeaders(api){
  api.removeXAPIKeyHeader();
  api.removeContentTypeHeader()
  api.setContentTypeHeader("application/json")
}