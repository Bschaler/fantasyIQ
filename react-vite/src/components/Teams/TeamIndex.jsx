import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadTeams, removeTeam } from "../../redux/teams";
import "./Teams.css";

function TeamsIndex() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teams = useSelector((state) => state.teams.userTeams);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(loadTeams());
  }, [dispatch]);

    const handleDelete = (teamId) => { // will delete the team for good... which depending on how the season is going might be for the better
    if (window.confirm("Delete this team?")) {
      dispatch(removeTeam(teamId));
    }
  };

    const handleEdit = (teamId) => {
    navigate(`/teams/${teamId}/edit`); // allows league to be edited and redirected back to the my teams page
  };

    const handleAddTeam = () => {
    navigate('/teams/new'); // Navigates
  };


  if (!user) {
    return <div>You must be logged in to see your teams</div>;
  }

return (
  <div className="teams-container">
    <div className="teams-header">
      <h1 className="teams-title">My Fantasy Teams</h1>
            <button className="add-team-btn" onClick={handleAddTeam}>
        Add Team
      </button>
    </div>
  
    
    {teams.length === 0 ? (
      <div className="empty-teams">
        <p>No teams yet! Create your first team.</p>
      </div>
    ) : (
      <div className="teams-list">
        {teams.map((team) => (
          <div key={team.id} className="team-card">
            <div className="team-info">
              <h3 className="team-name">{team.name}</h3>
              <p className="team-detail">Platform: {team.platform}</p>
              <p className="team-detail">League: {team.league_name}</p>
              <p className="team-detail">Size: {team.league_size} teams</p>
              <p className="team-detail">Scoring: {team.scoring_format}</p>
            </div>
            
            <div className="team-buttons">
              <button className="view-roster-btn" onClick={() => window.location.href = `/teams/${team.id}/roster`}>
                View Roster
              </button>
                <button className="edit-btn" onClick={() => handleEdit(team.id)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(team.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
}
export default TeamsIndex;