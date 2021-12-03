import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  uploadFiles: ['data'],
  uploadFilesSuccess: ['data'],
  uploadFilesFailure: ['error'],
  getFiles: ['data'],
  getFilesSuccess: ['data'],
  getFilesFailure: ['error'],
  deleteFile:['data'],
  deleteFileSuccess: ['data'],
  deleteFailure: ['error'],
  downloadFile:['data'],
  downloadFileSuccess: ['data'],
  downloadFailure: ['error'],
  clearUploadedFilesData: ['data'],
  clearUploadedFilesDataSuccess: ['data'],
});

export const FILE_MANAGER = Types;
export default Creators;
