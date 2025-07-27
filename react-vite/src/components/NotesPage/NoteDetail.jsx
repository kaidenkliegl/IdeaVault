import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { retrieveNote, deleteNote, updateNote } from "../../redux/notes/notesThunks";

// Extended toolbar (similar to Google Docs but stable)
const modules = {
  toolbar: [
    [{ font: [] }],  // font family
    [{ size: ["small", false, "large", "huge"] }], // font size
    ["bold", "italic", "underline", "strike"], // basic formatting
    [{ color: [] }, { background: [] }], // text/background color
    [{ script: "sub" }, { script: "super" }], // subscript/superscript
    [{ header: 1 }, { header: 2 }], // headers
    ["blockquote", "code-block"], // block elements
    [{ list: "ordered" }, { list: "bullet" }], // lists
    [{ indent: "-1" }, { indent: "+1" }], // indentation
    [{ align: [] }], // alignment
    ["link", "image", "video"], // media
    ["clean"], // remove formatting
  ],
};

function NoteDetail() {
  const { noteId } = useParams();
  const note_id = Number(noteId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const note = useSelector((state) => state.notes.byId[note_id]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!note) {
      dispatch(retrieveNote(note_id));
    } else if (!hasInitialized.current) {
      setTitle(note.title);
      setContent(note.content);
      hasInitialized.current = true;
    }
  }, [dispatch, note_id, note]);

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

      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        placeholder="Write your note..."
        modules={modules}
        style={{ minHeight: "300px", marginBottom: "20px" }}
      />

      <button onClick={handleDelete}>Delete Note</button>
    </div>
  );
}

export default NoteDetail;
