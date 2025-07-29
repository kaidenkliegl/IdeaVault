import { useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTagsThunk } from "../../redux/tags/tagsThunk";
import { Link } from "react-router-dom";


const TagList = () => {
    const dispatch = useDispatch();
    // Get tags from Redux, normalized
    const tags = useSelector((state) =>
        state.tags.allIds.map((id) => state.tags.byId[id])
    );

    useEffect(() => {
        dispatch(getTagsThunk());
    }, [dispatch]);

    return (
        <div className="tag-list">
            <h2> Your Tags</h2>
            <ul>
                {tags.length === 0 &&
                    <li>No tags found. Create a new tag to get started!</li>}
                {tags.map((tag) => (
                    <li key={tag.id}>
                        {/* link to tag details */}
                        <Link to={`/tags/${tag.id}`}>
                            {tag.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <Link to="/tags/new" className="add-tag-button">
                Add New Tag
            </Link>
        </div>
    );
};
export default TagList;
//Imports getTagsThunk  from your tagsThunk.js
//Renders Each tag as a list item, plus links to detail or edit views.
//Add a create button Link to Tag creation form.