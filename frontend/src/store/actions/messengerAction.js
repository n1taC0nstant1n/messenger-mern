import axios from "axios";
import {
  FRIEND_GET_SUCCESS,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_GET_SUCCESS,
} from "../types/messengerType";
export const getFriends = () => async (dispatch) => {
  //console.log("check");
  try {
    const response = await axios.get("/api/messenger/get-friends");
    console.log(response.data);
    dispatch({
      type: FRIEND_GET_SUCCESS,
      payload: {
        friends: response.data.friends,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const messageSend = (data) => async (dispatch) => {
  try {
    const response = await axios.post("/api/messenger/send-message", data);
    //console.log(response.data);
    dispatch({
      type: MESSAGE_SEND_SUCCESS,
      payload: {
        message: response.data.message,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getMessage = (id) => {
  return async (dispatch) => {
    //console.log(id);
    try {
      const response = await axios.get(`/api/messenger/get-message/${id}`);
      //console.log(response.data);
      dispatch({
        type: MESSAGE_GET_SUCCESS,
        payload: {
          message: response.data.message,
        },
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const ImageMessageSend = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      "/api/messenger/image-message-send",
      data
    );
    //console.log(response.data);
    dispatch({
      type: MESSAGE_SEND_SUCCESS,
      payload: {
        message: response.data.message,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const seenMessage = (msg) => async (dispatch) => {
  //console.log(msg);
  try {
    const response = await axios.post("/api/messenger/seen-message", msg);
    console.log(response.data);
  } catch (error) {
    console.log(error.response.message);
  }
};

export const updateMessage = (msg) => async (dispatch) => {
  //console.log(msg);
  try {
    const response = await axios.post("/api/messenger/delivered-message", msg);
    console.log(response.data);
  } catch (error) {
    console.log(error.response.message);
  }
};
