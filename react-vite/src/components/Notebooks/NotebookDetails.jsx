// react-vite/src/compoenents/Notebooks/NotebookList.jsx

import { useEffect } from 'react'; 
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchNotebooks } from '../../redux/notebooks';
import './NotebookDetails.css';

// Notebook details function
function NotebookDetails() {
  const dispatch = useDispatch();
  const { notebookId } = useParams();
  // This grabs the notebook data from Redux
  const notebook = useSelector((state) => state.notebooks[notebookId]);

  // This is so if notebook is not found, it fetchs all again
  useEffect(() => {
    if (!notebook) {
      dispatch(thunkFetchNotebooks());
    }
  }, [dispatch, notebook]);

  // This is for a loading while notebook is being fetched
  if (!notebook) return <p className="loading">Loading...</p>;

  return (
  <div className="notebook-details-container">
    {/* Notebook name and timestamps */}
    <h1 className="notebook-title">{notebook.name}</h1>
    <p className="notebook-meta">Created: {new Date(notebook.created_at).toLocaleString()}</p>
    <p className="notebook-meta">Updated: {new Date(notebook.updated_at).toLocaleString()}</p>
  </div>
    
  );
}

export default NotebookDetails;