import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchAllNotes, deleteNote } from "../../redux/notes/notesThunks";
import NoteItem from "./Note/NoteItem";
import "./UserNotes.css";

function AllNotesList() {
  const dispatch = useDispatch();
  const notes = useSelector((state) =>
    state.notes.allIds.map((id) => state.notes.byId[id])
  );

  useEffect(() => {
    dispatch(thunkFetchAllNotes());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteNote(id));
  };

  if (!notes.length) return <div>No notes yet.</div>;

  return (
    <>
      <div className="all-notes-header">
        <h2>All Notes</h2>
      </div>

      <div className="all-notes-list">
        <ul>
          {notes.map((note) => (
            <Link
              key={note.id}
              to={`/notes/${note.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <NoteItem note={note} onDelete={handleDelete} />
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AllNotesList;
