import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadPosts, removePost } from "../../redux/community";
import "./Community.css";



function CommunityIndex() {
  const dispatch = useDispatch();
    const navigate = useNavigate();
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


  const handleCreatePost = () => {
    navigate('/community/new');
  };

  if (!user) {
    return <div>Please log in to view community posts</div>;
  }

 return (
    <div className="community-container">
      <div className="community-header">
        <h1 className="community-title">Community Posts</h1>
        <button className="add-post-btn" onClick={handleCreatePost}>
          Create Post
        </button>
      </div>
      
      {posts.length === 0 ? (
        <div className="empty-community">
          <p>No posts yet! Create the first community post.</p>
        </div>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p><strong>By:</strong> {post.author_name}</p>
              <p>{post.content}</p>
              <p><strong>Category:</strong> {post.category}</p>
              
              
              {user.id === post.user_id &&  (
              
              
              <div className="post-buttons">
                <button className="edit-btn" onClick={() => navigate(`/community/${post.id}/edit`)}>Edit</button> 
                <button className="delete-btn" onClick={() => handleDelete(post.id)}>Delete</button>
              </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommunityIndex;