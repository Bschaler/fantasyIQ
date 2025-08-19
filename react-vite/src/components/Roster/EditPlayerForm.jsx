{/* basicallt same as edit trade form, make sure to navigate back to roster when changes are made */}

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadPlayers, editPlayer } from "../../redux/roster";

function EditPlayerForm() {
  const { playerId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const players = useSelector((state) => state.roster.players);
  const player = players.find(player => player.id === parseInt(playerId));

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [nflTeam, setNflTeam] = useState("");
  const [rosterPosition, setRosterPosition] = useState("");

  useEffect(() => {
    dispatch(loadPlayers());
  }, [dispatch]);

  useEffect(() => {
    if (player) {
      setName(player.name);
      setPosition(player.position);
      setNflTeam(player.nfl_team);
      setRosterPosition(player.roster_position);
    }
  }, [player]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const playerData = {
      name,
      position,
      nfl_team: nflTeam,
      roster_position: rosterPosition
    };

    dispatch(editPlayer(playerId, playerData));
    navigate('/roster');
  };

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Player</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Player Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>

        <div>
          <label>NFL Team</label>
          <input
            type="text"
            value={nflTeam}
            onChange={(e) => setNflTeam(e.target.value)}
          />
        </div>

        <div>
          <label>Roster Position</label>
          <input
            type="text"
            value={rosterPosition}
            onChange={(e) => setRosterPosition(e.target.value)}
          />
        </div>

        <button type="submit">Update Player</button>
      </form>
    </div>
  );
}

export default EditPlayerForm;