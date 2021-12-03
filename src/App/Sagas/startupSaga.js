import { put, call, select, delay } from "redux-saga/effects";
import STARTUPACTIONS from "../Stores/Startup/Actions";
import ERROR_ACTIONS from "../Stores/Error/Actions";
import { push } from "connected-react-router";
import { history } from "../Stores/CreateStore";
import {toast} from "react-toastify";
import { errorType } from "../Utils/constants";
import ERRORACTIONS from "../Stores/Error/Actions";

//Saga for business logic handling

export function* startup(api, action) {}

export function* signInGoogle(api, action) {
  try {
    const response = yield call(api.googleSignIn, action.token);
    if (response.ok) {
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(response.data.refresh_token)
      );
      var resp = response.data.data;
      api.setAuthToken(resp.accessToken);
      api.setUserIdHeader(resp.userId);
      yield put(STARTUPACTIONS.signInGoogleSuccess(resp));
      console.log("signInGoogleSuccess")

      yield put(ERRORACTIONS.setError({
        message: response.data.message,
        show: true,
        type: errorType.SUCCESS
      }))
      delay(500)
      yield put(ERRORACTIONS.resetError(null))

    } else {
      window.alert(response.data.displayMessage + "!");
      yield put(
        STARTUPACTIONS.signInGoogleFailure(response.data.displayMessage)
      );
    }
  } catch (err) {
    yield put(STARTUPACTIONS.signInGoogleFailure(err));
  }
}

export function* signInFacebook(api, action) {
  try {
    const response = yield call(api.faceBookSignIn, action.token);
    if (response.ok) {
      var resp = response.data.data;
      api.setAuthToken(resp.accessToken);
      api.setUserIdHeader(resp.userId);
      yield put(STARTUPACTIONS.signInGoogleSuccess(resp));
    } else {
      yield put(STARTUPACTIONS.signInFacebookFailure(response.error));
    }
  } catch (err) {
    yield put(STARTUPACTIONS.signInFacebookFailure(err));
  }
}

export function* signUpGoogle(api, action) {
  try {
    const response = yield call(api.googleSignUp, action.token);

    if (response.ok) {
      var resp = response.data.data;
      yield put(STARTUPACTIONS.signInGoogle(action.token));
    } else {
      window.alert(response.data.displayMessage + "!");
      yield put(
        STARTUPACTIONS.signInGoogleFailure(response.data.displayMessage)
      );
    }
  } catch (err) {
    yield put(STARTUPACTIONS.signInGoogleFailure(err.message));
  }
}

export function* signUpFacebook(api, action) {
  try {
    const response = yield call(api.faceBookSignUp, action.token);

    if (response.ok) {
      yield put(STARTUPACTIONS.signInFacebook(action.token));
    } else {
      yield put(STARTUPACTIONS.signInFacebookFailure(response.error));
    }
  } catch (err) {
    yield put(STARTUPACTIONS.signInFacebookFailure(err.message));
  }
}

export function* signInSuccess(api, action) {
  try {
    yield put(STARTUPACTIONS.setRole());
    let state = yield select();
    if (action.data.next) {
      yield put(push(action.data.next));
      return;
    }
    yield put(push(`/profile`));
    // HistoryWrapper.history.push('/user');
  } catch (err) {}
}

export function* logOutUser(api, action) {
  try {
    let state = yield select();
    api.setUserIdHeader(state.startup.user.userId);
    const response = yield call(api.logOutUser, action.token);

    if (response.ok) {
      var resp = response.data.data;
      api.removeUserHeader();
      api.removeAuthToken();
      api.removeLanguageHeader();
      localStorage.clear();
      yield put(STARTUPACTIONS.logOutSuccess(resp));
      yield put(push("/"));
      yield put(window.location.reload());
    } else {
      yield put(STARTUPACTIONS.logOutFailure(response.error));
      api.removeUserHeader();
    }
  } catch (err) {
    yield put(STARTUPACTIONS.logOutFailure(err.message));
    api.removeUserHeader();
  }
}

