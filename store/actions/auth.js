import AsyncStorage from "@react-native-async-storage/async-storage";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const DID_YOU_TRY_AGAIN = "DID_YOU_TRY_AGAIN";

let timer;

export const didyoutryLogin = () => {
  return { type: DID_YOU_TRY_AGAIN };
};

export const authenticate = (token, userId, expiryTime) => {
  //return { type: AUTHENTICATE, token: token, userId: userId };
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, token: token, userId: userId });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBNk6OsZ-wWCqAbT4izBm7z-Q4FyT7UxEg",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      // throw new Error("Something went wrong-LOGIN");
      const errData = await response.json();
      const errID = errData.error.message;
      let message = "Something went wrong-LOGIN";

      if (errID === "EMAIL_NOT_FOUND") {
        message = "EMAIL NOT FOUND";
      } else if (errID === "INVALID_PASSWORD") {
        message = "INVALID PASSWORD";
      }
      throw new Error(message);
      // console.log(errData);
    }

    const resData = await response.json();
    console.log(resData);
    // dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBNk6OsZ-wWCqAbT4izBm7z-Q4FyT7UxEg",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      // throw new Error("Something went wrong-LOGIN");
      const errData = await response.json();
      const errID = errData.error.message;
      let message = "Something went wrong-SIGNUP";
      if (errID === "EMAIL_EXISTS") {
        message = "EMAIL EXISTS";
      } else if (errID === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        message = "TOO MANY ATTEMPTS TRY LATER";
      }
      throw new Error(message);

      // console.log(errData);
    }

    const resData = await response.json();
    //  console.log(resData);
    // dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logout = () => {
  // AsyncStorage.clear();
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  //  saveDataToStorage(null, null, new Date());
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
