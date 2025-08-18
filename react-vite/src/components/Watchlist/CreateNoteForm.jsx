import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../../redux/watchlist";

function CreateNoteForm() {
  const dispatch = useDispatch();
  const [playerName, setPlayerName] = useState("");
  const [position, setPosition] = useState("");
  const [teamAbbr, setTeamAbbr] = useState("");
  const [notes, setNotes] = useState("");
  const [interestLevel, setInterestLevel] = useState("");
  const [isWatchlist, setIsWatchlist] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noteData = {
      player_name: playerName,
      position,
      team_abbr: teamAbbr,
      notes,
      interest_level: interestLevel,
      is_watchlist: isWatchlist
    };

    await dispatch(createNote(noteData));
    
    
    
    // Resets form
    setPlayerName("");
    setPosition("");
    setTeamAbbr("");
    setNotes("");
    setInterestLevel("");
    setIsWatchlist(true);
  };

  return (
    <div>
      <h1>Add Player Note</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Player Name</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Josh Allen, Saquon Barkley, etc."
          />
        </div>

        <div>
          <label>Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="QB, RB, WR, TE, etc."
          />
        </div>

        <div>
          <label>NFL Team</label>
          <input
            type="text"
            value={teamAbbr}
            onChange={(e) => setTeamAbbr(e.target.value)}
            placeholder="BUF, PHI, KC, etc."
          />
        </div>

        <div>
          <label>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter player notes..."
          />
        </div>

        
        <div>
          <label>Interest Level</label>
          <input
            type="text"
            value={interestLevel}
            onChange={(e) => setInterestLevel(e.target.value)}
            placeholder="Must Add, Monitoring, Avoid, etc."
          />
        </div>

        
        <div>
          <label>
            <input
              type="checkbox"
              checked={isWatchlist}
              onChange={(e) => setIsWatchlist(e.target.checked)}
            />
            Add to Watchlist
          </label>
        </div>

        <button type="submit">Add Player Note</button>
      </form>
    </div>
  );
}

export default CreateNoteForm;