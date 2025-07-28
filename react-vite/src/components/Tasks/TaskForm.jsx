

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  thunkCreateTask,
  thunkUpdateTask,
  thunkFetchTasks,
} from "../../redux/tasks";
import "./TaskForm.css"

// This will be the TaskForm function
function TaskForm() {
  const dispatch = useDispatch(); 
  const { taskId, taskNoteId } = useParams();
 

  // These are the local frorm state
  const [content, setContent] = useState("");
  const [noteId, setNoteId] = useState("");
  const [errors, setErrors] = useState({});
  const note = useSelector((state) => state.notes?.byId[Number(noteId)]);
  const task = useSelector((state) => state.tasks[taskId]);
  //
 
  const navigate = useNavigate();
  // this will determine if in edit mode
  const isEditing = !!taskId;

  // This will load task data if editing
  useEffect(() => {
    if (isEditing) {
      if (!task) {
        dispatch(thunkFetchTasks());
      } else {
        setContent(task.content);
        setNoteId(task.note_id);
      }
    } else {
      // when creating, use noteId from URL param
      if (taskNoteId) setNoteId(Number(taskNoteId));
    }
  }, [dispatch, isEditing, task, taskNoteId]);

  // This will handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;

    if (isEditing) {
      res = await dispatch(thunkUpdateTask(taskId, { content }));
    } else {
      res = await dispatch(thunkCreateTask(noteId, { content }));
    }

    // And this will handle validation errors
    if (res?.errors) {
      setErrors(res.errors);
    } else {
      navigate("/tasks");
    }
  };


  return (
    <div className="task-form-container">
      {/* Page title */}
      <h1>{isEditing ? "Edit" : "New"} Task </h1>
      {/* Task form */}
      <form onSubmit={handleSubmit} className="task-form">
        {!isEditing && (
          <p>
            <strong>Note:</strong> {note ?  note.title: `Note ID ${noteId}`}
          </p>
        )}
        <label>
          Task
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        {errors.content && <p className="error-text">{errors.content}</p>}
        <button type="submit" className="submit-task-button">
          {isEditing ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
