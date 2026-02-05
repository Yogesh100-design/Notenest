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
    try {
      const response = await fetch("http://localhost:5000/api/notes/addNotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }), // Send note data as JSON
      });

      const json = await response.json(); 

      if (json.errors) {
        console.error("Validation errors:", json.errors);
        return { success: false, errors: json.errors };
      } else {
        setNotes(notes.concat(json)); 
        return { success: true };
      }
    } catch (error) {
      console.error("Error adding note:", error);
      return { success: false, error: error.message };
    }
  };

  // ✅ 3. EDIT NOTE FUNCTION
  // ✅ 3. EDIT NOTE FUNCTION
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/updatingNotes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      // Create a deep copy of notes to update UI
      let newNotes = JSON.parse(JSON.stringify(notes));

      // Find the note and update it
      for (let index = 0; index < newNotes.length; index++) {
        if (newNotes[index]._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
      return { success: true };
    } catch (error) {
      console.error("Error updating note:", error);
      return { success: false, error: error.message };
    }
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
