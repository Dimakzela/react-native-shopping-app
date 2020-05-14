import {AsyncStorage} from "react-native";

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({type: AUTHENTICATE, userId: userId, token: token});
    };
};

export const signUp = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDrxNzbvaNJNJPJBHjTPHYea6GTOzv7BgM',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            const errorId = errorData.error.message;
            let message = 'Something went wrong';
            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email exist already!';
            }

            throw new Error(message);
        }

        const resData = await response.json();
        let expiryTime = parseInt(resData.expiresIn) * 1000;
        dispatch(authenticate(resData.localId, resData.idToken, expiryTime));

        const expirationDate = new Date(new Date().getTime() + expiryTime);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDrxNzbvaNJNJPJBHjTPHYea6GTOzv7BgM',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            const errorId = errorData.error.message;
            let message = 'Something went wrong';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!';
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid!';
            }

            throw new Error(message);
        }

        const resData = await response.json();
        let expiryTime = parseInt(resData.expiresIn) * 1000;
        dispatch(authenticate(resData.localId, resData.idToken, expiryTime));

        const expirationDate = new Date(new Date().getTime() + expiryTime);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData').then();
    return {type: LOGOUT};
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            if (expirationTime > 60000) {
                dispatch(setLogoutTimer(expirationTime - 60000));
            } else {
                dispatch(logout());
            }
        }, 60000);
    };
};

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString()
        })
    );
};
