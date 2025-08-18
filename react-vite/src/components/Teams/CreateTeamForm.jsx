import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTeam } from "../../redux/teams";
import "./Teams.css";

function CreateTeamForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");
  const [leagueName, setLeagueName] = useState("");
  const [leagueSize, setLeagueSize] = useState("");
  const [scoringFormat, setScoringFormat] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teamData = {
      name,
      platform,
      league_name: leagueName,
      league_size: leagueSize,
      scoring_format: scoringFormat
    };

    await dispatch(createTeam(teamData));
    
    // Reset form
    setName("");
    setPlatform("");
    setLeagueName("");
    setLeagueSize("");
    setScoringFormat("");
  };

  return (
    <div>
      <h1>Create New Team</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Team Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Platform</label>
          <input
            type="text"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            placeholder="ESPN, Yahoo, Sleeper, etc."
          />
        </div>

        <div>
          <label>League Name</label>
          <input
            type="text"
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
          />
        </div>

        <div>
          <label>League Size</label>
          <input
            type="number"
            value={leagueSize}
            onChange={(e) => setLeagueSize(e.target.value)}
          />
        </div>

        <div>
          <label>Scoring Format</label>
          <input
            type="text"
            value={scoringFormat}
            onChange={(e) => setScoringFormat(e.target.value)}
            placeholder="Standard, PPR, Half-PPR"
          />
        </div>

        <button type="submit">Create Team</button>
      </form>
    </div>
  );
}

export default CreateTeamForm;