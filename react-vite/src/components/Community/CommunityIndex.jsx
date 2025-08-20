import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts, removePost } from "../../redux/community";

function CommunityIndex() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.community.posts);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  const handleDelete = (postId) => {
    if (window.confirm("Delete this post?")) {
      dispatch(removePost(postId));
    }
  };

  if (!user) {
    return <div>Please log in to view community posts</div>;
  }

  return (
    <div>
      <h1>Community Posts</h1>
      
      {posts.length === 0 ? (
        <p>No posts yet! Create the first community post.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p><strong>By:</strong> {post.author_name}</p>
              <p>{post.content}</p>
              <p><strong>Category:</strong> {post.category}</p>
              
             <button onClick={() => window.location.href = `/community/${post.id}/edit`}>Edit</button> 
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommunityIndex;