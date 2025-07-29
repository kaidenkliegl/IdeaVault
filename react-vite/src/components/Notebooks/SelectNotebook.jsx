import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkFetchNotebooks } from "../../redux/notebooks";
import "./SelectNotebook.css";

export default function SelectNotebook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notebooks = useSelector((state) => Object.values(state.notebooks));

  useEffect(() => {
    dispatch(thunkFetchNotebooks());
  }, [dispatch]);

  return (
    <>
    <div className="select-notebook-header"> <h2>Select a Notebook</h2></div>
     
      <div className="notebooks-choose-grid">
        {notebooks.map((nb) => (
          <div
            key={nb.id}
            className="notebook-book"
            onClick={() => navigate(`/notebook/${nb.id}/notes/new`)}
          >
            <h3>{nb.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}
