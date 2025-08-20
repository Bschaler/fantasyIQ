import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import TeamsIndex from '../components/Teams/TeamIndex';
import CreateTeamForm from '../components/Teams/CreateTeamForm';
import TeamRoster from '../components/Teams/TeamRoster';
import WatchlistIndex from '../components/Watchlist/WatchlistIndex';
import CreateNoteForm from '../components/Watchlist/CreateNoteForm';
import TradesIndex from '../components/Trades/TradesIndex';
import CreateTradeForm from '../components/Trades/CreateTradeForm';
import EditTradeForm from '../components/Trades/EditTradeForm'; 
import DeleteTrade from '../components/Trades/DeleteTrade';
import RosterIndex from '../components/Roster/RosterIndex';    
import CreatePlayerForm from '../components/Roster/CreatePlayerForm'; 
import EditPlayerForm from '../components/Roster/EditPlayerForm';    
import DeletePlayer from '../components/Roster/DeletePlayer'; 
import CommunityIndex from '../components/Community/CommunityIndex';
import CreatePostForm from '../components/Community/CreatePostForm';
import EditPostForm from '../components/Community/EditPostForm';
import DeletePost from '../components/Community/DeletePost';  
import Layout from './Layout';

function Home() {
  return (
    <div>
      <h1>Welcome to FantasyIQ!</h1>
      <div>
        <h2>Your Fantasy Football Tools:</h2>
        
        <div>
          <h3>Teams</h3>
          <a href="/teams">View My Teams</a> | 
          <a href="/teams/new"> Create New Team</a>
        </div>
        
        <div>
          <h3>Player Watchlist</h3>
          <a href="/watchlist">View My Notes</a> | 
          <a href="/watchlist/new"> Add Player Note</a>
        </div>
        
        <div>
          <h3>Trade Scenarios</h3>
          <a href="/trades">View My Trades</a> | 
          <a href="/trades/new"> Create Trade Idea</a>
        </div>
        
        <div>                
          <h3>Team Roster</h3>
          <a href="/roster">Manage Roster</a> | 
          <a href="/roster/new"> Add Player</a>
        </div>
        
          <div>
          <h3>Community</h3>
            <a href="/community">View Posts</a> | 
            <a href="/community/new"> Create Post</a>
        </div>
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
    path: "teams/:teamId/roster",
    element: <TeamRoster />,
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
        path: "roster",
        element: <RosterIndex />,
      },
      {
        path: "roster/new",
        element: <CreatePlayerForm />,
      },
      {
        path: "roster/:playerId/edit",
        element: <EditPlayerForm />,
      },
      {
        path: "roster/:playerId/delete",
        element: <DeletePlayer />,
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