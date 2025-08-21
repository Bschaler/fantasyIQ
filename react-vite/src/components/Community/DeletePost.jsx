import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts, removePost } from "../../redux/community";
import { useEffect } from "react";

function DeletePost() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.community.posts);
  const post = posts.find(post => post.id === parseInt(postId));

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  const handleDelete = async () => {
    await dispatch(removePost(postId));
    // Could navigate back here if you want
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Delete Post</h1>
      
      <div>
        <p>Are you sure you want to delete this post?</p>
        
        <div>
          <h3>{post.title}</h3>
          <p><strong>By:</strong> {post.author_name}</p>
          <p><strong>Content:</strong> {post.content}</p>
          <p><strong>Category:</strong> {post.category}</p>
        </div>

        <button onClick={handleDelete}>Yes, Delete Post</button>
        <button>Cancel</button>
      </div>
    </div>
  );
}

export default DeletePost;