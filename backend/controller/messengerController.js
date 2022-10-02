const formidable = require("formidable");
const User = require("../models/authModel");
const messageModel = require("../models/messageModel");
module.exports.getFriends = async (req, res) => {
  const myId = req.myId;
  //console.log("This is fine!");
  try {
    const friendGet = await User.find({});
    const filter = friendGet.filter((d) => d.id !== myId);
    //console.log(friendGet);
    res.status(200).json({
      success: true,
      friends: filter,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};

module.exports.messageUploadDB = async (req, res) => {
  const { senderName, receiverId, message } = req.body;
  const senderId = req.myId;
  //console.log(req.body);
  try {
    const insertMessage = await messageModel.create({
      senderId: senderId,
      senderName: senderName,
      receiverId: receiverId,
      message: {
        text: message,
        image: "",
      },
    });
    res.status(201).json({
      success: true,
      message: insertMessage,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};

module.exports.messageGet = async (req, res) => {
  const myId = req.myId;
  const fdId = req.params.id;
  // console.log(myId);
  // console.log(req.params.id);
  try {
    let getAllMessage = await messageModel.find({});
    //console.log(getAllMessage);
    getAllMessage = getAllMessage.filter(
      (m) =>
        (m.senderId === myId && m.receiverId === fdId) ||
        (m.receiverId === myId && m.senderId === fdId)
    );
    //console.log(getAllMessage);
    res.status(200).json({
      success: true,
      message: getAllMessage,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};

module.exports.ImageMessageSend = (req, res) => {
  const form = formidable();
  form.parse(req, (error, fields, files) => {
    // console.log(fields);
    // console.log(files);
    const { senderName, receiverId, imageName } = fields;
  });
};
