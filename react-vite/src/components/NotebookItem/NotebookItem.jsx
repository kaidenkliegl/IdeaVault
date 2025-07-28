import './NotebookItem.css';  

export default function NotebookItem({ notebook, onView, onEdit, onDelete }) {
  return (
    <div className="notebook-item" onClick={onView}  >
      <button className="notebook-name-btn" onClick={() => onView(notebook.id)}>
        {notebook.name}
      </button>
      <div className="notebook-edit">
        <button className="notebook-edit-button" onClick={() => onEdit(notebook.id)}>
          Edit
        </button>
        <button className="notebook-delete-btn" onClick={() => onDelete(notebook.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
