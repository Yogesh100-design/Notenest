const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/notes");
const { body, validationResult } = require("express-validator");

// Route 1: Fetch all notes of user from database
router.get('/fetchAllNotes', fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error("❌ Error fetching notes:", error.message);
    res.status(500).send("Internal Server Error");
  }
});


//route 2: Adding new note of user
router.post('/addNotes', fetchUser, [
    body("description").isLength({ min: 5 }).withMessage("Name must be at least 5 characters long"),//description
    body("title").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
  ], async (req, res) => {
     const {description,title,tag} = req.body
     const errors = validationResult(req);
        if (!errors.isEmpty()) {
          console.log("❌ Validation failed:", errors.array());
          return res.status(400).json({ errors: errors.array() });
        }
 try {
      const newNote = new Notes({
      title,
      description,
      tag,
      user: req.user.id
    });

  const savedNtes=newNote.save();
  res.send(savedNtes)
 } catch (error) {
    console.error("❌ Error while Adding notes:", error.message);
    res.status(500).send("Internal Server Error");
  }
});


//route 3: updating the note added by the particular user
router.put('/updatingNotes/:id', fetchUser, async (req, res) => {
  const { description, title, tag } = req.body;

  const newNote = {};
  if (title) newNote.title = title;
  if (description) newNote.description = description;
  if (tag) newNote.tag = tag;

  try {
    // 1. Find the note by ID
    let note = await Notes.findById(req.params.id);

    // 2. Check if note exists
    if (!note) {
      return res.status(404).send({ error: "Note not found" });
    }

    // 3. Check if note belongs to the logged-in user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Unauthorized access" });
    }

    // 4. Update the note
    const updatedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({ updatedNote });

  } catch (error) {
    console.error("❌ Error while updating note:", error.message);
    res.status(500).send("Internal Server Error");
  }
});




//route 4: deleting  the note added by the particular user
router.delete('/deletingNotes/:id', fetchUser, async (req, res) => {
  try {
    // 1. Find the note by ID
    const note = await Notes.findById(req.params.id);

    // 2. Check if note exists
    if (!note) {
      return res.status(404).send({ error: "Note not found" });
    }

    // 3. Check if the note belongs to the logged-in user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Unauthorized access" });
    }

    // 4. Delete the note
    await Notes.findByIdAndDelete(req.params.id);

    res.json({ success: "Note deleted successfully" });
  } catch (error) {
    console.error("❌ Error while deleting note:", error.message);
    res.status(500).send("Internal Server Error");
  }
});





module.exports = router;
