const GET_POSTS = 'community/GET_POSTS';
const ADD_POST = 'community/ADD_POST';
const UPDATE_POST = 'community/UPDATE_POST';
const DELETE_POST = 'community/DELETE_POST';

// Actionin'
const getPosts = (posts) => ({
  type: GET_POSTS,
  posts
});

const addPost = (post) => ({
  type: ADD_POST,
  post
});

const updatePost = (post) => ({
  type: UPDATE_POST,
  post
});

const deletePost = (postId) => ({
  type: DELETE_POST,
  postId
});

// Thunkin' it
export const loadPosts = () => async (dispatch) => {
  const response = await fetch('/api/community');
  
  if (response.ok) {
    const data = await response.json();
    dispatch(getPosts(data.posts));
  }
};

export const createPost = (postData) => async (dispatch) => {
  const response = await fetch('/api/community', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addPost(data));
  }
};

export const editPost = (postId, postData) => async (dispatch) => {
  const response = await fetch(`/api/community/${postId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updatePost(data));
  }
};

export const removePost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/community/${postId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(deletePost(postId));
  }
};

// Reducin'
const initialState = {
  posts: []
};

function communityReducer(state = initialState, action) {
  switch (action.type) {
    
    case GET_POSTS:
      return { ...state, posts: action.posts };
    
    case ADD_POST:
      return { ...state, posts: [...state.posts, action.post] };
    
    
    case UPDATE_POST:
      return { 
        ...state, 
        posts: state.posts.map(post => 
          post.id === action.post.id ? action.post : post
        )
      };
    
    
    case DELETE_POST:
      return { 
        ...state, 
        posts: state.posts.filter(post => post.id !== action.postId)
      };
    default:
      return state;
  }
}

export default communityReducer;