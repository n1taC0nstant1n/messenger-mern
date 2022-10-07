import React from "react";
import { FaEdit, FaEllipsisH, FaSistrix } from "react-icons/fa";
import {
  getFriends,
  messageSend,
  getMessage,
  ImageMessageSend,
} from "../store/actions/messengerAction";
import ActiveFriend from "./ActiveFriend";
import Friends from "./Friends";
import RightSide from "./RightSide";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";
import useSound from "use-sound";
import notificationSound from "../audio/notification.mp3";
import sendingSound from "../audio/sending.mp3";
const Messenger = () => {
  const [notificationSPlay] = useSound(notificationSound);
  const [sendingSPlay] = useSound(sendingSound);
  const scrollRef = useRef();
  const socket = useRef();

  const { friends, message, messageSendSuccess } = useSelector(
    (state) => state.messenger
  );
  const { myInfo } = useSelector((state) => state.auth);
  const [currentFriend, setCurrentFriend] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [activeUser, setActiveUser] = useState([]);
  const [typingMessage, setTypingMessage] = useState([]);

  const [socketMessage, setSocketMessage] = useState("");

  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    socket.current.on("getMessage", (data) => {
      //console.log(data);
      setSocketMessage(data);
    });
    socket.current.on("typingMessageGet", (data) => {
      //console.log(data);
      setTypingMessage(data);
    });
  }, []);
  useEffect(() => {
    if (socketMessage && currentFriend) {
      if (
        socketMessage.senderId === currentFriend._id &&
        socketMessage.receiverId === myInfo.id
      ) {
        dispatch({
          type: "SOCKET_MESSAGE",
          payload: {
            message: socketMessage,
          },
        });
      }
    }
    setSocketMessage("");
  }, [socketMessage]);

  useEffect(() => {
    socket.current.emit("addUser", myInfo.id, myInfo);
  }, []);

  useEffect(() => {
    socket.current.on("getUser", (users) => {
      //console.log(users);
      const filterUser = users.filter((u) => u.userId !== myInfo.id);

      setActiveUser(filterUser);
    });
  }, []);
  //console.log(socket);

  useEffect(() => {
    if (
      socketMessage.senderId !== currentFriend._id &&
      socketMessage.receiverId === myInfo.id
    ) {
      notificationSPlay();
      toast.success(`${socketMessage.senderName} Send a New Message`);
    }
    //console.log(users);
  }, [socketMessage]);

  const inputHandler = (e) => {
    setNewMessage(e.target.value);
    socket.current.emit("typingMessage", {
      senderId: myInfo.id,
      receiverId: currentFriend._id,
      message: e.target.value,
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    sendingSPlay();
    const data = {
      senderName: myInfo.userName,
      receiverId: currentFriend._id,
      message: newMessage ? newMessage : "❤",
    };

    socket.current.emit("typingMessage", {
      senderId: myInfo.id,
      receiverId: currentFriend._id,
      message: "",
    });

    dispatch(messageSend(data));
    setNewMessage("");
    //console.log(newMessage);
  };
  useEffect(() => {
    if (messageSendSuccess) {
      socket.current.emit("sendMessage", message[message.length - 1]);
      dispatch({
        type: "UPDATE_FRIEND_MESSAGE",
        payload: {
          msgInfo: message[message.length - 1],
        },
      });
      dispatch({
        type: "MESSAGE_SEND_SUCCESS_CLEAR",
      });
    }
  }, [messageSendSuccess]);
  console.log(currentFriend);

  //console.log(friends);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFriends());
  }, []);
  useEffect(() => {
    if (friends && friends.length > 0) setCurrentFriend(friends[0]);
  }, [friends]);
  useEffect(() => {
    dispatch(getMessage(currentFriend._id));
  }, [currentFriend?._id]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const emojiSend = (emu) => {
    setNewMessage(`${newMessage}` + emu);
    socket.current.emit("typingMessage", {
      senderId: myInfo.id,
      receiverId: currentFriend._id,
      message: emu,
    });
  };

  const ImageSend = (e) => {
    if (e.target.files.length !== 0) {
      sendingSPlay();
      const imagename = e.target.files[0].name;
      const newImageName = Date.now() + imagename;

      socket.current.emit("sendMessage", {
        senderId: myInfo.id,
        senderName: myInfo.userName,
        receiverId: currentFriend._id,
        time: new Date(),
        message: {
          text: "",
          image: newImageName,
        },
      });
      const formData = new FormData();
      formData.append("senderName", myInfo.userName);
      formData.append("imageName", newImageName);

      formData.append("receiverId", currentFriend._id);
      formData.append("image", e.target.files[0]);
      dispatch(ImageMessageSend(formData));
      //console.log(newImageName);
    }
  };

  return (
    <div className="messenger">
      <Toaster
        position={"top-right"}
        reverseOrder="false"
        toastOptions={{ style: { fontSize: "18px" } }}
      />
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src={`./image/${myInfo.image}`} alt="" />
                </div>
                <div className="name">
                  <h3>Hi {myInfo.userName}</h3>
                </div>
              </div>
              <div className="icons">
                <div className="icon">
                  <FaEllipsisH />
                </div>
                <div className="icon">
                  <FaEdit />
                </div>
              </div>
            </div>
            <div className="friend-search">
              <div className="search">
                <button>
                  <FaSistrix />
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                />
              </div>
            </div>
            <div className="active-friends">
              {/* {activeUser && activeUser.length > 0
                ? activeUser.map((u) => <ActiveFriend user={u} />)
                : ""} */}
              {activeUser && activeUser.length > 0
                ? activeUser.map((u) => (
                    <ActiveFriend
                      setCurrentFriend={setCurrentFriend}
                      user={u}
                    />
                  ))
                : ""}
            </div>
            <div className="friends">
              {friends && friends.length > 0
                ? friends.map((fd) => (
                    <div
                      className={
                        currentFriend._id === fd.fndInfo._id
                          ? "hover-friend active"
                          : "hover-friend"
                      }
                      onClick={() => setCurrentFriend(fd.fndInfo)}
                    >
                      <Friends friend={fd} myId={myInfo.id} />
                    </div>
                  ))
                : "No Friend"}
            </div>
          </div>
        </div>
        {currentFriend ? (
          <RightSide
            currentFriend={currentFriend}
            inputHandler={inputHandler}
            newMessage={newMessage}
            sendMessage={sendMessage}
            message={message}
            scrollRef={scrollRef}
            emojiSend={emojiSend}
            ImageSend={ImageSend}
            activeUser={activeUser}
            typingMessage={typingMessage}
          />
        ) : (
          "Please select Your Friend"
        )}
      </div>
    </div>
  );
};

export default Messenger;
