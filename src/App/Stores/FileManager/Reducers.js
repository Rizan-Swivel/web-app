import { INITIAL_STATE_FILE_MANAGER } from './InitialState';
import { createReducer } from 'reduxsauce';
import { FILE_MANAGER } from './Actions';


/**
 *
 * Reducers
 */

export const uploadFiles = (state, { data }) => ({
  ...state,
  files: data
});

export const uploadFilesSuccess = (state, { data }) => ({
  ...state,
    uploadedFiles: data
});

export const clearUploadedFilesData = (state) => {
    return {
        ...state,
        uploadedFiles: null
    }
};

export const clearUploadedFilesDataSuccess = (state) => {
    return {
        ...state,
        uploadedFiles: null
    }
};

export const getFiles = (state, { data }) => ({
  ...state,
  fileManager: data
})

export const getFilesSuccess = (state, { data }) => ({
  ...state,
  data
})

export const reducer = createReducer(INITIAL_STATE_FILE_MANAGER, {
    [FILE_MANAGER.UPLOAD_FILES]: uploadFiles,
    [FILE_MANAGER.UPLOAD_FILES_SUCCESS]: uploadFilesSuccess,
    [FILE_MANAGER.GET_FILES]: getFiles, 
    [FILE_MANAGER.GET_FILES_SUCCESS]: getFilesSuccess,
    [FILE_MANAGER.CLEAR_UPLOADED_FILES_DATA]: clearUploadedFilesData,
    [FILE_MANAGER.CLEAR_UPLOADED_FILES_DATA_SUCCESS]: clearUploadedFilesDataSuccess,

  });
  