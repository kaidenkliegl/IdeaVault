// react-vite/src/compenents/Notebooks/NotebookList.jsx

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateNotebook, thunkUpdateNotebook, thunkFetchNotebooks } from '../../redux/notebooks';
import './NotebookForm.css';

// This is the NotebookForm function
function NotebookForm() {
  const dispatch = useDispatch();
  // This is the local form state
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  // This extracts notebookId param from URL
  const { notebookId } = useParams();
  const navigate = useNavigate();
  const isEditing = !!notebookId;
  // Gets notebook from Redux if editing
  const notebook = useSelector((state) => state.notebooks[notebookId]);

  // This will load notebook details if not already loaded
  useEffect(() => {
    if (isEditing && !notebook) {
      dispatch(thunkFetchNotebooks());
    } else if (isEditing) {
      setName(notebook?.name);
    }
  }, [dispatch, isEditing, notebook]);

  // This handles form submit for create or update
  const handleSubmit = async (e) => {
    e.preventDefault();

    let response;
    if (isEditing) {
      response = await dispatch(thunkUpdateNotebook(notebookId, { name }));
    } else {
      response = await dispatch(thunkCreateNotebook({ name }));
    }

    // This is so if errors from backend, wil set local error state
    if (response?.errors) {
      setErrors(response.errors);
    } else {
      navigate('/notebooks');
    }
  };

  return (
    <div className="notebook-form-container">
        {/* Page Header */}
        <h1>{isEditing ? 'Edit' : 'New'} Notebook</h1>
        {/* Main notebook form */}
        <form onSubmit={handleSubmit} className="notebook-form">
        <label>
            Name
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {/* Display error if exists */}
        {errors.name && <p className="error-text">{errors.name}</p>}
        {/* Submit button */}
        <button type="submit" className="submit-button">{isEditing ? 'Update' : 'Create'}</button>
      </form>
    </div>
  )
}

export default NotebookForm;