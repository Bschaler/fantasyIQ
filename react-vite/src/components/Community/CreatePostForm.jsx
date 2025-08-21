import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/community";

function CreatePostForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      category
    };

    dispatch(createPost(postData));
    
    // Reset form
    setTitle("");
    setContent("");
    setCategory("");
    
    // Go back to community
    window.location.href = '/community';
  };

  return (
    <div>
      <h1>Create Community Post</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Post Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Trade Analysis, Player Discussion, etc."
          />
        </div>

        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your fantasy football thoughts..."
            rows="6"
          />
        </div>

        <div>
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Trade Analysis, Waiver Wire, etc."
          />
        </div>

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePostForm;