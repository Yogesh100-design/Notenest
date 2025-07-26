import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/Notes/noteContext";
import Noteitem from "./Noteitem";
import AddNotes from "./AddNotes";
import { useNavigate } from "react-router-dom";


function Notes(props) {
  const {showAlert} =props;
  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;
  const navigate = useNavigate();
  

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  
  useEffect(() => {
   
    if(localStorage.getItem('token')){
      getAllNotes();
    }
    else{
      navigate("/Login")
    }
  }, []);

  const ref = useRef(null); // Hidden modal trigger button
  const refclose = useRef(null); // Hidden modal trigger button

  const updateNote = (currentNote) => {
    if (ref.current) {
      ref.current.click(); // Trigger Bootstrap modal
      setNote({
        id: currentNote._id,
        etitle: currentNote.title,
        edescription: currentNote.description,
        etag: currentNote.tag,
      });
    } else {
      console.warn("Modal trigger button not mounted yet.");
    }
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refclose.current.click();
    props.showAlert("Note updated successfuly!", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNotes showAlert={showAlert} />

      {/* 🔧 Hidden Modal Trigger Button */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      {/* 📦 Modal Code */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group mb-3">
                <label>Enter title of note</label>
                <input
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  aria-describedby="emailHelp"
                  onChange={onChange}
                  value={note.etitle}
                />
              </div>

              <div className="form-group mb-3">
                <label>Enter note description</label>
                <input
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  aria-describedby="emailHelp"
                  onChange={onChange}
                  value={note.edescription}
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="exampleInputPassword1">Enter Tag</label>
                <input
                  className="form-control"
                  id="etag"
                  name="etag"
                  onChange={onChange}
                  value={note.etag}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick} 
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="container my-2">
        <h1
          className="text-center text-primary fw-bold display-5 mb-4"
          style={{
            letterSpacing: "1px",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          📝 Your notes
        </h1>
        <div className="p-4 border border-primary rounded bg-transparent text-primary">
          {notes.length===0 && 'No notes to display'}
          {notes.map((note) => (
            <Noteitem key={note._id} note={note} updateNote={updateNote} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Notes;
