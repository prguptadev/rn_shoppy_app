import AsyncStorage from "@react-native-async-storage/async-storage";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

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
    // console.log(resData);
    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
    saveDataToStorage(resData.idToken, resData.localId);
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
    console.log(resData);
    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
  };
};

const saveDataToStorage = (token, userId) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
    })
  );
};
