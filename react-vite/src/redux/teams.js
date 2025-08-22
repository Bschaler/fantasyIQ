const GET_TEAMS = 'teams/GET_TEAMS';
const ADD_TEAM = 'teams/ADD_TEAM';
const UPDATE_TEAM = 'teams/UPDATE_TEAM';
const DELETE_TEAM = 'teams/DELETE_TEAM';
// added error handlinh
const SET_ERROR = 'teams/SET_ERROR';
const CLEAR_ERROR = 'teams/CLEAR_ERROR';
const SET_LOADING = 'teams/SET_LOADING';

// Actionin'
const getTeams = (teams) => ({
  type: GET_TEAMS,
  teams
});

const addTeam = (team) => ({
  type: ADD_TEAM,
  team
});

const editTeam = (team) => ({
  type: UPDATE_TEAM,
  team
});

const deleteTeam = (teamId) => ({
  type: DELETE_TEAM,
  teamId
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
export const loadTeams = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(clearError());
  const response = await fetch('/api/teams',{
     credentials: 'include'
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getTeams(data.teams));
  } else {
      throw new Error('Failed to load teams');
    }
  } catch (error) {
    console.error('Load teams error:', error);
    dispatch(setError('Unable to load teams. Please try again.'));
  } finally {
    dispatch(setLoading(false));
  }
};

// CREATE
export const createTeam = (teamData) => async (dispatch) => {
  try {
    dispatch(clearError());
      console.log("creating tema...");  
  const response = await fetch('/api/teams', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    
    body: JSON.stringify(teamData)
  });

    console.log("Response:", response.status);

  if (response.ok) {
    const data = await response.json();
    dispatch(addTeam(data));
      return { success: true }; 
    } else {
      throw new Error('Failed to create team'); 
    }
  } catch (error) {
    console.error('Create team error:', error);
    dispatch(setError('Unable to create team. Please try again.'));
    return { success: false, error: error.message }; 
  }
};


// EDIT
export const updateTeam = (teamId, teamData) => async (dispatch) => {
try {
    dispatch(clearError());
  
  
    const response = await fetch(`/api/teams/${teamId}`, {

    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(teamData)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(editTeam(data));
      return { success: true }; 
    } else {
      throw new Error('Failed to update team'); 
    }
  } catch (error) {
    console.error('Update team error:', error);
    dispatch(setError('Unable to update team. Please try again.'));
    return { success: false, error: error.message };
  }
};

export const removeTeam = (teamId) => async (dispatch) => {
   try {
    dispatch(clearError());   
      console.log('trying to delete', teamId);

  const response = await fetch(`/api/teams/${teamId}`, {
    method: 'DELETE',
    credentials: 'include'
  });

 //   console.log('Delete status:', response.status); 
 // console.log('Delete ok??:', response.ok);

  if (response.ok) {
        console.log('Dispatching deleteTeam action');
    dispatch(deleteTeam(teamId));
      return { success: true }; 
    } else {
      throw new Error('Failed to delete team'); 
    }
  } catch (error) {
    console.error('Delete team error:', error);
    dispatch(setError('Unable to delete team. Please try again.'));
    return { success: false, error: error.message }; 
  }
};

// Reducin'
const initialState = {
  userTeams: [],
 loading: false,
  error: null
};

function teamsReducer(state = initialState, action) {
  switch (action.type) {
    
    case GET_TEAMS:
      return { ...state, userTeams: action.teams };
    
    case ADD_TEAM:
      return { ...state, userTeams: [...state.userTeams, action.team] };
    
    case UPDATE_TEAM:
      return { 
        ...state, 
        userTeams: state.userTeams.map(team => 
          team.id === action.team.id ? action.team : team
        )
      };
    
    case DELETE_TEAM:
      return { 
        ...state, 
        userTeams: state.userTeams.filter(team => team.id !== action.teamId)
      };
//error handilin
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




export default teamsReducer;

// Redux for team management - this was confusing at first but makes sense now
// The thunk pattern took me a hot minute to understand, but it takes me time. still need to understand thunk patterns better
// got the hang of it slowly but surely