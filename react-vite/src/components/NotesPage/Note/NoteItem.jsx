import "./NoteItem.css"; 

export default function NoteItem({ note }) {
  return (
    <div className="note-item">
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{note.content}</p>
      <small className="note-date">{new Date(note.createdAt).toLocaleDateString()}</small>
    </div>
  );
}