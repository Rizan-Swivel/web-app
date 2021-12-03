import React from "react";
import { Provider } from "react-redux";
import createStore from "./Stores/";
import { PersistGate } from "redux-persist/lib/integration/react";
import { ConnectedRouter } from "connected-react-router";
import Root from "./root";
import { history } from "./Stores/CreateStore";
import ReactNotifications from "react-notifications-component";

import "./localization";

export const { store, persistor } = createStore();

function App() {
  return (
    // <I18nextProvider i18n={i18n} >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <ReactNotifications />
          <Root />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
    // </I18nextProvider>
  );
}

export default App;
