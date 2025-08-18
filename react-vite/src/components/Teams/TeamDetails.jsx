import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadTeams } from "../../redux/teams";
import "./Teams.css";

function TeamDetails() {
  const { teamId } = useParams();
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams.userTeams);
  
  const team = teams.find(team => team.id === parseInt(teamId));

  useEffect(() => {
    dispatch(loadTeams());
  }, [dispatch]);

  if (!team) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{team.name}</h1>
      <p>Platform: {team.platform}</p>
      <p>League: {team.league_name}</p>
      <p>Size: {team.league_size} teams</p>
      <p>Scoring: {team.scoring_format}</p>
      
      <h3>Team Roster</h3>
      <p>Players will go here...</p>
    </div>
  );
}

export default TeamDetails;