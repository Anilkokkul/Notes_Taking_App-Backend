const express = require("express");
const {
  registerUser,
  loginUser,
  userLogout,
} = require("../controllers/user.controllers");
const router = express.Router();

router.get("/home", (req, res) => {
  res.send({
    message: "Welcome to the Home Page",
  });
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", userLogout);

module.exports = router;
