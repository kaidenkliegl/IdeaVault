import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkFetchAllNotes } from "../../redux/notes/notesThunks";
import NoteItem from "../NotesPage/Note/NoteItem"; 
import "./TasksNotes.css";

function TaskNotes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notes = useSelector((state) =>
    state.notes.allIds.map((id) => state.notes.byId[id])
  );

  //fetch all notes
  useEffect(() => {
    dispatch(thunkFetchAllNotes());
  }, [dispatch]);

  if (!notes.length) return <div>No notes yet.</div>;

  //navigate to the tasks form when note is selected
  const handleSelect = (id) => {
    navigate(`/tasks/new/${id}`);
  };

  return (
    <div className="task-notes-wrapper">
        <div className="task-notes-header">
            <h2>Select a Note for this Task</h2>
        </div>
      
      <div className="task-notes-grid">
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => handleSelect(note.id)}
            style={{ cursor: "pointer" }}
          >
            {/* importing NoteItem here to keep the styling the same  */}
            <NoteItem note={note} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskNotes;
