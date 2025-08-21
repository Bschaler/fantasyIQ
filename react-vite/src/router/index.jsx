import { createBrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch  } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadTeams } from "../redux/teams";
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import TeamsIndex from '../components/Teams/TeamIndex';
import CreateTeamForm from '../components/Teams/CreateTeamForm';
import TeamRoster from '../components/Teams/TeamRoster';
import EditTeamForm from '../components/Teams/EditTeamForm'; 
import WatchlistIndex from '../components/Watchlist/WatchlistIndex';
import CreateNoteForm from '../components/Watchlist/CreateNoteForm';
import EditNoteForm from '../components/Watchlist/EditNoteForm';
import TradesIndex from '../components/Trades/TradesIndex';
import CreateTradeForm from '../components/Trades/CreateTradeForm';
import EditTradeForm from '../components/Trades/EditTradeForm'; 
import DeleteTrade from '../components/Trades/DeleteTrade';
import CreatePlayerForm from '../components/Teams/CreatePlayerForm'; 
import EditPlayerForm from '../components/Teams/EditPlayerForm';    
import CommunityIndex from '../components/Community/CommunityIndex';
import CreatePostForm from '../components/Community/CreatePostForm';
import EditPostForm from '../components/Community/EditPostForm';
import DeletePost from '../components/Community/DeletePost';  
import Layout from './Layout';



function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);
  const teams = useSelector(state => state.teams.userTeams);

  // Load teams when component mounts
  useEffect(() => {
    if (user) {
      dispatch(loadTeams());
    }
  }, [dispatch, user]);

  if (!user) {
    return <div>Please log in</div>;
  }

  // Function to handle View button clicks
  const handleViewTeam = (teamId) => {
    navigate(`/teams/${teamId}/roster`);
  };

  return (
    <div className="dashboard">
      <h1 className="welcome-title">Welcome back, {user.username}</h1>

      <section className="my-teams-section">
        <h2 className="section-title">My Teams:</h2>
        <div className="team-cards-container">
          {teams && teams.length > 0 ? (
            teams.map(team => (
              <div key={team.id} className="team-card">
                <div className="team-name">{team.name}</div>
                <div className="team-record">
                  {team.platform} - {team.scoring_format}
                </div>
                <button 
                  className="view-btn" 
                  onClick={() => handleViewTeam(team.id)}
                >
                  View
                </button>
              </div>
            ))
          ) : (
            // Show placeholder if no teams
            <div className="team-card">
              <div className="team-name">No teams yet</div>
              <div className="team-record">Create your first team!</div>
              <button 
                className="view-btn" 
                onClick={() => navigate('/teams/new')}
              >
                Create Team
              </button>
            </div>
          )}
        </div>
      </section>

      <div className="activity-blog-container">
        <section className="activity-section">
          <h3>Your recent activity:</h3>
          <ul className="activity-list">
            <li>Knsfkfsih</li>
            <li>Jdjfsfkbf</li>
            <li>Nsfksnfk</li>
          </ul>
        </section>

        <section className="blog-section">
          <h3>Blog:</h3>
          <ul className="blog-list">
            <li>Jdkfjk</li>
            <li>Fvnsjgbejj</li>
            <li>kfmnknkrem</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "teams",
        element: <TeamsIndex />,
      },
      {
        path: "teams/new",
        element: <CreateTeamForm />,
      },
      {
    path: "teams/:teamId/roster/new",
     element: <CreatePlayerForm />,
      },
      {
        path: "teams/:teamId/roster",
        element: <TeamRoster />,
      },
      {
    path: "teams/:teamId/edit",
    element: <EditTeamForm />,
      },
      {
      path: "teams/:teamId/roster/:playerId/edit",
      element: <EditPlayerForm />,
      },

      {
        path: "watchlist",
        element: <WatchlistIndex />,
      },
      {
        path: "watchlist/new",
        element: <CreateNoteForm />,

      },
      {
      path: "watchlist/:noteId/edit", 
       element: <EditNoteForm />,    
},
      {
        path: "trades",
        element: <TradesIndex />,
      },
      {
        path: "trades/new",
        element: <CreateTradeForm />,
      },
      {
        path: "trades/:tradeId/edit", 
        element: <EditTradeForm />,
      },
      {
        path: "trades/:tradeId/delete",
        element: <DeleteTrade />,
      },
 

      {
        path: "community",
        element: <CommunityIndex />,
      },
      {
        path: "community/new",
        element: <CreatePostForm />,
      },
      {
        path: "community/:postId/edit",
        element: <EditPostForm />,
      },
      {
        path: "community/:postId/delete",
        element: <DeletePost />,
      },
    ],
  },
]);