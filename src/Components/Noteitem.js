import React , {useContext} from 'react'
import noteContext from '../Context/Notes/noteContext'

function Noteitem(props) {
  // eslint-disable-next-line
  const context=useContext(noteContext)
  const {deleteNote}=context


  const { note ,updateNote } = props;
  return (
   <div>
  <div className="card border-primary shadow-sm mb-3">
    <div className="row g-0 align-items-center">
      <div className="col-md-12">
        <div className="card-body">
          {/* Title and Icons on the same line */}
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title text-primary fw-bold mb-0 ">
              {note.title}
            </h5>
            <div>
              <i className="fa-solid fa-trash text-danger mx-1 cursor-pointer" onClick={()=>{deleteNote(note._id)}}></i>
              <i className="fa-solid fa-file-pen text-primary mx-1 cursor-pointer" onClick={()=>{updateNote(note)}}></i>
            </div>
          </div>

          {/* Description below */}
          <p className="card-text text-muted mt-2">{note.description}</p>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default Noteitem;
