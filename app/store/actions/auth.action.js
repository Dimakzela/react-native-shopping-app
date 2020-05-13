export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';

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

        if(!response.ok) {
            const errorData = await response.json();
            const errorId = errorData.error.message;
            let message = 'Something went wrong';
            if(errorId === 'EMAIL_EXISTS') {
                message = 'This email exist already!';
            }

            throw new Error(message);
        }

        const resData = await response.json();

        dispatch({
            type: SIGN_UP,
            token: resData.idToken,
            userId: resData.localId,
        });
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

        if(!response.ok) {
            const errorData = await response.json();
            const errorId = errorData.error.message;
            let message = 'Something went wrong';
            if(errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!';
            } else if(errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid!';
            }

            throw new Error(message);
        }

        const resData = await response.json();

        dispatch({
            type: LOGIN,
            token: resData.idToken,
            userId: resData.localId,
        });
    };
}
