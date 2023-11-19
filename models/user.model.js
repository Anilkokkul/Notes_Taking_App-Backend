const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: [true, "Entered email is already registered"],
      required: true,
    },
    hashedPassword: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
