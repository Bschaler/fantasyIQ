import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPlayer } from "../../redux/roster";

function CreatePlayerForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [nflTeam, setNflTeam] = useState("");
  const [rosterPosition, setRosterPosition] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const playerData = {
      name,
      position,
      nfl_team: nflTeam,
      roster_position: rosterPosition
    };

    dispatch(createPlayer(playerData));
    navigate('/roster');
  };

  return (
    <div>
      <h1>Add Player to Roster</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Player Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Josh Allen, Saquon Barkley, etc."
          />
        </div>

        <div>
          <label>Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="QB, RB, WR, TE, etc."
          />
        </div>

        <div>
          <label>NFL Team</label>
          <input
            type="text"
            value={nflTeam}
            onChange={(e) => setNflTeam(e.target.value)}
            placeholder="BUF, PHI, KC, etc."
          />
        </div>

        <div>
          <label>Roster Position</label>
          <input
            type="text"
            value={rosterPosition}
            onChange={(e) => setRosterPosition(e.target.value)}
            placeholder="Starter, Bench, IR, etc."
          />
        </div>

        <button type="submit">Add Player</button>
      </form>
    </div>
  );
}

export default CreatePlayerForm;