// react-vite/src/components/Notebooks/NotebookList.jsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchNotebooks, thunkDeleteNotebook } from '../../redux/notebooks';
import './NotebookList.css';

// This is the NotebookList function
function NotebookList() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Thisd will extract notebooks from Redux state as an array
    const notebooks = useSelector((state) => Object.values(state.notebooks));


    // This will fetch all notebooks when component mounts
    useEffect(() => {
        dispatch(thunkFetchNotebooks());
    }, [dispatch])


    // This will dispatch delete thunk for a given notebook
    const handleDelete = async (id) => {
        await dispatch(thunkDeleteNotebook(id));
    };

    return (
        <div className='notebook-list-container'>
            {/* Page Title */}
            <h1>Your Notebooks</h1>
            
            {/* Navigate to new notebook form */}
            <button onClick={() => navigate('/notebooks/new')} className="notebook-create-button">
                New Notebook
            </button>
            {/* Render all notebooks as a list */}
            <ul className="notebook-list">
                {notebooks.map((notebook) => (
                    <li key={notebook.id} className="notebook-item">
                        {/* Navigate to details view */}
                        <button onClick={() => navigate(`/notebooks/${notebook.id}`)} className="notebook-name-button">
                            {notebook.name}
                        </button>
                        {/* Action buttons */}
                        <div className="notebook-actions">
                            <button onClick={() => navigate(`/notebooks/${notebook.id}/edit`)} className="notebook-edit-button">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(notebook.id)} className="notebook-delete-button">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NotebookList;