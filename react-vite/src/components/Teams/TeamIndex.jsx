import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTeams } from "../../redux/teams";
import "./Teams.css";

function TeamsIndex() {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams.userTeams);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(loadTeams());
  }, [dispatch]);

  if (!user) {
    return <div>You must be logged in to see your teams</div>;
  }

  return (
    <div>
      <h1>My Fantasy Teams</h1>
      
      {teams.length === 0 ? (
        <p>No teams yet! Create your first team.</p>
      ) : (
        <div>
          {teams.map((team) => (
            <div key={team.id}>
              <h3>{team.name}</h3>
              <p>Platform: {team.platform}</p>
              <p>League: {team.league_name}</p>
              <p>Size: {team.league_size} teams</p>
              <p>Scoring: {team.scoring_format}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeamsIndex;