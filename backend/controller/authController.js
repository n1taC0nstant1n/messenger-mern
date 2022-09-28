const formidable = require("formidable");
const validator = require("validator");
const registerModel = require("../models/authModel");
const fs = require("fs");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports.userRegister = (req, res) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    const { userName, email, password, confirmPassword } = fields;
    const { image } = files;
    const error = [];

    if (!userName) {
      error.push("Please provide your user name!");
    }
    if (!email) {
      error.push("Please provide your email!");
    }
    if (email && !validator.isEmail(email)) {
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
      const getImageName = files.image.originalFilename;
      const randomNumber = Math.floor(Math.random() * 99999);
      const newImageName = randomNumber + getImageName;
      files.image.originalFilename = newImageName;
      const newPath =
        __dirname +
        `../../../frontend/public/image/${files.image.originalFilename}`;
      try {
        const checkUser = await registerModel.findOne({
          email: email,
        });
        if (checkUser) {
          res.status(404).json({
            error: {
              errorMessage: ["Email already exist!"],
            },
          });
        } else {
          fs.copyFile(files.image.filepath, newPath, async (error) => {
            if (!error) {
              const userCreate = await registerModel.create({
                userName,
                email,
                password: await bcryptjs.hash(password, 10),
                image: files.image.originalFilename,
              });
              const token = jwt.sign(
                {
                  id: userCreate._id,
                  userName: userCreate.userName,
                  email: userCreate.email,
                  image: userCreate.image,
                  registerTime: userCreate.createdAt,
                },
                process.env.SECRET,
                {
                  expiresIn: process.env.TOKEN_EXP,
                }
              );
              //   console.log(token);
              //   console.log("Registration Complete Successfully!");
              const options = {
                expires: new Date(
                  Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
                ),
              };
              res.status(201).cookie("authToken", token, options).json({
                successMessage: "Your Register Successfull!",
                token,
              });
            } else {
              res.status(500).json({
                error: {
                  errorMessage: ["Internal Server Error"],
                },
              });
            }
          });
        }
      } catch (error) {
        res.status(500).json({
          error: {
            errorMessage: ["Internal Server Error"],
          },
        });
      }
    }
  }); // end formidable
};

module.exports.userLogin = async (req, res) => {
  // console.log("this is from login page");
  const error = [];
  const { email, password } = req.body;
  if (!email) {
    error.push("Please provide your Email!");
  }
  if (!password) {
    error.push("Please provide your Password!");
  }
  if (email && !validator.isEmail(email)) {
    error.push("Please provide your valid Email!");
  }
  console.log(req.body);
};
