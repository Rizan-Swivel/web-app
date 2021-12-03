import { get } from "lodash";
import { call, select, delay } from "redux-saga/effects";
import { Action_STATES } from "../Stores/ActionConstants";

export function* makeRequest(api, action) {
  let response = {};
  try {
    const payload = get(action, "action.payload", null);
    const Action = get(action, "action.type", null);

    response = yield call(api, payload);

    if (response.ok) {
      const data = get(response, "data.data", {});

      yield put({ type: `${Action}_${Action_STATES.SUCCESS}`, data });
    } else {
      const errorResponse = err.response ? JSON.parse(err.response) : {};

      response = {
        ...errorResponse,
        error: errorResponse.error || err,
        errorReason: errorResponse.message_code,
        status: err.status,
        statusText: err.statusText,
      };

      yield put({ type: `${Action}_${Action_STATES.FAILURE}`, payload });
    }
  } catch (err) {
    const errorResponse = err.response ? JSON.parse(err.response) : {};

    response = {
      ...errorResponse,
      error: errorResponse.error || err,
      errorReason: errorResponse.message_code,
      status: err.status,
      statusText: err.statusText,
    };

    yield put({ type: `${Action}_${Action_STATES.FAILURE}`, payload });
  }
}
