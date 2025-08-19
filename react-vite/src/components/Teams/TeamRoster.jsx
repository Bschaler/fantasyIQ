import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadPlayers, removePlayer } from "../../redux/roster";

function TeamRoster() {
  const { teamId } = useParams();
  const dispatch = useDispatch();
  const allPlayers = useSelector((state) => state.roster.players);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(loadPlayers());
  }, [dispatch]);

  // Filters players for this specific team
  const teamPlayers = allPlayers.filter(player => player.team_id === parseInt(teamId));
  const teamName = teamPlayers.length > 0 ? teamPlayers[0].team_name : 'Team';

  const handleDelete = (playerId) => {
    if (window.confirm("Remove this player from roster?")) {
      dispatch(removePlayer(playerId));
    }
  };

  if (!user) {
    return <div>Please log in to manage your roster</div>;
  }

  return (
    <div>
      <h1>{teamName} Roster</h1>
      
      {teamPlayers.length === 0 ? (
        <p>No players on this team yet! Add your first player.</p>
      ) : (
        <div>
          {teamPlayers.map((player) => (
            <div key={player.id}>
              <h3>{player.name}</h3>
              <p><strong>Position:</strong> {player.position}</p>
              <p><strong>Team:</strong> {player.nfl_team}</p>
              <p><strong>Roster Spot:</strong> {player.roster_position}</p>
              
              <button>Edit</button>
              <button onClick={() => handleDelete(player.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
      
      <button onClick={() => window.location.href = '/teams'}>Back to Teams</button>
    </div>
  );
}

export default TeamRoster;