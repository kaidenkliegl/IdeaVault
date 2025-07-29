import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewTagThunk } from "../../redux/tags/tagsThunk";
import { useNavigate } from "react-router-dom";

const CreateTagForm = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await dispatch(createNewTagThunk({ name })).unwrap?.();
            setName("");
            navigate("/tags"); // Navigate to tags list or wherever appropriate
        } catch (err) {
            // If backend returns JSON error message:
            if (err.json) {
                const data = await err.json();
                setError(data.error || data.errors?.name?.[0] || "Error creating tag");
            } else {
                setError("Error creating tag.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Tag</h2>
            <input
                type="text"
                value={name}
                placeholder="Tag name"
                onChange={(e) => setName(e.target.value)}
                required
            />
            <button type="submit">Create</button>
            {error && <div className="form-error">{error}</div>}
        </form>
    );
};

export default CreateTagForm;