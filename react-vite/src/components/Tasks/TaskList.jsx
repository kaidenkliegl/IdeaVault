// react-vite/src/components/Tasks/TaskList.jsx

import { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchTasks, thunkUpdateTask, thunkDeleteTask } from '../../redux/tasks';
import './TaskList.css'

// This is the TaskList Function
function TaskList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // This will sselect all tasks from the store
    const tasks = useSelector((state) => Object.values(state.tasks || {}));

    // This will fetch tasks
    useEffect(() => {
        dispatch(thunkFetchTasks()).then(() => setLoading(false));;
git 
    }, [dispatch]);

    // This will toggle the task completion
    const handleToggle = async (task) => {
        await dispatch(thunkUpdateTask(task.id, {
            is_completed: !task.is_completed
        }));
    };
    
    const handleDelete = async (taskId) => {
        await dispatch(thunkDeleteTask(taskId))
    };

    if (loading) return <p className="loading">Loading tasks...</p>;
    if (!tasks.length) return <p className="loading">No tasks found.</p>;


    return (
        <div className='task-list-container'>
            {/* Page title */}
            <h1>Your Tasks</h1>
            {/* Navigate to task creation form */}
            <button onClick={() => navigate('/tasks/new')} className='task-create-button'>
                New Task
            </button>
            {/* Task listing */}
            <ul className='task-list'>
                {tasks.map((task) => (
                    <li key={task.id} className='task-item'>
                        <div className='task-info'>
                            {/* Completion toggle */}
                            <input
                                type='checkbox'
                                checked={task.is_completed}
                                onChange={() => handleToggle(task)}
                            />
                            <span className={ task.is_completed ? 'completed': ''}>
                                { task.content }    
                            </span> 

                        </div>
                        <div className='task-actions'>
                            {/* Edit and delete buttons */}
                            <button onClick={() => navigate(`/tasks/${task.id}/edit`)} className='task-edit-button'>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(task.id)} className='task-delete-button'>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TaskList