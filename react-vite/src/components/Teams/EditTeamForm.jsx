import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadTeams, updateTeam } from "../../redux/teams";
import "./Teams.css";

function EditTeamForm() {
  const { teamId } = useParams();
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams.userTeams);
  const team = teams.find(team => team.id === parseInt(teamId));

  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("");
  const [leagueName, setLeagueName] = useState("");

  useEffect(() => {
    dispatch(loadTeams());
  }, [dispatch]);

  useEffect(() => {
    if (team) {
      setName(team.name);
      setPlatform(team.platform);
      setLeagueName(team.league_name);
    }
  }, [team]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTeam(teamId, { name, platform, league_name: leagueName }));
    console.log("Updating team:", { name, platform, leagueName });
  };

  if (!team) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit {team.name}</h1>
      
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

        <button type="submit">Update Team</button>
      </form>
    </div>
  );
}

export default EditTeamForm;