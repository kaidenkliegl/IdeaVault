import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { retrieveNotes, deleteNote } from "../../redux/notes/notesThunks";
import NoteItem from "./Note/NoteItem";

function NotesList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notebookId } = useParams();
  const nbkId = Number(notebookId);

  const notesById = useSelector((state) => state.notes.byId);
  const noteIds = useSelector((state) => state.notes.allIds);

  // Build notes array
  const notes = noteIds.map((id) => notesById[id]);

  useEffect(() => {
    if (nbkId) {
      dispatch(retrieveNotes(nbkId));
    }
  }, [dispatch, nbkId]);

  const handleDelete = async (id) => {
    await dispatch(deleteNote(id));
    navigate("/notes");
  };

  return (
    <div className="notes-list-container">
      {notes.map((note) => (
        <Link key={note.id} to={`/notes/${note.id}`}>
          <NoteItem note={note} onDelete={handleDelete} />
        </Link>
      ))}
    </div>
  );
}

export default NotesList;
