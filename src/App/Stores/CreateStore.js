import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import { routerMiddleware } from "connected-react-router";
import logger from "redux-logger";
import { PersistConfig } from "../Config";
import { createBrowserHistory } from "history";

/**
 * This import defaults to localStorage for web and AsyncStorage for react-native.
 *
 * Keep in mind this storage *is not secure*. Do not use it to store sensitive information
 * (like API tokens, private and sensitive data, etc.).
 *
 * If you need to store sensitive information, use redux-persist-sensitive-storage.
 * @see https://github.com/CodingZeal/redux-persist-sensitive-storage
 */

export const history = createBrowserHistory();

//const browserService = createBrowserHistory()
// const redirect = (path, state = {}) => history.push(path, state)
// const back = () => history.back()
//
// export {
//   redirect,
//   back
// }

const persistConfig = PersistConfig;

export default (rootReducer, rootSaga) => {
  const middleware = [];
  const enhancers = [];

  // Connect the sagas to the redux store
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  enhancers.push(applyMiddleware(...middleware));
  enhancers.push(applyMiddleware(logger));
  enhancers.push(applyMiddleware(routerMiddleware(history)));

  // Redux persist
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

  const store = createStore(persistedReducer, composeEnhancers(...enhancers));
  const persistor = persistStore(store);

  // Kick off the root saga
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
