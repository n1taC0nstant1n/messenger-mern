import React from "react";

const Message = () => {
  return (
    <div className="message-show">
      <div className="my-message">
        <div className="image-message">
          <div className="my-text">
            <div className="message-text">How are you?</div>
          </div>
        </div>
        <div className="time">2 Jan 2022</div>
      </div>
      <div className="fd-message">
        <div className="image-message-time">
          <img src="/image/5066kazi.jpg" alt="" />
          <div className="message-time">
            <div className="fd-text">
              <p className="message-text">I'm Fine</p>
            </div>
            <div className="time">3 Jan 2022</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;