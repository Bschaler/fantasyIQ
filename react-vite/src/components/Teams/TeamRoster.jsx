import { useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadPlayers, removePlayer } from "../../redux/roster";
import "./Teams.css";


function TeamRoster() {
  const { teamId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allPlayers = useSelector((state) => state.roster.players);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(loadPlayers());
  }, [dispatch]);

  // Filters players for this specific team
  const teamPlayers = allPlayers.filter(player => player.team_id === parseInt(teamId));
  const teamName = teamPlayers.length > 0 ? teamPlayers[0].team_name : 'Team';

const handleEdit = (playerId) => {
  navigate(`/teams/${teamId}/roster/${playerId}/edit`);
};

  const handleDelete = (playerId) => {
    if (window.confirm("Remove this player from roster?")) {
      dispatch(removePlayer(playerId));
    }
  };
    const handleAddPlayer = () => {
    navigate(`/teams/${teamId}/roster/new`); // Navigates to add player form
  };

  if (!user) {
    return <div>Please log in to manage your roster</div>;
  }

  return (
    <div className="roster-container">
      <div className="roster-header">
        <h1 className="roster-title">{teamName} Roster</h1>
        <button className="add-player-btn" onClick={handleAddPlayer}>Add Player</button>
      </div>
      
      {teamPlayers.length === 0 ? (
        <div className="empty-roster">
          <p>No players on this team yet! Add your first player.</p>
        </div>
      ) : (
        <div className="players-container">
          {teamPlayers.map((player) => (
            <div key={player.id} className="player-card">
              <div className="player-info">
                <h3 className="player-name">{player.name}</h3>
                <p className="player-detail">Position: {player.position}</p>
                <p className="player-detail">Team: {player.nfl_team}</p>
                <p className="player-detail">Roster Spot: {player.roster_position}</p>
              </div>
              
              <div className="player-buttons">
                <button className="edit-btn" onClick={() => handleEdit(player.id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(player.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="roster-footer">
        <button className="back-btn" onClick={() => navigate('/teams')}>Back to Teams</button>
      </div>
    </div>
  );
}
export default TeamRoster;