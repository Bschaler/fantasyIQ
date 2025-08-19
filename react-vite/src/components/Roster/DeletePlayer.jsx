import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadPlayers, removePlayer } from "../../redux/roster";
import { useEffect } from "react";

function DeletePlayer() {
  const { playerId } = useParams();
  const dispatch = useDispatch();
  const players = useSelector((state) => state.roster.players);
  const player = players.find(player => player.id === parseInt(playerId));

  useEffect(() => {
    dispatch(loadPlayers());
  }, [dispatch]);

  const handleDelete = async () => {
    await dispatch(removePlayer(playerId));//navigate oit to roster
  
  };

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Remove Player from Roster</h1>
      
      <div>
        <p>Are you sure you want to remove this player?</p>
        
        <div>
          <h3>{player.name}</h3>
          <p><strong>Position:</strong> {player.position}</p>
          <p><strong>NFL Team:</strong> {player.nfl_team}</p>
          <p><strong>Roster Position:</strong> {player.roster_position}</p>
        </div>

        <button onClick={handleDelete}>Delete Player</button>
        <button>Cancel</button>
      </div>
    </div>
  );
}

export default DeletePlayer;