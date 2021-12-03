import { combineReducers } from "redux";
import configureStore from "./CreateStore";
import rootSaga from "../Sagas/";
import storage from "redux-persist/lib/storage";
import { reducer as Startup } from "./Startup/Reducers";
import { reducer as Profile } from "./Profile/Reducers";
import { reducer as Merchants } from "./Merchants/Reducers";
import { reducer as Category } from "./Category/Reducers";
import { reducer as User } from "./User/Reducers";
import { reducer as Brand } from "./Brands/Reducers";
import { reducer as Deals } from "./Deals/Reducers";
import { reducer as FileManager } from "./FileManager/Reducers";
//import {reducer as Report } from "./Report/Reducers"
import {reducer as Reports } from "./Reports/Reducers"
import {reducer as Error } from "./Error/Reducers"
import { STARTUP } from "./Startup/Actions";
import { connectRouter } from "connected-react-router";
import { history } from "./CreateStore";

export default () => {
  const appReducer = combineReducers({
    startup: Startup,
    profile: Profile,
    merchants: Merchants,
    deals: Deals,
    categories: Category,
    brands: Brand,
    users: User,
    fileManager: FileManager,
   // report: Report,
    reports: Reports,
    error : Error,
    router: connectRouter(history),
  });

  const rootReducer = (state, action) => {
    if (action.type === STARTUP.LOG_OUT_SUCCESS) {
      storage.removeItem("persist:root");

      state = undefined;
    }

    return appReducer(state, action);
  };

  return configureStore(rootReducer, rootSaga);
};
