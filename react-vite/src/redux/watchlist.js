
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

// Reducin'
const initialState = {
  playerNotes: []
};

function watchlistReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTES:
      return { ...state, playerNotes: action.notes };
    case ADD_NOTE:
      return { ...state, playerNotes: [...state.playerNotes, action.note] };
    case UPDATE_NOTE:
      return { 
        ...state, 
        playerNotes: state.playerNotes.map(note => 
          note.id === action.note.id ? action.note : note
        )
      };
    case DELETE_NOTE:
      return { 
        ...state, 
        playerNotes: state.playerNotes.filter(note => note.id !== action.noteId)
      };
    default:
      return state;
  }
}

export default watchlistReducer;