import { AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";
import { all, call, put, takeEvery } from "redux-saga/effects";
import Api from "../apis";
const loginUser = function*() {
  const { token } = yield call(getToken);
  const [user, picture] = yield all([
    call(Api.userInfo, token),
    call(Api.userPicture, token)
  ]);

  yield put({
    type: "LOGIN_SUCCEEDED",
    payload: { ...user, picture }
  });
};

const getToken = async function() {
  let tokenInfo = await AsyncStorage.getItem("token");
  if (tokenInfo) {
    return JSON.parse(tokenInfo);
  } else {
    let tokenInfo = await Expo.Facebook.logInWithReadPermissionsAsync(
      "593320964350157",
      {
        permissions: ["public_profile"]
      }
    );
    AsyncStorage.setItem("token", JSON.stringify(tokenInfo));
    return tokenInfo;
  }
};
const mySaga = function*() {
  yield takeEvery("LOGIN_REQUESTED", loginUser);
};
export default mySaga;
