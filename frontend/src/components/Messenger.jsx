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

const Messenger = () => {
  const scrollRef = useRef();
  const [currentFriend, setCurrentFriend] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const inputHandler = (e) => {
    setNewMessage(e.target.value);
  };
  const sendMessage = (e) => {
    e.preventDefault();
    const data = {
      senderName: myInfo.userName,
      receiverId: currentFriend._id,
      message: newMessage ? newMessage : "❤",
    };
    dispatch(messageSend(data));
    //console.log(newMessage);
  };
  console.log(currentFriend);
  const { friends, message } = useSelector((state) => state.messenger);
  const { myInfo } = useSelector((state) => state.auth);
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
  };

  const ImageSend = (e) => {
    if (e.target.files.length !== 0) {
      const imagename = e.target.files[0].name;
      const newImageName = Date.now() + imagename;
      const formData = new FormData();
      formData.append("senderName", myInfo.userName);
      formData.append("imagename", newImageName);

      formData.append("receiverId", currentFriend._id);
      formData.append("image", e.target.files[0]);
      dispatch(ImageMessageSend(formData));
      //console.log(newImageName);
    }
  };

  return (
    <div className="messenger">
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
              <ActiveFriend />
            </div>
            <div className="friends">
              {friends && friends.length > 0
                ? friends.map((fd) => (
                    <div
                      className={
                        currentFriend._id === fd._id
                          ? "hover-friend active"
                          : "hover-friend"
                      }
                      onClick={() => setCurrentFriend(fd)}
                    >
                      <Friends friend={fd} />
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
          />
        ) : (
          "Please select Your Friend"
        )}
      </div>
    </div>
  );
};

export default Messenger;
