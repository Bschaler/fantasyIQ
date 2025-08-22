
// PLAYER NOTES aka my "watchlist"
const GET_NOTES = 'watchlist/GET_NOTES';
const ADD_NOTE = 'watchlist/ADD_NOTE';
const UPDATE_NOTE = 'watchlist/UPDATE_NOTE';
const DELETE_NOTE = 'watchlist/DELETE_NOTE';

const SET_ERROR = 'watchlist/SET_ERROR';
const CLEAR_ERROR = 'watchlist/CLEAR_ERROR';
const SET_LOADING = 'watchlist/SET_LOADING';


const getNotes = (notes) => ({
  type: GET_NOTES,
  notes
});
const addNote = (note) => ({
  type: ADD_NOTE,
  note
});

const updateNote = (note) => ({
  type: UPDATE_NOTE,
  note
});

const deleteNote = (noteId) => ({
  type: DELETE_NOTE,
  noteId
});

const setError = (error) => ({
  type: SET_ERROR,
  error
});

const clearError = () => ({
  type: CLEAR_ERROR
});

const setLoading = (loading) => ({
  type: SET_LOADING,
  loading
});

// Thunkin'
export const loadNotes = () => async (dispatch) => {
      try {
    dispatch(setLoading(true));
    dispatch(clearError());


  const response = await fetch('/api/notes');
  
  if (response.ok) {
    const data = await response.json();
    dispatch(getNotes(data.notes));
  }else {
   console.log("Failed to load the notes from server");
      throw new Error('Failed to load notes');
    }
  } catch (error) {
    console.error('Load notes error:', error);
    dispatch(setError('Unable to load watchlist.try again.'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createNote = (noteData) => async (dispatch) => {

      try {
    dispatch(clearError());

  const response = await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(noteData)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addNote(data));
        return { success: true }; 
    } else {
      throw new Error('Failed to create note'); 
    }
  } catch (error) {
    console.error('note error:', error);
    dispatch(setError('Unable to create your note. Please try again.'));
    return { success: false, error: error.message }; 
  }
};

export const editNote = (noteId, noteData) => async (dispatch) => {
      try {
    dispatch(clearError());
  
  
    const response = await fetch(`/api/notes/${noteId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(noteData)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateNote(data));
       return { success: true, data }; 
    } else {
      throw new Error('Failed to update the note');  
    }
  } catch (error) {
console.error('Edit note error:', error);

    dispatch(setError('Cant update note. try again.'));
    return { success: false, error: error.message }; 
  }
};


export const removeNote = (noteId) => async (dispatch) => {
     try {
    dispatch(clearError());


  const response = await fetch(`/api/notes/${noteId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(deleteNote(noteId));
      return { success: true, noteId }; 
    } else {
      throw new Error('Failed to delete note');
    }
  } catch (error) {
    console.error('Remove note error:', error);

    dispatch(setError('Unable to delete note. Please try again.'));
    return { success: false, error: error.message }; 
  }
};


// Reducin'
const initialState = {
  playerNotes: [],
  loading: false,
  error: null
};

function watchlistReducer(state = initialState, action) {
  switch (action.type) {      
    case GET_NOTES: {   
console.log('setting notes:', action.notes);
      return { 
        ...state, 
        playerNotes: action.notes,
        loading: false 
      };
    }
    case ADD_NOTE:{
      console.log('adding note:', action.note);
    const newNotes = [...state.playerNotes, action.note];
      return { 
        ...state, 
        playerNotes: newNotes 
      };
    }

    
    case UPDATE_NOTE:{
        console.log('updating note:', action.note);
      const updatedNotes = state.playerNotes.map(note => {
        if (note.id === action.note.id) {
          return action.note;
    } else {
          return note;
        }
      });
      return { 
        ...state, 
        playerNotes: updatedNotes 
      };
    }
    
    case DELETE_NOTE:{
      console.log('deleting note:', action.noteId);
    const filteredNotes = state.playerNotes.filter(note => {
        return note.id !== action.noteId;
      });
      return { 
        ...state, 
        playerNotes: filteredNotes 
      };
    }
      
    case SET_ERROR:
      return { ...state, error: action.error };
    
    case CLEAR_ERROR:
      return { ...state, error: null };
    
    case SET_LOADING:
      return { ...state, loading: action.loading };
      
    
      default:
      return state;
  }
}

export default watchlistReducer;
// TODO: fix this later  
// TODONE: fixed