export function* loadData(api, action) {
  try {
    var user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      api.setAuthToken(user.accessToken);
      api.setUserIdHeader(user.userId);

      const response = yield call(api.validateToken);
      if (response.ok) {
        yield put(STARTUPACTIONS.loadDataSuccess(user));
      } else {
        yield put(STARTUPACTIONS.logOut());
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export function* login(api, action) {
  try {
    const response = yield call(api.login, action.obj);
    const { obj } = action;
    if (response.ok) {
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(response.data.refresh_token)
      );
      var resp = response.data.data;
      api.removeAuthToken();
      api.setAuthToken(resp.accessToken);
      api.setUserIdHeader(resp.userId);
      if (obj && obj.next) {
        resp["next"] = action.obj.next;
      }

      yield put(STARTUPACTIONS.signInGoogleSuccess(resp));

    } else {
      yield put(STARTUPACTIONS.loginFailure(response.data));
      yield put(ERRORACTIONS.setError({
        message: response.data.message,
        show: true,
        type: errorType.ERROR
    }))
    delay(500)
    yield put(ERRORACTIONS.resetError(null))


    }
  } catch (err) {
    console.log(err);
  }
}

export function* register(api, action) {
  try {
    const response = yield call(api.registerUser, action.obj);

    if (response.ok) {
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(response.data.refresh_token)
      );
      var resp = response.data.data;
      api.setAuthToken(resp.accessToken);
      api.setUserIdHeader(resp.userId);
      yield put(STARTUPACTIONS.signInGoogleSuccess(resp));
    } else {
      yield put(STARTUPACTIONS.registerFailure(response.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* addFCMTOKEN(api, action) {
  try {
     // To do in future
  } catch (err) {
    console.log(err);
  }
}

export function* getRoleSummary(api, action) {
  try {
    const response = yield call(api.getRoleSummary);
    if (response.ok) {
      var resp = response.data.data;

      yield put(STARTUPACTIONS.getRoleSummarySuccess(resp));
    } else {
      yield put(STARTUPACTIONS.getRoleSummaryFailure(response.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getUserRoleSummary(api, action) {
  try {
    const response = yield call(api.getUSERroleSummary, action.data);
    if (response.ok) {
      var resp = response.data.data;

      yield put(STARTUPACTIONS.getUserRoleSummarySuccess(resp));
    } else {
      yield put(STARTUPACTIONS.getUserRoleSummaryFailure(response.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* updateUserRole(api, action) {
  try {
    const response = yield call(api.updateUserRole, action.data);
    if (response.ok) {
      var resp = response.data.data;
      alert("update user successful!");
      yield put(STARTUPACTIONS.updateUserRoleSuccess(resp));
    } else {
      yield put(STARTUPACTIONS.updateUserRoleFailure(response.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* deleteROle(api, action) {
  try {
    const response = yield call(api.deleteRole, action.data);
    if (response.ok) {
      var resp = response.data.data;

      yield put(STARTUPACTIONS.deleteRoleSuccess(resp));
    } else {
      yield put(STARTUPACTIONS.deleteRoleFailure(response.data.message));
      alert(response.data.message);
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getAllPermissions(api, action) {
  try {
    const response = yield call(api.getPermissions);
    if (response.ok) {
      var resp = response.data.data;

      yield put(STARTUPACTIONS.getPermissionsSuccess(resp));
    } else {
      yield put(STARTUPACTIONS.getPermissionsFailure(response.data.message));
      alert(response.data.message);
    }
  } catch (err) {
    console.log(err);
  }
}

export function* addRole(api, action) {
  try {
    const response = yield call(api.addRole, action.data);
    if (response.ok) {
      var resp = response.data.data;
      alert("Role added Successfully");
      yield put(STARTUPACTIONS.addRoleSuccess(resp));
      yield put(STARTUPACTIONS.getRoleSummary());
      //yield put(push('/dashboard'));
    } else {
      alert("Role added Failure ", response);
      yield put(STARTUPACTIONS.addRoleFailure(response.data.message));
      alert(response.data.message);
    }
  } catch (err) {
    console.log(err);
  }
}

export function* updateRolePermissions(api, action) {
  try {
    const response = yield call(
      api.updateUserPermissions,
      action.data,
      action.id
    );
    if (response.ok) {
      var resp = response.data.data;
      alert("Role updated Successfully");
      yield put(STARTUPACTIONS.updateRoleSuccess(resp));
      yield put(STARTUPACTIONS.getRoleSummary());
      //yield put(push('/dashboard'));
    } else {
      alert("Role update Failure ", response);
      yield put(STARTUPACTIONS.updateRoleFailure(response.data.message));
      alert(response.data.message);
    }
  } catch (err) {
    console.log(err);
  }
}

export function* changeLanguage(api, action) {
  api.setLanguageHeader(action.data);
  yield put(STARTUPACTIONS.changeLanguageSuccess(action.data));

  // try {
  //   const response = yield call(api.changeLanguage, action.data);
  //   console.log("** Change Language CALL **", response);
  //   if (response.ok) {
  //     var resp = response.data.data;
  //     api.setLanguageHeader("", action.data);
  //     yield put(STARTUPACTIONS.changeLanguageSuccess(resp));
  //   } else {

  //     yield put(STARTUPACTIONS.changeLanguageFailure(response.error));
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
}

export function* getCategories(api, action) {
  try {
    const response = yield call(api.getCategories, action.data);
    if (response.ok) {
      var resp = response.data.data;
      yield put(STARTUPACTIONS.getCategoriesSuccess(resp));
    } else {
      yield put(STARTUPACTIONS.getCategoriesFailure(response.data.message));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getBrands(api, action) {
  try {
    const response = yield call(api.getBrands, action.data);
    if (response.ok) {
      var resp = response.data.data;
      yield put(STARTUPACTIONS.getBrandsSuccess(resp));
    } else {
      yield put(STARTUPACTIONS.getCategoriesFailure(response.data.message));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* generateOTP(api, action) {
  try {
    const response = yield call(api.generateOTP, action.data);
    if (response.ok) {
      var resp = response.data;
      yield put(STARTUPACTIONS.generateOTPSuccess(resp));

    } else {
      yield put(
        STARTUPACTIONS.generateOTPFailure(response.data.message)
      );
      //alert(response.data.message);
    }
  } catch (err) {
    console.log(err);
  }
}

export function* verifyOTP(api, action) {
  try {
    const response = yield call(api.verifyOTP, action.data);
    if (response.ok) {
      var resp = response.data;
      yield put(STARTUPACTIONS.verifyOTPSuccess(resp));
      yield put(ERRORACTIONS.setError({
        message: response.data.message,
        show: true,
        type: errorType.SUCCESS
    }))
    delay(500)
    yield put(ERRORACTIONS.resetError(null))
    } 
    else {
      yield put(
        STARTUPACTIONS.verifyOTPFailure(response.data)
      );
    }
  } catch (err) {
    console.log(err);
  }
}

export function* merchantSignUp(api, action) {
  try {
    const response = yield call(api.merchantSignUp, action.data);
    if (response.ok) {
      var resp = response.data;
      yield put(STARTUPACTIONS.merchantSignUpSuccess(resp));
    } else {

      yield put (ERROR_ACTIONS.setError({message :  response.data.displayMessage, type : errorType.ERROR , show : true}))
      yield put(
        STARTUPACTIONS.merchantSignUpFailure(response.message)
      );
      delay(500)
      yield put (ERROR_ACTIONS.resetError(null))
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getNewNotifications(api, action) {
  // try {
  //   const response = yield call(api.getNewNotifications, action.data);
  //   if (response.ok) {
  //     var resp = response.data.data;
  //     yield put(STARTUPACTIONS.getNewNotificationsSuccess(resp));
  //   } else {
  //     yield put(
  //       STARTUPACTIONS.getNewNotificationsFailure(response.data.message)
  //     );
  //     alert(response.data.message);
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
}

export function* deleteNotifications(api, action) {
  try {
    //console.log(action.deleteSlice)
    if (action.notifications.notifications.length > 0) {
      const response = yield call(
        api.deleteNotifications,
        action.notifications,
        action.deleteSlice
      );
      if (response.ok) {
        var resp = response.data.data;
        yield put(STARTUPACTIONS.deleteNotificationsSuccess(resp));
        yield put(STARTUPACTIONS.getNewNotifications(action.data));
      } else {
        yield put(
          STARTUPACTIONS.deleteNotificationsFailure(response.data.message)
        );
        alert(response.data.message);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export function* resetStartupSuccess(){
  yield put(STARTUPACTIONS.resetStartupSuccess())
}

export function* notifySuccess(action){
  try {
    toast(action.message)
  }catch (e) {

  }
}

export function* resetOTPVerification(action){
  try {
    yield put(STARTUPACTIONS.resetOTPVerificationSuccess())
  }catch (e) {

  }
}
