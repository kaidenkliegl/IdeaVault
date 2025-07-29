import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchAllNotes, deleteNote } from "../../redux/notes/notesThunks";
import NoteItem from "./Note/NoteItem";
import "./UserNotes.css";

function AllNotesList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const notes = useSelector((state) =>
    state.notes.allIds.map((id) => state.notes.byId[id])
  );
  //check if loaction is on the home page for the button
  const isHomePage = location.pathname === "/home";

  useEffect(() => {
    dispatch(thunkFetchAllNotes());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteNote(id));
  };

  //using conditional rendering  can use this as a way to display all notes again
  const showAllNotes = () => {
    dispatch(thunkFetchAllNotes());
  };

  if (!notes.length) return <div>No notes yet.</div>;

  return (
    <>
      <div className="all-notes-header">
        <h2>All Notes</h2>
      </div>
      <div className="all-notes-list">
        <div className="reset-btn-container">
          {isHomePage && (
            <button className="reset-notes-button" onClick={showAllNotes}>
              Show All Notes
            </button>
          )}
        </div>
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
