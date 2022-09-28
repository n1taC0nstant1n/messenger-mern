import axios from "axios";
import { REGISTER_FAIL } from "../types/authType";
import { REGISTER_SUCCESS } from "../types/authType";
export const userRegister = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "/api/messenger/user-register",
        data,
        config
      );
      localStorage.setItem("authToken", response.data.token);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
      //console.log(response.data);
    } catch (error) {
      //console.log(error.response.data);
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          error: error.response.data.error.errorMessage,
        },
      });
    }
  };
};
