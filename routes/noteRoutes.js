const express = require("express");
const {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
} = require("../controllers/notes.controller");
const router = express.Router();
const { isAuth } = require("../utils/Authentication");

router.get("/notes", isAuth, getAllNotes);

router.post("/notes", isAuth, createNote);

router.put("/notes/:id", isAuth, updateNote);

router.delete("/notes/:id", isAuth, deleteNote);

module.exports = router;
