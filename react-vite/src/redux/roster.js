const GET_PLAYERS = 'roster/GET_PLAYERS';
const ADD_PLAYER = 'roster/ADD_PLAYER';
const UPDATE_PLAYER = 'roster/UPDATE_PLAYER';
const DELETE_PLAYER = 'roster/DELETE_PLAYER';

// Actionin'
const getPlayers = (players) => ({
  type: GET_PLAYERS,
  players
});

const addPlayer = (player) => ({
  type: ADD_PLAYER,
  player
});

const updatePlayer = (player) => ({
  type: UPDATE_PLAYER,
  player
});

const deletePlayer = (playerId) => ({
  type: DELETE_PLAYER,
  playerId
});

// Thunkin'
export const loadPlayers = () => async (dispatch) => {
  const response = await fetch('/api/roster');
  
  if (response.ok) {
    const data = await response.json();
    dispatch(getPlayers(data.players));
  }
};

export const createPlayer = (playerData) => async (dispatch) => {
  const response = await fetch('/api/roster', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(playerData)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addPlayer(data));
  }
};

// Reducin'
const initialState = {
  players: []
};

function rosterReducer(state = initialState, action) {
  switch (action.type) {
    
    case GET_PLAYERS:
      return { ...state, players: action.players };
    
    case ADD_PLAYER:
      return { ...state, players: [...state.players, action.player] };
    
    case UPDATE_PLAYER:
      return { 
        ...state, 
        players: state.players.map(player => 
          player.id === action.player.id ? action.player : player
        )
      };
    
    case DELETE_PLAYER:
      return { 
        ...state, 
        players: state.players.filter(player => player.id !== action.playerId)
      };
    default:
      return state;
  }
}

export default rosterReducer;