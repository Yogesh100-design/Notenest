import React, { useState } from "react";
import noteContext from "./noteContext"; // Importing context to provide state globally

const NoteState = (props) => {
  // Initial empty array of notes
  const noteInitial = [];

  // useState hook to manage notes in React state
  const [notes, setNotes] = useState(noteInitial);

  // ✅ 1. GET ALL NOTES FUNCTION
const getAllNotes = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/notes/fetchAllNotes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });

    const json = await response.json();

    // ✅ Only update notes if it’s an array
    if (Array.isArray(json)) {
      setNotes(json);
    } else {
      console.error("Expected array but got:", json);
      setNotes([]); // fallback to empty array
    }
  } catch (error) {
    console.error("❌ Error fetching notes:", error);
    setNotes([]); // in case of failure, fallback
  }
};

  // ✅ 2. ADD NOTE FUNCTION
  const addNote = async (title, description, tag) => {
    // POST request to add a new note
    const response = await fetch("http://localhost:5000/api/notes/addNotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }), // Send note data as JSON
    });

    const json = await response.json(); // Get saved notes from backend (optional)
    console.log(json)

    setNotes(notes.concat(json)); // Add new note to state
  };

  // ✅ 3. EDIT NOTE FUNCTION
const editNote = async (id, title, description, tag) => {
  await fetch(`http://localhost:5000/api/notes/updatingNotes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
    },
    body: JSON.stringify({ title, description, tag }),
  });

  let newNote= JSON.parse(JSON.stringify(notes))

  // Manually update the note in state
  for (let index = 0; index < notes.length; index++) {
    const element = newNote[index];
    if (element._id === id) {
      newNote[index].title = title;
      newNote[index].description= description;
      newNote[index].tag = tag;
       break;
    }
  }
  setNotes(newNote)
};


  // ✅ 4. DELETE NOTE FUNCTION
const deleteNote = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/notes/deletingNotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });

    const result = await response.json();
    console.log("Delete response:", result);

    if (response.ok) {
      console.log("Deleting the note with id: " + id);
      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } else {
      console.error("Failed to delete note:", result.error);
    }
  } catch (error) {
    console.error("Error during deleteNote:", error.message);
  }
};



  // ✅ Return context provider to wrap entire app and share state/functions
  return (
    <noteContext.Provider
      value={{notes,setNotes,addNote, editNote, deleteNote,getAllNotes}}>
      {props.children} {/* Render children components inside this context */}
    </noteContext.Provider>
  );
};

export default NoteState;
