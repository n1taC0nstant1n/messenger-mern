const formidable = require("formidable");
const validator = require("validator");
module.exports.userRegister = (req, res) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    const { username, email, password, confirmPassword } = fields;
    const { image } = files;
    const error = [];

    if (!username) {
      error.push("Please provide your user name!");
    }
    if (!email) {
      error.push("Please provide your email!");
    }
    if (email && !validator.isEmail) {
      error.push("Please provide your valid email!");
    }
    if (!password) {
      error.push("Please provide your password!");
    }
    if (!confirmPassword) {
      error.push("Please provide your confirm password");
    }
    if (password && confirmPassword !== confirmPassword) {
      error.push("Your Password and Confirm Password not same");
    }
    if (password && password.length < 6) {
      error.push("Please provide password must be 6 character");
    }
    if (Object.keys(files).length === 0) {
      error.push("Please provide user image!");
    }
    if (error.length > 0) {
      res.status(400).json({
        error: {
          errorMessage: error,
        },
      });
    } else {
    }
  }); // end formidable
};
