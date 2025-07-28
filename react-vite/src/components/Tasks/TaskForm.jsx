// react-vite/src/components/Tasks/TaskList.jsx

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateTask, thunkUpdateTask, thunkFetchTasks } from '../../redux/tasks';

// This will be the TaskForm function
function TaskForm() {
    const dispatch = useDispatch();

    // These are the local frorm state
    const [content, setContent] = useState('');
    const [noteId, setNoteId] = useState('');
    const [errors, setErrors] = useState({});
    // 
    const {taskId} = useParams();
    const navigate = useNavigate();
    // this will determine if in edit mode
    const isEditing = !!taskId;
    const task = useSelector((statet) => statet.tasks[taskId]);

    // This will load task data if editing
    useEffect(() => {
        if (!isEditing && !task) {
            dispatch(thunkFetchTasks());

        } else if (isEditing) {
            setContent(task?.content);
            setNoteId(task?.note_id);
        }

    }, [dispatch, isEditing, task]);

    // This will handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        let res;

        if (isEditing) {
            res = await dispatch(thunkUpdateTask(taskId, {content}));

        } else {
            res = await dispatch(thunkCreateTask(noteId, {content}));

        }

        // And this will handle validation errors
        if (res?.errors) {
            setErrors(res.errors);

        } else {
            navigate('/tasks');
        }
    };

    return (
        <div className='task-form-container'>
            {/* Page title */}
            <h1>{isEditing ? 'Edit' : 'New'} Task </h1>
            {/* Task form */}
            <form onSubmit={handleSubmit} className='task-form'>
                <label>
                    Note ID
                    <input
                        type='number'
                        value={noteId}
                        onChange={(e) => setNoteId(e.target.value)}
                        required
                        disabled={isEditing}

                    />
                </label>
                <label>
                    Content
                    <input
                        type='text'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </label>
                {/* Show validation errors */}
                {errors.content && <p className='error-text'>{errors.content}</p>}
                {/* Submit button */}
                <button type='submit' className='submit-button'>
                    {isEditing ? 'Update' : 'Create'}
                </button>
            </form>
        </div>
    )
}

export default TaskForm;