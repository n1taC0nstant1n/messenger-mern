import React from "react";
import { FaPhoneAlt, FaVideo, FaRocketchat } from "react-icons/fa";
import Message from "./Message";
import MessageSend from "./MessageSend";
import FriendInfo from "./FriendInfo";

const RightSide = (props) => {
  const { currentFriend } = props;
  const { inputHandler } = props;
  const { newMessage } = props;
  const { sendMessage } = props;
  const { message } = props;
  const { scrollRef } = props;
  const { emojiSend } = props;
  const { ImageSend } = props;
  const { activeUser } = props;
  const { typingMessage } = props;

  return (
    <div className="col-9">
      <div className="right-side">
        <input type="checkbox" id="dot" />
        <div className="row">
          <div className="col-8">
            <div className="message-send-show">
              <div className="header">
                <div className="image-name">
                  <div className="image">
                    <img src={`./image/${currentFriend.image}`} alt="" />
                    {activeUser &&
                    activeUser.length > 0 &&
                    activeUser.some((u) => u.userId === currentFriend._id) ? (
                      <div className="active-icon"></div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="name">
                    <h3> {currentFriend.userName} </h3>
                  </div>
                </div>

                <div className="icons">
                  <div className="icon">
                    <FaPhoneAlt />
                  </div>

                  <div className="icon">
                    <FaVideo />
                  </div>

                  <div className="icon">
                    <label htmlFor="dot">
                      <FaRocketchat />
                    </label>
                  </div>
                </div>
              </div>
              <Message
                message={message}
                currentFriend={currentFriend}
                scrollRef={scrollRef}
                typingMessage={typingMessage}
              />
              <MessageSend
                inputHandler={inputHandler}
                newMessage={newMessage}
                sendMessage={sendMessage}
                emojiSend={emojiSend}
                ImageSend={ImageSend}
              />
            </div>
          </div>

          <div className="col-4">
            <FriendInfo
              currentFriend={currentFriend}
              activeUser={activeUser}
              message={message}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
