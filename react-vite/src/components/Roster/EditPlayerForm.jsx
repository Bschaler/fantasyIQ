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
      team_id: player.team_id,
      name,
      position,
      nfl_team: nflTeam,
      roster_position: rosterPosition
    };

    await dispatch(editPlayer(playerId, playerData));
    if (player && player.team_id) {
      navigate(`/teams/${player.team_id}/roster`);
    } else {
      navigate('/teams'); 
    }
  };

    const handleCancel = () => {

    if (player && player.team_id) {
      navigate(`/teams/${player.team_id}/roster`);
    } else {
      navigate('/teams');
    }
  };

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-player-container">
      <h1 className="edit-player-title">Edit Player</h1>
      
      <form className="edit-player-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Player Name</label>
          <input
            className="form-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Position</label>
          <input
            className="form-input"
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">NFL Team</label>
          <input
            className="form-input"
            type="text"
            value={nflTeam}
            onChange={(e) => setNflTeam(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Roster Position</label>
          <input
            className="form-input"
            type="text"
            value={rosterPosition}
            onChange={(e) => setRosterPosition(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" type="submit">
            Update Player
          </button>
          <button className="btn btn-secondary" type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}


export default EditPlayerForm;