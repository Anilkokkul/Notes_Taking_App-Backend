const users = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const payload = req.body;

    const user = await users.findOne({ email: payload.email });
    console.log(payload.password);

    if (user) {
      return res.status(409).send({
        message: "An account is already registered with your email",
      });
    }

    const hashedValue = bcrypt.hashSync(payload.password, saltRounds);
    payload.hashedPassword = hashedValue;
    delete payload.password;
    const newUser = new users(payload);

    newUser
      .save()
      .then((user) => {
        res.status(201).send({
          message: "Account created successfully",
          user: user,
        });
      })
      .catch((error) => {
        res.status(409).send({
          error: "Error creating the user",
          Error: error,
        });
      });
    //creating new User
  } catch (error) {
    res.status(500).send({
      message: "Internal Server error",
      error: error.message,
    });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await users.findOne({ email: email });

    if (userExist) {
      if (bcrypt.compareSync(password, userExist.hashedPassword)) {
        let token = jwt.sign({ _id: userExist._id }, process.env.SECRET_KEY);
        res.cookie("accessToken", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 86400000),
        });
        return res.status(200).send({
          message: "User Logged-in Successfully",
        });
      }
      return res.status(400).send({
        message: "Incorrect Password!!",
        password: password,
      });
    }
    return res.status(403).send({
      message: "This email is not registered",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server error",
      error: error.message,
    });
  }
};

exports.userLogout = async (req, res) => {
  try {
    await res.clearCookie("accessToken");
    res.status(200).send({
      message: "User Logged-Out Successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server error",
      error: error.message,
    });
  }
};
