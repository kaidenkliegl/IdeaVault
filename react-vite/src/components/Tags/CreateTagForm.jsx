import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTagThunk } from "../../redux/tags";
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
            await dispatch(createTagThunk({ name })).unwrap?.();
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
        <form onSubmit={handleSubmit} className="create-tag-form">
            <h2>Create New Tag</h2>
            <input
                type="text"
                value={name}
                placeholder="Tag Name"
                onChange={(e) => setName(e.target.value)}
                required
            />
            <button type="submit">Create Tag</button>
            {error && <p className="error">{error}</p>}
        </form>

    );
};
export default CreateTagForm;
// This component allows users to create a new tag.
// It uses local state to manage the tag name and any error messages.
// On form submission, it dispatches the createTagThunk action to create the tag.
// If successful, it resets the form and navigates to the tags list.
// If there's an error, it displays the error message below the form.