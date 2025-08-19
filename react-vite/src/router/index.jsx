import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import TeamsIndex from '../components/Teams/TeamIndex';
import CreateTeamForm from '../components/Teams/CreateTeamForm';
import WatchlistIndex from '../components/Watchlist/WatchlistIndex';
import CreateNoteForm from '../components/Watchlist/CreateNoteForm';
import TradesIndex from '../components/Trades/TradesIndex';
//import CreateTradeForm from '../components/Trades/CreateTradeForm';
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
     /* {
        path: "trades/new",
        element: <CreateTradeForm />,
      },*/
    ],
  },
]);