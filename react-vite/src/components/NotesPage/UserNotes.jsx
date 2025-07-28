// src/components/Notes/AllNotesList.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchAllNotes } from "../../redux/notes/notesThunks";

function AllNotesList() {
  const dispatch = useDispatch();
  const notes = useSelector((state) =>
    state.notes.allIds.map((id) => state.notes.byId[id])
  );

  useEffect(() => {
    dispatch(thunkFetchAllNotes());
  }, [dispatch]);

  if (!notes.length) return <div>No notes yet.</div>;

  return (
    <div className="all-notes-list">
      <h2>All Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content.substring(0, 100)}...</p>
            <small>{new Date(note.updated_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllNotesList;
