import React from "react";
import { FaCaretSquareDown } from "react-icons/fa";
const FriendInfo = (props) => {
  const { currentFriend } = props;
  //const name = currentFriend.userName.toUpperCase();
  return (
    <div className="friend-info">
      <input type="checkbox" id="gallery" />
      <div className="image-name">
        <div className="image">
          <img src={`./image/${currentFriend.image}`} alt="" />
        </div>
        <div className="active-user">Active</div>
        <div className="name">
          <h4>{currentFriend.userName}</h4>
        </div>
      </div>
      <div className="others">
        <div className="custom-chat">
          <h3>Customize Chat</h3>
          <FaCaretSquareDown />
        </div>
        <div className="privacy">
          <h3>Privacy and Support</h3>
          <FaCaretSquareDown />
        </div>
        <div className="media">
          <h3>Shared Media</h3>
          <label htmlFor="gallery">
            <FaCaretSquareDown />
          </label>
        </div>
      </div>
      <div className="gallery">
        <img src="/image/5066kazi.jpg" alt="" />
        <img src="/image/5066kazi.jpg" alt="" />
        <img src="/image/5066kazi.jpg" alt="" />
        <img src="/image/5066kazi.jpg" alt="" />
      </div>
    </div>
  );
};

export default FriendInfo;
