import {LOGIN, SIGN_UP} from "../actions/auth.action";

const initialState = {
    token: null,
    userId: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                token: action.token,
                userId: action.user
            };
        case SIGN_UP:
            return {
                token: action.token,
                userId: action.user
            };
        default:
            return state;
    }
};
