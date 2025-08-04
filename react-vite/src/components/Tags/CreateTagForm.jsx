import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewTagThunk } from "../../redux/tags/tagsThunk";
import { useNavigate } from "react-router-dom";
//import { getTagsThunk } from "../../redux/tags/tagsThunk";
const CreateTagForm = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);

        const result = await dispatch(createNewTagThunk({ name }));
        // result should be { tag: ... } if successful
        if (result && result.tag) {
            navigate("/tags");
        } else if (result && result.error) {
            setError(result.error);
        } else {
            setError("Error creating tag.");
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
}

export default CreateTagForm;
// This component provides a form to create a new tag.
// It uses local state to manage the tag name and any error messages.
// The handleSubmit function dispatches the createNewTagThunk action to create the tag.
// After successful creation, it navigates to the tags list page.