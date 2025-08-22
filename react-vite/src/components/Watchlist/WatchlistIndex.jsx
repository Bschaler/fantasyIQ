import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadNotes, removeNote } from "../../redux/watchlist";
import "./Watchlist.css";

function WatchlistIndex() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notes = useSelector((state) => state.watchlist.playerNotes);
  const user = useSelector((state) => state.session.user);
 
  
  
  useEffect(() => {
   console.log("Loading watchlist...");
    
   dispatch(loadNotes());
  }, [dispatch]);

  const handleDelete = (noteId) => {
    if (window.confirm("Delete this note?")) {
      console.log("User confirmed delete");
      
      dispatch(removeNote(noteId));
    } else {
      console.log("User cancelled delete");
    }
  };

    const handleEdit = (noteId) => { 
        console.log("Edit button:", noteId);
    navigate(`/watchlist/${noteId}/edit`);
  };

  const handleAddNote = () => { 
   console.log("Add note");
    navigate('/watchlist/new');
  };

  
  
  if (!user) {
    return <div>Please log in to see your player notes</div>;
  }

  
  
   return (
    <div className="watchlist-container">
      <div className="watchlist-header">
        <h1 className="watchlist-title">My Player Watchlist</h1>
        <button className="add-note-btn" onClick={handleAddNote}>
          Add Note
        </button>
      </div>
      
      {notes.length === 0 ? (
        <div className="empty-watchlist">
          <p>No player notes yet! Add your first player.</p>
        </div>
      ) : (
        <div className="notes-list">
          {notes.map((note) => (
            <div key={note.id} className="note-card">
              <div className="note-info">
                <h3 className="note-player-name">{note.player_name}</h3>
                <p className="note-detail">Position: {note.position}</p>
                <p className="note-detail">Team: {note.team_abbr}</p>
                <p className="note-detail">Interest Level: {note.interest_level}</p>
                <p className="note-detail">Notes: {note.notes}</p>
                <p className="note-detail">On Watchlist: {note.is_watchlist ? "Yes" : "No"}</p>
              </div>
              
              <div className="note-buttons">
                <button className="edit-btn" onClick={() => handleEdit(note.id)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(note.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchlistIndex;

// Player notes/watchlist page - shows all the players I'm tracking
// TODO: maybe add sorting by position or team later