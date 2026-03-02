const User = require("../models/user.model");
// GET all users
const getAllUsers = async () => {
  return await User.find();
};

// GET user by ID
const getUserById = async (id) => {
  return await User.findById(id);
};

// CREATE user
const createUser = async (name) => {
  const newUser = new User({ name });
  await newUser.save();
  return newUser;
};

// UPDATE user
const updateUser = async (id, name) => {
  const user = await User.findByIdAndUpdate(id, { name }, { new: true });
  return user;
};

// DELETE user
const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  return user;
}; 

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};