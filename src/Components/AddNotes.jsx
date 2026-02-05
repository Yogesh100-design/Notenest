import React, { useState , useContext } from "react";
import noteContext from "../Context/Notes/noteContext";

const AddNotes = (props) => {
  // eslint-disable-next-line
  const context = useContext(noteContext);

  const {showAlert} =props;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const { addNote } = context;

  const handleClick = async (e) => {
    e.preventDefault();
    const result = await addNote(note.title, note.description, note.tag);
    
    if (result.success) {
      setNote({ title: "", description: "", tag: "" });
      props.showAlert("Note added successfully!", "success");
    } else {
      props.showAlert("Failed to add note. Title/Description must be at least 5 chars.", "danger");
    }
  }
  
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h1
        className="text-center text-primary fw-bold display-5 mb-4"
        style={{
          letterSpacing: "1px",
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        📝 Add Your Note
      </h1>

      <form className="p-3 border rounded bg-light shadow-sm">
        <div className="form-group mb-3">
          <label>Enter title of note</label>
          <input
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.title}
          />
        </div>

        <div className="form-group mb-3">
          <label>Enter note description</label>
          <input
            className="form-control"
            id="description"
            name="description"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.description}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="exampleInputPassword1">Enter Tag</label>
          <input
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-sm fw-semibold d-block mx-auto px-4 py-2 "
          onClick={handleClick}
        >
          Add note
        </button>
      </form>
    </div>
  );
};

export default AddNotes;
