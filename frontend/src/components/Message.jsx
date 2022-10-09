import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const Message = ({ message, currentFriend, scrollRef, typingMessage }) => {
  const { myInfo } = useSelector((state) => state.auth);
  return (
    <>
      <div className="message-show">
        {message && message.length > 0 ? (
          message.map((m) =>
            m.senderId === myInfo.id ? (
              <div className="my-message" ref={scrollRef}>
                <div className="image-message">
                  <div className="my-text">
                    <div className="message-text">
                      {m.message.text === "" ? (
                        <img src={`./image/${m.message.image}`} alt="" />
                      ) : (
                        m.message.text
                      )}
                    </div>
                  </div>
                </div>
                <div className="time">
                  {moment(m.createdAt).startOf("mini").fromNow()}
                </div>
              </div>
            ) : (
              <div className="fd-message" ref={scrollRef}>
                <div className="image-message-time">
                  <img src={`/image/${currentFriend.image}`} alt="" />
                  <div className="message-time">
                    <div className="fd-text">
                      <p className="message-text">
                        {m.message.text === "" ? (
                          <img src={`./image/${m.message.image}`} alt="" />
                        ) : (
                          m.message.text
                        )}
                      </p>
                    </div>
                    <div className="time">
                      {moment(m.createdAt).startOf("mini").fromNow()}
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div className="friend_connect">
            <img src={`/image/${currentFriend.image}`} alt="" />
            <h3>{currentFriend.userName} Connect You</h3>
            <span>
              {moment(currentFriend.createdAt).startOf("mini").fromNow()}
            </span>
          </div>
        )}
      </div>

      {typingMessage &&
      typingMessage.message &&
      typingMessage.senderId === currentFriend._id ? (
        <div className="typing-message">
          <div className="fd-message">
            <div className="image-message-time">
              <img src={`/image/${currentFriend.image}`} alt="" />
              <div className="message-time">
                <div className="fd-text">
                  <p className="time">Typing message...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Message;
