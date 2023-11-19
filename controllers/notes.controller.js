const notes = require("../models/notes.model");

exports.getAllNotes = async (req, res) => {
  try {
    await notes
      .find({ user: req.user })
      .then((data) => {
        res.status(200).send({
          message: "Notes Retrieved Successfully",
          Notes: data,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error while getting Notes",
          Error: error.message,
        });
      });
  } catch (error) {
    res.status(500).send({
      error: "An error has occurred while retrieving the notes",
      Error: error.message,
    });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { title, content, type } = req.body;

    const newNote = notes
      .create({ title, content, type, user: req.user })
      .then((data) => {
        res.status(201).send({
          message: "New Note added Successfully",
          Note: data,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error while adding note",
          Error: error.message,
        });
      });
  } catch (error) {
    res.status(400).send({
      message: "Internal server error",
      Error: error,
    });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, type } = req.body;

    await notes
      .findByIdAndUpdate(id, {
        title,
        content,
        type,
      })
      .then((data) => {
        res.status(201).send({
          message: "Note Updated successfully",
          Note: data,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error while editing note",
          Error: error.message,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      Error: error,
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await notes.findByIdAndDelete(id);
    if (deletedNote) {
      res.status(200).send({
        message: "Note deleted Successfully",
        Deleted_Note: deletedNote,
      });
    } else {
      res.status(404).send({
        message: "Note not found",
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Internal server error",
      Error: error,
    });
  }
};
