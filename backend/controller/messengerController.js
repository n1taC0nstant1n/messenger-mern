const User = require("../models/authModel");
module.exports.getFriends = async (req, res) => {
  //console.log("This is fine!");
  try {
    const friendGet = await User.find({});
    //console.log(friendGet);
    res.status(200).json({
      success: true,
      friends: friendGet,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};
