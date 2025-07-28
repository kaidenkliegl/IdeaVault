import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { retrieveNotes, deleteNote } from "../../redux/notes/notesThunks";
import NoteItem from "./Note/NoteItem";

function NotesList({ notebookId: propNotebookId }) {
    //if prop is pass in use it. Otherwise have the useParams as a fallback
    // Doing this to use the component in different locations accessing notebookId different ways 
  const { notebookId: paramNotebookId } = useParams();
  const nbkId = Number(propNotebookId || paramNotebookId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="notes-list-container"     style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {notes.map((note) => (
        <Link key={note.id} to={`/notes/${note.id}`}>
          <NoteItem note={note} onDelete={handleDelete} />
        </Link>
      ))}
    </div>
  );
}

export default NotesList;
