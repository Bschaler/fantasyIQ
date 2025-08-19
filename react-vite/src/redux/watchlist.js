
// PLAYER NOTES aka my "watchlist"
const GET_NOTES = 'watchlist/GET_NOTES';
const ADD_NOTE = 'watchlist/ADD_NOTE';
const UPDATE_NOTE = 'watchlist/UPDATE_NOTE';
const DELETE_NOTE = 'watchlist/DELETE_NOTE';


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

// Thunkin'
export const loadNotes = () => async (dispatch) => {
  const response = await fetch('/api/notes');
  
  if (response.ok) {
    const data = await response.json();
    dispatch(getNotes(data.notes));
  }
};

export const createNote = (noteData) => async (dispatch) => {
  const response = await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(noteData)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addNote(data));
  }
};

export const editNote = (noteId, noteData) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(noteData)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateNote(data));
    return data;
  }
};

export const removeNote = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(deleteNote(noteId));
    return noteId;
  }
};
// Reducin'
const initialState = {
  playerNotes: []
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
      
    default:
      return state;
  }
}

export default watchlistReducer;