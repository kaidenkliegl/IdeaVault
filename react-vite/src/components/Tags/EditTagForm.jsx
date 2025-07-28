import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTagThunk, updateTagThunk } from "../../redux/tags";
import { useParams, useNavigate } from "react-router-dom";

const EditTagForm = () => {
    const { tagId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get the tag from Redux state
    const tag = useSelector((state) => state.tags.byId[tagId]);

    // Local state for form inputs
    const [name, setName] = useState(tag ? tag.name : "");
    const [error, setError] = useState(null);

    // Fetch the tag if not already in Redux state
    // This ensures the form is populated with existing tag data
    useEffect(() => {
        if (!tag) {
            dispatch(getTagThunk(tagId));
        } else {
            setName(tag.name);
        }
    }, [dispatch, tagId, tag]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await dispatch(updateTagThunk(tagId, { name })).unwrap?.();
            navigate(`/tags/${tagId}`); // Navigate to the tag details page
        } catch (err) {
            if (err.json) {
                const data = await err.json();
                setError(data.error || data.errors?.name?.[0] || "Error updating tag");
            } else {
                setError("Error updating tag.");
            }
        }
    };
    // If tag is not found, show a loading message
    if (!tag) {
        return <p>Loading...</p>;
    }
    // Render the form with the tag's current name

    return (
        <form onSubmit={handleSubmit} className="edit-tag-form">
            <h2>Edit Tag</h2>
            <input
                type="text"
                value={name}
                placeholder="Tag Name"
                onChange={(e) => setName(e.target.value)}
                required
            />
            <button type="submit">Update Tag</button>
            {error && <p className="form-error">{error}</p>}
        </form>
    );
}
export default EditTagForm;
