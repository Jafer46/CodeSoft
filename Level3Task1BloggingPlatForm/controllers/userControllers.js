const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { MESSAGETYPE } = require("../constants/messageConstant");
const bcrypt = require("bcrypt");
const { STATUS } = require("../constants/statusCodes");

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    return res
      .status(STATUS.NOT_FOUND)
      .json({ message: "User Not Found!", type: MESSAGETYPE.ERROR });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(STATUS.NOT_FOUND)
      .json({ message: "User Not Found!", type: MESSAGETYPE.ERROR });
  }
  const checked = await bcrypt.compare(password, user.password);
  if (!checked) {
    return res
      .status(STATUS.UNAUTHORIZED)
      .json({ message: "Incorrect password!", type: MESSAGETYPE.ERROR });
  }
  //req.session.user = user;
  req.session.isAuth = true;
  await req.session.save();
  res.cookie("sessionId", req.sessionID);
  return res
    .status(STATUS.OK)
    .render("index.ejs", {title:"Home", message: "Login successful!", type: MESSAGETYPE.SUCCESS });
});

const createUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(STATUS.CONFLICT)
      .json({ message: "Email exist!", type: MESSAGETYPE.ERROR });
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log(hashedPassword)
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    avatar: "",
    bio: "",
  });
  //req.session.user = user;
  req.session.isAuth = true;
  req.session.save();
  res.cookie("sessionId", req.sessionID);
  return res
    .status(STATUS.CREATED)
    .render('index.ejs',{ title:"Home", message: "acount created!", type: MESSAGETYPE.SUCCESS });
});

const updateUser = asyncHandler(async (req, res) => {});

const deleteUser = asyncHandler(async (req, rers) => {});


module.exports = { loginUser, createUser}