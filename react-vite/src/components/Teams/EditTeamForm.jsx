import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadTeams, updateTeam } from "../../redux/teams";
import "./Teams.css";

function EditTeamForm() {
  const { teamId } = useParams();
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const teams = useSelector((state) => state.teams.userTeams);
  const team = teams.find(team => team.id === parseInt(teamId));

  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");
  const [leagueName, setLeagueName] = useState("");
  const [leagueSize, setLeagueSize] = useState("");
  const [scoringFormat, setScoringFormat] = useState("");
  
  
  useEffect(() => {
    dispatch(loadTeams());
  }, [dispatch]);

  useEffect(() => {
    if (team) {
      setName(team.name);
      setPlatform(team.platform);
      setLeagueName(team.league_name);
      setLeagueSize(team.league_size); 
      setScoringFormat(team.scoring_format);
    }
  }, [team]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teamData = {
      name,
      platform,
      league_name: leagueName,
      league_size: leagueSize,
      scoring_format: scoringFormat 
    };
    
    await dispatch(updateTeam(teamId, teamData));
    navigate('/teams'); 
  };

  if (!team) {
    return <div>Loading...</div>;
  }

return (
  <div className="edit-form-container">
    <div className="edit-form-header">
      <h1 className="edit-form-title">Edit {team.name}</h1>
    </div>
    
    <div className="edit-form-content">
      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Team Name</label>
          <input
            className="form-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Platform</label>
          <input
            className="form-input"
            type="text"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">League Name</label>
          <input
            className="form-input"
            type="text"
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
          />
        </div>

        <div className="form-buttons">
          <button className="update-btn" type="submit">Update Team</button>
          <button className="cancel-btn" type="button" onClick={() => navigate('/teams')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);
}

export default EditTeamForm;