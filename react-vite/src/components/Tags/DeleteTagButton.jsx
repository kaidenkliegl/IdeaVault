
import { useDispatch } from "react-redux";
import { deleteTagThunk } from "../../redux/tags/tagsThunk";

const DeleteTagButton = ({ tagId, onDelete }) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        if (window.confirm("Delete this tag?")) {
            await dispatch(deleteTagThunk(tagId));
            if (onDelete) onDelete();
        }
    };

    return (
        <button onClick={handleDelete} style={{ color: "red" }}>
            Delete
        </button>
    );
};

export default DeleteTagButton;
// This component provides a button to delete a tag.
// It confirms with the user before proceeding and calls the removeTag thunk action.
// The onDelete callback can be used to refresh the tag list or perform other actions after deletion

// It uses the useDispatch hook to dispatch the removeTag action with the tagId.

// Usage example in a tag detail or list component:
// <DeleteTagButton tagId={tag.id} onDelete={() => navigate("/tags")} />