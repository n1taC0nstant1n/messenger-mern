import { REGISTER_FAIL } from "../types/authType";
const authState = {
  loading: true,
  authenticated: false,
  error: "",
  successMessage: "",
  myInfo: "",
};

export const authReducer = (state = authState, action) => {
  const { payload, type } = action;

  if (type === REGISTER_FAIL) {
    return {
      ...state,
      error: payload.error,
      authenticated: false,
      myInfo: "",
      loading: true,
    };
  }

  return state;
};
