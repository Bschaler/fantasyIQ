const GET_TEAMS = 'teams/GET_TEAMS';
const ADD_TEAM = 'teams/ADD_TEAM';
const UPDATE_TEAM = 'teams/UPDATE_TEAM';
const DELETE_TEAM = 'teams/DELETE_TEAM';

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

// Thunkin'
export const loadTeams = () => async (dispatch) => {
  const response = await fetch('/api/teams',{
     credentials: 'include'
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getTeams(data.teams));
  }
};

export const createTeam = (teamData) => async (dispatch) => {
  const response = await fetch('/api/teams', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    
    body: JSON.stringify(teamData)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addTeam(data));
  }
};

export const updateTeam = (teamId, teamData) => async (dispatch) => {
  const response = await fetch(`/api/teams/${teamId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(teamData)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(editTeam(data));
  }
};

export const removeTeam = (teamId) => async (dispatch) => {
      console.log('trying to delete', teamId);

  const response = await fetch(`/api/teams/${teamId}`, {
    method: 'DELETE',
    credentials: 'include'
  });

    console.log('Delete status:', response.status); 
  console.log('Delete ok??:', response.ok);

  if (response.ok) {
        console.log('Dispatching deleteTeam action');
    dispatch(deleteTeam(teamId));
    } else {
    console.log('Delete failed:', response.status);
    const errorData = await response.text();
    console.log('Error details:', errorData);
  }
};

// Reducin'
const initialState = {
  userTeams: []
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
    default:
      return state;
  }
}

export default teamsReducer;