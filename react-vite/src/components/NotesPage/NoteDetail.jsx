import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { retrieveNote, deleteNote, updateNote } from "../../redux/notes/notesThunks";

function NoteDetail() {
  const { noteId } = useParams();
  const note_id = Number(noteId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const note = useSelector((state) => state.notes.byId[note_id]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const hasInitialized = useRef(false); // prevents overwriting user input

  // Load the note initially
  useEffect(() => {
    if (!note) {
      dispatch(retrieveNote(note_id));
    } else if (!hasInitialized.current) {
      setTitle(note.title);
      setContent(note.content);
      hasInitialized.current = true;
    }
  }, [dispatch, note_id, note]);

  // Auto-save when user stops typing
  useEffect(() => {
    if (!note) return;

    const timer = setTimeout(() => {
      if (title !== note.title || content !== note.content) {
        dispatch(updateNote({ id: note_id, title, content }));
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [title, content, dispatch, note, note_id]);

  const handleDelete = async () => {
    await dispatch(deleteNote(note_id));
    navigate(`/notebook/${note.notebook_id}/notes`);
  };

  if (!note) return <div>Loading...</div>;

  return (
    <div className="note-detail-container">
      <div>
        {isEditingTitle ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setIsEditingTitle(false)}
            autoFocus
          />
        ) : (
          <>
            <h3>{title}</h3>
            <button onClick={() => setIsEditingTitle(true)}>Edit Title</button>
          </>
        )}
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note..."
      />

      <button onClick={handleDelete}>Delete Note</button>
    </div>
  );
}

export default NoteDetail;
