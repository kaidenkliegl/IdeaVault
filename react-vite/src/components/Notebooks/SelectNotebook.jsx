// src/components/Notebooks/SelectNotebook.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkFetchNotebooks } from "../../redux/notebooks";

export default function SelectNotebook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notebooks = useSelector(state => Object.values(state.notebooks));

  useEffect(() => {
    dispatch(thunkFetchNotebooks());
  }, [dispatch]);

  return (
    <div className="select-notebook-page">
      <h2>Select a Notebook</h2>
      <ul>
        {notebooks.map(nb => (
          <li key={nb.id}>
            <button onClick={() => navigate(`/notebook/${nb.id}/notes/new`)}>
              {nb.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
