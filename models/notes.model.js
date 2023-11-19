const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: {
      type: String,
      enum: ["idea", "reminder", "task", "important"],
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notes", noteSchema);
