import {AUTHENTICATE, LOGOUT} from "../actions/auth.action";

const initialState = {
    token: null,
    userId: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.user
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};
