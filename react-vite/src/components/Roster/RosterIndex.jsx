import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPlayers, removePlayer } from "../../redux/roster";


function RosterIndex() {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.roster.players);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(loadPlayers());
  }, [dispatch]);

  const handleDelete = (playerId) => {
    if (window.confirm("Remove this player from roster?")) {
      dispatch(removePlayer(playerId));
    }
  };

  if (!user) {
    return <div>Please log in to manage your roster</div>;
  }

  // Group players by team
  const playersByTeam = players.reduce((acc, player) => {
    const teamName = player.team_name;
    if (!acc[teamName]) {
      acc[teamName] = [];
    }
    acc[teamName].push(player);
    return acc;
  }, {});

  return (
    <div>
      <h1>My Team Rosters</h1>
      
      {Object.keys(playersByTeam).length === 0 ? (
        <p>No players on roster yet! Add your first player.</p>
      ) : (
        <div>
          {Object.keys(playersByTeam).map((teamName) => (
            <div key={teamName}>
              <h2>{teamName}</h2>
              {playersByTeam[teamName].map((player) => (
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
          ))}
        </div>
      )}
    </div>
  );
}

export default RosterIndex;