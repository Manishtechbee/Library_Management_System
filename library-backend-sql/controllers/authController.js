const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModel");

const register = (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ msg: "All fields required" });
  }

  userModel.getUserByEmail(email, (err, result) => {
    if (result.length > 0) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { name, email, password: hashedPassword, role };

    userModel.createUser(newUser, (err, result) => {
      if (err) throw err;
      res.json({ msg: "Registration successful" });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  userModel.getUserByEmail(email, (err, result) => {
    if (result.length === 0) return res.status(400).json({ msg: "Invalid credentials" });

    const user = result[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password: pwd, ...userData } = user;
    res.json({ msg: "Login successful", token, user: userData });
  });
};

module.exports = { register, login };
