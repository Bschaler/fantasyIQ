import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTeam } from "../../redux/teams";
import "./Teams.css";

function CreateTeamForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");
  const [leagueName, setLeagueName] = useState("");
  const [leagueSize, setLeagueSize] = useState("");
  const [scoringFormat, setScoringFormat] = useState("");

  const handleSubmit = async (e) => {
      console.log("Form submit started");
    e.preventDefault();

    if (!name || !platform || !leagueName || !leagueSize || !scoringFormat) {
            console.log("failed - missing fields");
      alert("Please fill out all fields before submitting.");
      return;
    }


    const teamData = {
      name,
      platform,
      league_name: leagueName,
      league_size: leagueSize,
      scoring_format: scoringFormat
    };

    await dispatch(createTeam(teamData));
     // console.log("Team created successfully, redirecting...");
  navigate('/teams');}

return (
  <div className="create-form-container">
    <h1 className="form-title">Create New Team</h1>
    
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label>Team Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label>Platform</label>
        <input
          type="text"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          placeholder="ESPN, Yahoo, Sleeper, etc."
        />
      </div>

      <div className="form-field">
        <label>League Name</label>
        <input
          type="text"
          value={leagueName}
          onChange={(e) => setLeagueName(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label>League Size</label>
        <input
          type="number"
          value={leagueSize}
          onChange={(e) => setLeagueSize(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label>Scoring Format</label>
        <input
          type="text"
          value={scoringFormat}
          onChange={(e) => setScoringFormat(e.target.value)}
          placeholder="Standard, PPR, Half-PPR"
        />
      </div>
<div className="form-buttons">
  <button type="submit" className="create-team-btn">Create Team</button>
  <button type="button" className="cancel-team-btn" onClick={() => navigate('/teams')}>Go back</button>
</div>
    </form>
  </div>
);
}

export default CreateTeamForm;

// This component handles creating new fantasy teams
// Had some trouble with the form validation at first but got it working