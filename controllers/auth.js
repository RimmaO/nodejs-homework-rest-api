const { User } = require("../models/user");
const { ctrlWrapper } = require("../helpers");
const { SECRET_KEY } = process.env;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const error = new Error("Email in use");
    error.status = 409;
    throw error;
  }
  const hashPassword = await bcrypt.hash(password, 10);
  // async (password) => {
  // const result = await bcrypt.hash(password, 10);
  // console.log(result);
  // const compareResult1 = await bcrypt.compare(password, result);
  // console.log(compareResult1);
  // const compareResult2 = await bcrypt.compare("1234", result);
  // console.log(compareResult2);
  // };
  // createHashPassword("12345");
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Email or password is wrong");
    error.status = 401;
    throw error;
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    const error = new Error("Email or password is wrong");
    error.status = 401;
    throw error;
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token: token,
    user: {
      name: user.name,
      email: user.email,
      subscription: user.subscription,
    },
  });
  // res.json({ token });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const current = async (req, res) => {
  const { name, email, subscription } = req.user;
  res.status(200).json({
    name,
    email,
    subscription,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
};
