import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { retrieveNotes, deleteNote } from "../../redux/notes/notesThunks";

function NotesList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notebookId } = useParams()
  const nbkId = Number(notebookId)
  const notesById = useSelector((state) => state.notes.byId);
  const noteIds = useSelector((state) => state.notes.allIds);

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
      {noteIds.map((id) => {
        const note = notesById[id];
        return (
          <div key={id} className="note-container">
            <Link to={`/notes/${id}`}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </Link>
            <button onClick={() => handleDelete(id)}>Delete Note</button>
          </div>
        );
      })}
    </div>
  );
}

export default NotesList;
