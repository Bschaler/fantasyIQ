import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadNotes } from "../../redux/watchlist";

function WatchlistIndex() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.watchlist.playerNotes);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(loadNotes());
  }, [dispatch]);

  if (!user) {
    return <div>Must be logged in to see your player notes</div>;
  }

  return (
    <div>
      <h1>My Player Watchlist</h1>
      
      {notes.length === 0 ? (
        <p>No player notes yet! Add a player and note.</p>
      ) : (
        <div>
          {notes.map((note) => (
            <div key={note.id}>
              <h3>{note.player_name}</h3>
              <p><strong>Position:</strong> {note.position}</p>
              <p><strong>Team:</strong> {note.team_abbr}</p>
              <p><strong>Interest Level:</strong> {note.interest_level}</p>
              <p><strong>Notes:</strong> {note.notes}</p>
              <p><strong>On Watchlist:</strong> {note.is_watchlist ? "Yes" : "No"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchlistIndex;