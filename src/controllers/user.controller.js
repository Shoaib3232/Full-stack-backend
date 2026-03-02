const userService = require("../services/user.service");

// GET all users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// GET single user
exports.getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// CREATE user
exports.createUser = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const newUser = await userService.createUser(name);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// UPDATE user
exports.updateUser = async (req, res, next) => {
  try {
    const { name } = req.body;
    const updatedUser = await userService.updateUser(req.params.id, name);

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// DELETE user
exports.deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);

    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};