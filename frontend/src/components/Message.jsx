import React from "react";
import { useSelector } from "react-redux";

const Message = ({ message, currentFriend, scrollRef }) => {
  const { myInfo } = useSelector((state) => state.auth);
  return (
    <div className="message-show">
      {message && message.length > 0
        ? message.map((m) =>
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
                <div className="time">2 Jan 2022</div>
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
                    <div className="time">3 Jan 2022</div>
                  </div>
                </div>
              </div>
            )
          )
        : ""}
    </div>
  );
};

export default Message;
