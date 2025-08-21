import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts, editPost } from "../../redux/community";

function EditPostForm() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.community.posts);
  const post = posts.find(post => post.id === parseInt(postId));

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category);
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      category
    };

    dispatch(editPost(postId, postData));
    window.location.href = '/community';
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Post</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Post Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
          />
        </div>

        <div>
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default EditPostForm;